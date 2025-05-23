const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const crypto = require("crypto");
const sharp = require("sharp");

const inputDir = "./public/uploads";
const maxWidthOrHeight = 1000;
const targetSizeBytes = 100 * 1024; // 100 KB
const dbPath = ".image-optimized.json";
const RENAME_LOG_PATH = path.join(process.cwd(), "rename-log.json");

// Load or initialize the optimization database
let optimizedDB = {};
if (fs.existsSync(dbPath)) {
  optimizedDB = JSON.parse(fs.readFileSync(dbPath));
}

// Load or initialize the rename log
let renameLog;
try {
  renameLog = JSON.parse(fs.readFileSync(RENAME_LOG_PATH, "utf8"));
} catch (e) {
  renameLog = { renamedFiles: [] };
  fs.writeFileSync(RENAME_LOG_PATH, JSON.stringify(renameLog, null, 2));
}

/**
 * Sanitizes filenames by:
 * 1. Removing diacritics (tildes, accents)
 * 2. Converting to lowercase
 * 3. Replacing special characters and spaces with hyphens
 * 4. Preserving original file extension
 */
function sanitizeFileName(filename) {
  const lastDotIndex = filename.lastIndexOf(".");
  if (lastDotIndex === -1) return filename; // No extension
  const baseName = filename.slice(0, lastDotIndex);
  const extension = filename.slice(lastDotIndex); // Includes the dot
  const sanitized = baseName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9-_.]/g, "-") // Replace special chars
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Collapse multiple hyphens
    .replace(/^-|-$/g, "") // Remove leading/trailing hyphens
    .trim();
  return sanitized + extension;
}

function normalizePath(filePath) {
  // Convert Windows backslashes to forward slashes
  return filePath.replace(/\\/g, "/");
}

function getFileHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash("md5").update(fileBuffer).digest("hex");
}

/**
 * Updates image references in MDX files
 * Handles both /uploads/ prefixed and root-level paths
 */
