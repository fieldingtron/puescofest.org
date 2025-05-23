/**
 * check-missing-images.js
 * This script scans home.mdx for image references and checks if they exist in the public/uploads directory.
 * It will output a list of all missing images.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const mdxFilePath = path.join(process.cwd(), 'content', 'page', 'home.mdx');
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

// Function to extract image paths from MDX content
function extractImagePaths(content) {
  const imagePaths = new Set();
  
  // Extract images from frontmatter properties ending with Src or imgSrc
  const srcRegex = /(\w+(?:Src|imgSrc)):\s*\/uploads\/([^\s]+)/g;
  let match;
  while ((match = srcRegex.exec(content)) !== null) {
    imagePaths.add(`/uploads/${match[2]}`);
  }

  // Extract images from bands and activities arrays (imgSrc properties)
  const arrayRegex = /imgSrc:\s*\/uploads\/([^\s]+)/g;
  while ((match = arrayRegex.exec(content)) !== null) {
    imagePaths.add(`/uploads/${match[1]}`);
  }
  
  // Extract any other image references in the content
  const markdownImgRegex = /!\[.*?\]\(\/uploads\/([^)]+)\)/g;
  while ((match = markdownImgRegex.exec(content)) !== null) {
    imagePaths.add(`/uploads/${match[1]}`);
  }

  // Also look for HTML img tags
  const htmlImgRegex = /<img.*?src=["']?(\/uploads\/[^"'\s]+)["']?/g;
  while ((match = htmlImgRegex.exec(content)) !== null) {
    imagePaths.add(match[1]);
  }

  console.log('Debug - Found image paths:', Array.from(imagePaths));
  return Array.from(imagePaths);
}

// Function to check if files exist
function checkMissingImages(imagePaths) {
  const missingImages = [];
  const existingImages = [];

  imagePaths.forEach(imagePath => {
    // Extract just the filename from the /uploads/ path
    const filename = path.basename(imagePath);
    const filePath = path.join(uploadsDir, filename);
    
    if (!fs.existsSync(filePath)) {
      missingImages.push({ reference: imagePath, expectedPath: filePath });
    } else {
      existingImages.push(imagePath);
    }
  });

  return { missingImages, existingImages };
}

// Main function
function main() {
  console.log('Checking for missing images in home.mdx...\n');

  try {
    // Check if uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
      console.error(`Error: Uploads directory not found at ${uploadsDir}`);
      return;
    }

    // Read MDX content
    const mdxContent = fs.readFileSync(mdxFilePath, 'utf8');
    
    // Extract image paths
    const imagePaths = extractImagePaths(mdxContent);
    console.log(`Found ${imagePaths.length} image references in home.mdx`);
    
    // Check which images are missing
    const { missingImages, existingImages } = checkMissingImages(imagePaths);
    
    // Output results
    console.log(`\n${existingImages.length} images exist in uploads directory`);
    console.log(`${missingImages.length} images are missing from uploads directory\n`);
    
    if (missingImages.length > 0) {
      console.log('Missing Images:');
      console.log('---------------------------------------------');
      missingImages.forEach((item, index) => {
        console.log(`${index + 1}. Referenced as: ${item.reference}`);
        console.log(`   Expected at: ${item.expectedPath}`);
        console.log('');
      });
    } else {
      console.log('All images referenced in home.mdx exist in the uploads directory! 🎉');
    }

  } catch (error) {
    console.error('Error checking images:', error.message);
  }
}

// Run the script
main();
