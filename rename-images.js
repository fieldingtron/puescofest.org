const fs = require("fs").promises;
const path = require("path");
const { readdir } = require("fs").promises;

/**
 * Sanitizes filenames by:
 * 1. Removing diacritics (tildes, accents)
 * 2. Converting to lowercase
 * 3. Replacing special characters and spaces with hyphens
 * 4. Preserving original file extension
 *
 * Examples:
 * - "Árbol Señal.jpg" → "arbol-senal.jpg"
 * - "Captura de Pantalla 2024-11-18 a la(s) 09.32.11.png" → "captura-de-pantalla-2024-11-18-a-la-s-09-32-11.png"
 */
const sanitizeFileName = (filename) => {
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
};

/**
 * Updates image references in MDX files
 * Handles both /uploads/ prefixed and root-level paths
 */
async function updateMdxReferences(oldPath, newPath) {
  const contentDir = path.join(process.cwd(), "content");
  const mdxFiles = await readdir(contentDir, { recursive: true });
  for (const file of mdxFiles) {
    if (file.endsWith(".mdx")) {
      const filePath = path.join(contentDir, file);
      const content = await fs.readFile(filePath, "utf8");
      const oldBasename = path.basename(oldPath);
      const newBasename = path.basename(newPath);
      // Match filenames with or without /uploads/ prefix
      const regex = new RegExp(
        `(?:/uploads/)?${oldBasename.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
        "g"
      );
      const updatedContent = content.replace(regex, `/uploads/${newBasename}`);
      if (content !== updatedContent) {
        await fs.writeFile(filePath, updatedContent, "utf8");
        console.log(`Updated references in ${file}:
  ${oldBasename} → ${newBasename}`);
      }
    }
  }
}

/**
 * Main function to rename images and update references
 * 1. Scans uploads directory
 * 2. Sanitizes image filenames
 * 3. Updates MDX references
 */
async function renameImages() {
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  try {
    console.log("Starting image renaming process...");
    console.log(`Scanning directory: ${uploadDir}`);
    const files = await readdir(uploadDir);
    console.log(`Found ${files.length} files to process`);
    for (const file of files) {
      if (file.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        const oldPath = path.join(uploadDir, file);
        const sanitizedName = sanitizeFileName(file);
        const newPath = path.join(uploadDir, sanitizedName);
        if (file !== sanitizedName) {
          await fs.rename(oldPath, newPath);
          console.log(`Renamed: ${file} → ${sanitizedName}`);
          await updateMdxReferences(oldPath, newPath);
        }
      }
    }
    console.log(
      "\n✅ Image renaming and reference updates completed successfully!"
    );
  } catch (error) {
    console.error("\n❌ Error processing files:", error);
    console.error("Stack trace:", error.stack);
  }
}

// Run the script
renameImages();