async function updateMdxReferences(oldPath, newPath) {
  // Log the rename operation
  const renameEntry = {
    oldPath: oldPath,
    newPath: newPath,
    timestamp: new Date().toISOString(),
  };
  renameLog.renamedFiles.push(renameEntry);
  await fsPromises.writeFile(
    RENAME_LOG_PATH,
    JSON.stringify(renameLog, null, 2)
  );

  const contentDir = path.join(process.cwd(), "content");
  const mdxFiles = await fsPromises.readdir(contentDir, { recursive: true });
  let updatedFiles = 0;

  for (const file of mdxFiles) {
    if (file.endsWith(".mdx")) {
      const filePath = path.join(contentDir, file);
      const content = await fsPromises.readFile(filePath, "utf8");
      const oldBasename = path.basename(oldPath);
      const newBasename = path.basename(newPath);
      // Match filenames with or without /uploads/ prefix
      const regex = new RegExp(
        `(?:/uploads/)?${oldBasename.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
        "g"
      );
      const updatedContent = content.replace(regex, `/uploads/${newBasename}`);
      if (content !== updatedContent) {
        await fsPromises.writeFile(filePath, updatedContent, "utf8");
        console.log(`Updated references in ${filePath}`);
        updatedFiles++;
        console.log(`Updated references in ${file}:
  ${oldBasename} → ${newBasename}`);
      }
    }
  }
}

/**
 * Process a single image: sanitize name, resize, and optimize
 */
async function processImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

  if (!allowedExtensions.includes(ext)) {
    console.log(`Skipping unsupported file: ${filePath}`);
    return;
  }

  // Step 1: Rename the file (if needed)
  const originalBasename = path.basename(filePath);
  const sanitizedBasename = sanitizeFileName(originalBasename);
  const dirName = path.dirname(filePath);
  const newFilePath = path.join(dirName, sanitizedBasename);

  if (originalBasename !== sanitizedBasename) {
    console.log(`Renaming: ${originalBasename} → ${sanitizedBasename}`);
    try {
      await fsPromises.rename(filePath, newFilePath);
      await updateMdxReferences(filePath, newFilePath);
      filePath = newFilePath; // Update the filePath for further processing
    } catch (err) {
      console.error(`Error renaming file ${filePath}:`, err);
      return;
    }
  }

  // Step 2: Check if the file is already optimized
  const normalizedPath = normalizePath(filePath);
  const hash = getFileHash(filePath);
  if (optimizedDB[normalizedPath] === hash) {
    console.log(`Already optimized, skipping: ${filePath}`);
    return;
  }

  // Step 3: Resize and compress the image
  try {
    let img = sharp(filePath);
    const metadata = await img.metadata();

    // Resize if necessary
    const resizeOptions = {};
    if (metadata.width > metadata.height && metadata.width > maxWidthOrHeight) {
      resizeOptions.width = maxWidthOrHeight;
    } else if (metadata.height > maxWidthOrHeight) {
      resizeOptions.height = maxWidthOrHeight;
    }

    img = img.resize(resizeOptions);

    let buffer;
    if (ext === ".png") {
      // Handle PNG files to retain transparency
      buffer = await img
        .png({ compressionLevel: 9, adaptiveFiltering: true })
        .toBuffer();
      console.log(`Processed PNG with transparency: ${filePath}`);
    } else if (ext === ".gif") {
      // Skip processing GIFs with sharp (just rename them)
      console.log(`Skipping GIF processing (only renamed): ${filePath}`);
      // Update the optimization database with current hash to avoid reprocessing
      optimizedDB[normalizedPath] = hash;
      fs.writeFileSync(dbPath, JSON.stringify(optimizedDB, null, 2));
      return;
    } else {
      let quality = 80;
      let finalFormat = ext.replace(".", "");

      do {
        buffer = await img
          .toFormat(finalFormat === "png" ? "png" : "jpeg", { quality })
          .toBuffer();

        console.log(
          `Trying ${finalFormat} at quality ${quality}: ${buffer.length} bytes`
        );
        quality -= 5;
        if (quality < 30) break;
      } while (buffer.length > targetSizeBytes);

      // If it's a PNG, test WebP version
      if (ext === ".png") {
        const webpBuffer = await img
          .toFormat("webp", { quality: 80 })
          .toBuffer();
        console.log(`Checking WebP version: ${webpBuffer.length} bytes`);

        if (webpBuffer.length < buffer.length * 0.9) {
          // WebP saves at least 10%
          buffer = webpBuffer;
          console.log(`Switched to WebP for ${filePath}`);
        }
      }
    }

    const originalSize = fs.statSync(filePath).size;
    const resizedSize = buffer.length;

    // Write the optimized file
    fs.writeFileSync(filePath, buffer);

    console.log(`Optimized ${filePath}:`);
    console.log(
      `Original size: ${originalSize} bytes, Resized size: ${resizedSize} bytes`
    );

    // Update the optimization database with the hash of the optimized file
    optimizedDB[normalizedPath] = getFileHash(filePath);
    fs.writeFileSync(dbPath, JSON.stringify(optimizedDB, null, 2));
  } catch (error) {
    console.error(`Error processing image ${filePath}:`, error);
  }
}

/**
 * Process all images in a directory
 */
async function processDirectory(directory) {
  try {
    const files = await fsPromises.readdir(directory);

    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = await fsPromises.stat(filePath);

      if (stat.isDirectory()) {
        await processDirectory(filePath);
      } else {
        await processImage(filePath);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${directory}:`, error);
  }
}

/**
 * Main function to process all images
 */
async function main() {
  try {
    console.log("Starting image processing (rename, resize, optimize)...");
    console.log(`Scanning directory: ${inputDir}`);
    await processDirectory(inputDir);
    console.log("\n✅ Image processing completed successfully!");
  } catch (error) {
    console.error("\n❌ Error during image processing:", error);
    console.error("Stack trace:", error.stack);
  }
}

// Run the script
main();
