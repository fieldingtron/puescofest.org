const fs = require("fs");
const path = require("path");
const https = require("https");
const { promises: fsPromises } = fs;

// Configuration
const mdxFilePath = path.join(process.cwd(), "content", "page", "home.mdx");
const uploadsDir = path.join(process.cwd(), "public", "uploads");
const tinaAssetsBaseUrl = "https://assets.tina.io/c0bd0eea-2aee-4208-9cf0-b9f9322f0ead";

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
  return sanitized + extension.toLowerCase();
}

// Utility function to download a file
async function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);

    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}, status code: ${response.statusCode}`));
        return;
      }

      response.pipe(file);

      file.on("finish", () => {
        file.close();
        console.log(`✅ Downloaded: ${path.basename(destination)}`);
        resolve();
      });

      file.on("error", (err) => {
        fs.unlink(destination, () => {}); // Delete the file if there was an error
        reject(err);
      });
    }).on("error", (err) => {
      fs.unlink(destination, () => {}); // Delete the file if there was an error
      reject(err);
    });
  });
}

/**
 * Updates image references in the MDX file
 */
async function updateMdxReferences(oldFilename, newFilename) {
  try {
    const content = await fsPromises.readFile(mdxFilePath, "utf8");
    
    // Create regex patterns that match both with and without /uploads/ prefix
    const oldNamePattern = new RegExp(
      `(\/uploads\/)?${oldFilename.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
      "g"
    );
    
    const newContent = content.replace(oldNamePattern, `/uploads/${newFilename}`);

    if (content !== newContent) {
      await fsPromises.writeFile(mdxFilePath, newContent, "utf8");
      console.log(`📝 Updated references: ${oldFilename} → ${newFilename}`);
    }
  } catch (err) {
    console.error(`Error updating MDX references for ${oldFilename}:`, err);
  }
}

// Main function
async function downloadAndNormalizeImages() {
  try {
    // Read the MDX file
    const mdxContent = await fsPromises.readFile(mdxFilePath, "utf8");

    // Get all image references from the MDX file
    const patterns = [
      // Standard imgSrc format
      { regex: /imgSrc:\s*["']?(\/uploads\/([^"'\s]+))["']?/g, pathIndex: 1, filenameIndex: 2 },
      // Special fields like landingImageSrc
      { regex: /(landingImageSrc|landingDarkImageSrc|somosImgSrc):\s*["']?(\/uploads\/([^"'\s]+))["']?/g, pathIndex: 2, filenameIndex: 3 },
      // Markdown image format
      { regex: /!\[.*?\]\(\/uploads\/([^"'\s\)]+)\)/g, pathIndex: 0, filenameIndex: 1 },
      // HTML image format
      { regex: /src=["']\/uploads\/([^"'\s]+)["']/g, pathIndex: 0, filenameIndex: 1 }
    ];

    const imageReferences = new Set();
    let match;

    for (const pattern of patterns) {
      const regex = new RegExp(pattern.regex);
      while ((match = regex.exec(mdxContent)) !== null) {
        const filename = match[pattern.filenameIndex];
        imageReferences.add({
          fullPath: pattern.pathIndex === 0 ? `/uploads/${filename}` : match[pattern.pathIndex],
          filename: filename
        });
      }
    }

    // Ensure uploads directory exists
    await fsPromises.mkdir(uploadsDir, { recursive: true });

    // Get existing files
    const existingFiles = await fsPromises.readdir(uploadsDir);
    const existingFilesLower = new Set(existingFiles.map(f => f.toLowerCase()));

    // Process each image reference
    for (const { filename } of imageReferences) {
      const sanitizedFilename = sanitizeFileName(filename);
      const destinationPath = path.join(uploadsDir, sanitizedFilename);

      // Skip if the file already exists (case-insensitive check)
      if (existingFilesLower.has(sanitizedFilename.toLowerCase())) {
        console.log(`⏭️ File already exists: ${sanitizedFilename}`);
        continue;
      }

      // Download and normalize the file
      try {
        const sourceUrl = `${tinaAssetsBaseUrl}/${filename}`;
        console.log(`🔄 Downloading: ${filename}`);
        await downloadFile(sourceUrl, destinationPath);
        
        // Update references in MDX file if the filename changed
        if (filename !== sanitizedFilename) {
          await updateMdxReferences(filename, sanitizedFilename);
        }
      } catch (error) {
        console.error(`❌ Error processing ${filename}:`, error.message);
      }
    }

    console.log("\n✅ Download and normalization process completed!");
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the script
downloadAndNormalizeImages();
