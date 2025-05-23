const fs = require("fs");
const path = require("path");
const https = require("https");
const { promises: fsPromises } = fs;

// Configuration
const mdxFilePath = path.join(process.cwd(), "content", "page", "home.mdx");
const uploadsDir = path.join(process.cwd(), "public", "uploads");
const tinaAssetsBaseUrl =
  "https://assets.tina.io/c0bd0eea-2aee-4208-9cf0-b9f9322f0ead";

// Utility function to download a file
function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);

    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(
            new Error(
              `Failed to download ${url}, status code: ${response.statusCode}`
            )
          );
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
      })
      .on("error", (err) => {
        fs.unlink(destination, () => {}); // Delete the file if there was an error
        reject(err);
      });
  });
}

// Main function
async function checkAndDownloadMissingImages() {
  try {
    // Read the MDX file
    const mdxContent = await fsPromises.readFile(mdxFilePath, "utf8");

    // Get all image references from the MDX file
    // This regex looks for image references in various formats
    const patterns = [
      // Standard imgSrc format
      {
        regex: /imgSrc:\s*["']?(\/uploads\/([^"'\s]+))["']?/g,
        pathIndex: 1,
        filenameIndex: 2,
      },
      // Special fields like landingImageSrc
      {
        regex:
          /(landingImageSrc|landingDarkImageSrc|somosImgSrc):\s*["']?(\/uploads\/([^"'\s]+))["']?/g,
        pathIndex: 2,
        filenameIndex: 3,
      },
      // Additional formats (add more as needed)
      {
        regex: /!\[.*?\]\(\/uploads\/([^"'\s\)]+)\)/g,
        pathIndex: 0,
        filenameIndex: 1,
      }, // Markdown image format
      {
        regex: /src=["']\/uploads\/([^"'\s]+)["']/g,
        pathIndex: 0,
        filenameIndex: 1,
      }, // HTML image format
    ];

    const imageReferences = new Set();
    let match;

    for (const pattern of patterns) {
      while ((match = pattern.regex.exec(mdxContent)) !== null) {
        const filename = match[pattern.filenameIndex];
        imageReferences.add({
          fullPath:
            pattern.pathIndex === 0
              ? `/uploads/${filename}`
              : match[pattern.pathIndex],
          filename: filename,
        });
      }
    }

    const uniqueReferences = Array.from(imageReferences);
    console.log(
      `Found ${uniqueReferences.length} unique image references in ${mdxFilePath}`
    );

    // Get all files in the uploads directory
    let existingFiles = [];
    try {
      existingFiles = await fsPromises.readdir(uploadsDir);
    } catch (err) {
      if (err.code === "ENOENT") {
        console.log(
          `Uploads directory does not exist, creating it: ${uploadsDir}`
        );
        await fsPromises.mkdir(uploadsDir, { recursive: true });
      } else {
        throw err;
      }
    }

    // Convert all existing filenames to lowercase for case-insensitive comparison
    const existingFilesLowercase = existingFiles.map((file) =>
      file.toLowerCase()
    ); // Find missing images
    const missingImages = [];
    const existingMap = new Map(); // Map to store actual filenames

    // Create a map of lowercase filenames to actual filenames
    existingFiles.forEach((file) => {
      existingMap.set(file.toLowerCase(), file);
    });

    for (const { fullPath, filename } of uniqueReferences) {
      // Check if the file exists (case-insensitive)
      const normalizedFilename = filename.toLowerCase();
      if (!existingFilesLowercase.includes(normalizedFilename)) {
        missingImages.push({ fullPath, filename });
      } else {
        // Check if the case matches
        const actualFilename = existingMap.get(normalizedFilename);
        if (actualFilename !== filename) {
          console.log(
            `⚠️ Case mismatch: ${filename} exists as ${actualFilename}`
          );
        }
      }
    }

    console.log(`Found ${missingImages.length} missing images`);

    // Download missing images
    for (const { filename } of missingImages) {
      const sourceUrl = `${tinaAssetsBaseUrl}/${filename}`;
      const destinationPath = path.join(uploadsDir, filename);

      console.log(`Downloading ${filename} from ${sourceUrl}`);
      try {
        console.log(`🔄 Attempting to download ${filename}...`);
        await downloadFile(sourceUrl, destinationPath);
        console.log(`✅ Successfully downloaded ${filename}`);
      } catch (error) {
        console.error(`❌ Error downloading ${filename}: ${error.message}`);
        console.log(`   Source URL: ${sourceUrl}`);
        console.log(`   Destination: ${destinationPath}`);
      }
    }

    if (missingImages.length === 0) {
      console.log(
        "✅ All images referenced in home.mdx are present in the uploads directory"
      );
    } else {
      console.log(`✅ Downloaded ${missingImages.length} missing images`);
    }

    // List all the missing images
    if (missingImages.length > 0) {
      console.log("\nList of missing images:");
      missingImages.forEach(({ filename }) => {
        console.log(`- ${filename}`);
      });
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the function
checkAndDownloadMissingImages();
