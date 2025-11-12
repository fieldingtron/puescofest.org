const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const sharp = require("sharp");

const inputDir = "./public/uploads";
const maxWidthOrHeight = 1000;
const targetSizeBytes = 100 * 1024; // 100 KB
const dbPath = ".image-optimized.json";

// Load or initialize the optimization database
let optimizedDB = {};
if (fs.existsSync(dbPath)) {
  optimizedDB = JSON.parse(fs.readFileSync(dbPath));
}

function normalizePath(filePath) {
  // Convert Windows backslashes to forward slashes
  return filePath.replace(/\\/g, "/");
}

function getFileHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash("md5").update(fileBuffer).digest("hex");
}

async function processImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

  if (!allowedExtensions.includes(ext)) {
    console.log(`Skipping unsupported file: ${filePath}`);
    return;
  }

  const normalizedPath = normalizePath(filePath);
  const hash = getFileHash(filePath);
  const fileSize = fs.statSync(filePath).size;
  if (optimizedDB[normalizedPath] === hash && fileSize <= targetSizeBytes) {
    console.log(
      `Already optimized and under target size, skipping: ${filePath}`
    );
    return;
  }

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
    // Convert PNG to JPEG for smaller file size
    let quality = 80;
    do {
      buffer = await img.jpeg({ quality }).toBuffer();
      console.log(
        `Trying JPEG conversion at quality ${quality}: ${buffer.length} bytes`
      );
      quality -= 10;
      if (quality < 30) break;
    } while (buffer.length > targetSizeBytes);
    // Save as .jpeg
    const jpegPath = filePath.replace(/\.png$/i, ".jpeg");
    fs.writeFileSync(jpegPath, buffer);
    console.log(`Converted and optimized ${filePath} → ${jpegPath}`);
    // Delete original PNG
    fs.unlinkSync(filePath);
    // Update optimization DB for new JPEG
    optimizedDB[normalizePath(jpegPath)] = getFileHash(jpegPath);
    fs.writeFileSync(dbPath, JSON.stringify(optimizedDB, null, 2));
    // Prepare for MDX reference update (handled after all files)
    return { oldPath: filePath, newPath: jpegPath };
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
      const webpBuffer = await img.toFormat("webp", { quality: 80 }).toBuffer();
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

  // Determine output file path
  let outputPath = filePath;
  fs.writeFileSync(outputPath, buffer);

  console.log(`Optimized ${outputPath}:`);
  console.log(
    `Original size: ${originalSize} bytes, Resized size: ${resizedSize} bytes`
  );

  // Update the optimization database with the hash of the optimized file
  optimizedDB[normalizedPath] = getFileHash(outputPath);
  fs.writeFileSync(dbPath, JSON.stringify(optimizedDB, null, 2));
}

async function processDirectory(directory, conversions) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await processDirectory(filePath, conversions);
    } else {
      const result = await processImage(filePath);
      if (result && result.oldPath && result.newPath) {
        conversions.push(result);
      }
    }
  }
}

async function updateMdxReferences(conversions) {
  const mdxPath = path.join(process.cwd(), "content/page/home.mdx");
  let mdxContent = fs.readFileSync(mdxPath, "utf8");
  for (const { oldPath, newPath } of conversions) {
    const oldFile = path.basename(oldPath);
    const newFile = path.basename(newPath);
    // Replace all references to old .png with new .jpeg
    const regex = new RegExp(
      oldFile.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "g"
    );
    mdxContent = mdxContent.replace(regex, newFile);
  }
  fs.writeFileSync(mdxPath, mdxContent, "utf8");
  console.log("Updated home.mdx references for PNG→JPEG conversions.");
}

(async () => {
  try {
    const conversions = [];
    await processDirectory(inputDir, conversions);
    if (conversions.length > 0) {
      await updateMdxReferences(conversions);
    }
    console.log("Image optimization complete.");
  } catch (error) {
    console.error("Error during image optimization:", error);
  }
})();
