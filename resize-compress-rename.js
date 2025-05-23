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
  try {
    const fileBuffer = fs.readFileSync(filePath);
    return crypto.createHash("md5").update(fileBuffer).digest("hex");
  } catch (err) {
    console.error(`Error calculating hash for ${filePath}:`, err.message);
    return "error-hash";
  }
}

/**
 * Updates image references in MDX files
 * Handles both /uploads/ prefixed and root-level paths
 */
async function updateMdxReferences(oldPath, newPath) {
  try {
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
        const updatedContent = content.replace(
          regex,
          `/uploads/${newBasename}`
        );
        if (content !== updatedContent) {
          await fsPromises.writeFile(filePath, updatedContent, "utf8");
          console.log(`Updated references in ${filePath}`);
          updatedFiles++;
          console.log(`Updated references in ${file}:
  ${oldBasename} → ${newBasename}`);
        }
      }
    }
  } catch (err) {
    console.error(`Error updating MDX references:`, err);
  }
}

/**
 * Process a single image: sanitize name, resize, and optimize
 */
async function processImage(filePath) {
  try {
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

    let fileToProcess = filePath;

    if (originalBasename !== sanitizedBasename) {
      console.log(`Renaming: ${originalBasename} → ${sanitizedBasename}`);
      try {
        // First check if the file exists and is accessible
        try {
          await fsPromises.access(
            filePath,
            fs.constants.R_OK | fs.constants.W_OK
          );
        } catch (accessErr) {
          console.error(`Cannot access file ${filePath}: ${accessErr.message}`);
          return; // Skip this file
        }

        // Check if target file already exists (to avoid conflicts)
        try {
          await fsPromises.access(newFilePath);
          // If we get here, the file exists - try to remove it first
          try {
            await fsPromises.unlink(newFilePath);
            await new Promise((resolve) => setTimeout(resolve, 200)); // Wait for file system
          } catch (unlinkErr) {
            console.error(
              `Cannot remove existing file ${newFilePath}: ${unlinkErr.message}`
            );
            return; // Skip further processing
          }
        } catch (accessErr) {
          // File doesn't exist, we can proceed
        }

        // Directly rename the file (Windows often has issues with temp files)
        try {
          await fsPromises.rename(filePath, newFilePath);
          await new Promise((resolve) => setTimeout(resolve, 200)); // Wait for file system
          await updateMdxReferences(filePath, newFilePath);
          fileToProcess = newFilePath;
        } catch (renameErr) {
          // If rename fails (which can happen on Windows), try copy and delete approach
          console.log(
            `Direct rename failed, trying copy method for ${filePath}`
          );

          try {
            // Copy file then delete original
            await fsPromises.copyFile(filePath, newFilePath);
            await new Promise((resolve) => setTimeout(resolve, 200)); // Wait for file system

            try {
              await fsPromises.unlink(filePath);
            } catch (unlinkErr) {
              console.warn(
                `Warning: Could not delete original file ${filePath}, but continuing with copy.`
              );
            }

            await updateMdxReferences(filePath, newFilePath);
            fileToProcess = newFilePath;
          } catch (copyErr) {
            console.error(
              `Failed to copy ${filePath} to ${newFilePath}: ${copyErr.message}`
            );
            return; // Skip further processing
          }
        }
      } catch (err) {
        console.error(
          `Error in rename process for ${filePath}: ${err.message}`
        );
        return; // Skip further processing
      }
    }

    // Step 2: Check if the file is already optimized
    const normalizedPath = normalizePath(fileToProcess);
    const hash = getFileHash(fileToProcess);
    if (optimizedDB[normalizedPath] === hash) {
      console.log(`Already optimized, skipping: ${fileToProcess}`);
      return;
    }

    // Step 3: Resize and compress the image
    try {
      let img = sharp(fileToProcess);
      const metadata = await img.metadata();

      // Resize if necessary
      const resizeOptions = {};
      if (
        metadata.width > metadata.height &&
        metadata.width > maxWidthOrHeight
      ) {
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
        console.log(`Processed PNG with transparency: ${fileToProcess}`);
      } else if (ext === ".gif") {
        // Skip processing GIFs with sharp (just rename them)
        console.log(`Skipping GIF processing (only renamed): ${fileToProcess}`);
        // Update the optimization database with current hash to avoid reprocessing
        optimizedDB[normalizedPath] = hash;
        await fsPromises
          .writeFile(dbPath, JSON.stringify(optimizedDB, null, 2))
          .catch((err) =>
            console.error(
              `Error updating optimization database: ${err.message}`
            )
          );
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
            console.log(`Switched to WebP for ${fileToProcess}`);
          }
        }
      }

      // Get original file size
      let originalSize;
      try {
        const stats = await fsPromises.stat(fileToProcess);
        originalSize = stats.size;
      } catch (statErr) {
        console.error(
          `Error getting file size for ${fileToProcess}: ${statErr.message}`
        );
        originalSize = 0;
      }

      const resizedSize = buffer.length;

      // Use a temporary file path in a different location to avoid conflicts
      const tempFilePath = path.join(
        path.dirname(fileToProcess),
        `._temp_${Math.random().toString(36).substring(2)}_${path.basename(
          fileToProcess
        )}`
      );

      try {
        // Write the buffer to a temporary file
        await fsPromises.writeFile(tempFilePath, buffer);
        await new Promise((resolve) => setTimeout(resolve, 300)); // Wait longer for file system

        // Ensure the target file is not locked by opening handles
        try {
          await fsPromises.access(fileToProcess, fs.constants.W_OK);
        } catch (accessErr) {
          console.warn(
            `Warning: Cannot write to ${fileToProcess}, may be locked: ${accessErr.message}`
          );

          // Try to force close any open handles (Windows specific)
          if (process.platform === "win32") {
            try {
              // Only attempt on Windows
              await new Promise((resolve) => setTimeout(resolve, 1000)); // Extra wait time
            } catch (e) {}
          }
        }

        try {
          // First try to remove the original
          await fsPromises.unlink(fileToProcess);
          await new Promise((resolve) => setTimeout(resolve, 300));
        } catch (unlinkErr) {
          console.warn(
            `Warning: Could not delete ${fileToProcess} before replacing: ${unlinkErr.message}`
          );
          // Try to replace anyway
        }

        // Now move the temp file to the target location
        await fsPromises.rename(tempFilePath, fileToProcess);

        console.log(`Optimized ${fileToProcess}:`);
        console.log(
          `Original size: ${originalSize} bytes, Resized size: ${resizedSize} bytes`
        );

        // Update the optimization database with the hash of the optimized file
        optimizedDB[normalizedPath] = getFileHash(fileToProcess);
        await fsPromises.writeFile(
          dbPath,
          JSON.stringify(optimizedDB, null, 2)
        );
      } catch (saveErr) {
        console.error(
          `Error saving optimized file ${fileToProcess}: ${saveErr.message}`
        );

        // Try to clean up temp file if it exists
        try {
          await fsPromises.unlink(tempFilePath).catch(() => {});
        } catch (cleanupErr) {
          // Ignore cleanup errors
        }
      }
    } catch (processingErr) {
      console.error(
        `Error processing image data for ${fileToProcess}: ${processingErr.message}`
      );

      // Mark this file as processed to avoid retrying endlessly
      optimizedDB[normalizedPath] = "error-processing";
      try {
        await fsPromises.writeFile(
          dbPath,
          JSON.stringify(optimizedDB, null, 2)
        );
      } catch (dbErr) {
        // Ignore DB write errors at this point
      }
    }
  } catch (error) {
    console.error(`Error processing image ${filePath}:`, error.message);

    // Mark as processed with error to avoid retrying
    try {
      const normalizedPath = normalizePath(filePath);
      optimizedDB[normalizedPath] = "error-processing";
      await fsPromises.writeFile(dbPath, JSON.stringify(optimizedDB, null, 2));
    } catch (dbErr) {
      // Ignore DB errors at this point
    }
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
    console.error(`Error processing directory ${directory}:`, error.message);
  }
}

/**
 * Main function to process all images
 */
async function main() {
  try {
    console.log("Starting image processing (rename, resize, optimize)...");
    console.log(`Scanning directory: ${inputDir}`);

    // Make sure the upload directory exists
    try {
      await fsPromises.access(inputDir);
    } catch (err) {
      console.log(`Creating directory ${inputDir}`);
      await fsPromises.mkdir(inputDir, { recursive: true });
    }

    await processDirectory(inputDir);
    console.log("\n✅ Image processing completed successfully!");
  } catch (error) {
    console.error("\n❌ Error during image processing:", error.message);
    console.error("Stack trace:", error.stack);
  }
}

// Run the script
main();
