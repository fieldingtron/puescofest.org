const crypto = require("node:crypto");
const fs = require("node:fs");
const readline = require("node:readline");

// Check if running in production based on // Check if running in production based on CONTEXT or VERCEL_ENV
if (
  process.env.VERCEL_ENV?.toLowerCase() === "production" ||
  process.env.CONTEXT?.toLowerCase() === "production"
) {
  console.log(
    "Production environment detected. Skipping encryption/decryption."
  );
  process.exit(0); // Exit the script without running any further
}

// Continue with the rest of your script if not in production
console.log(
  "Not in production environment. Proceeding with encryption/decryption."
);

console.log("process.env");
console.log(process.env);

// Helper function to prompt for a password
function promptPassword(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  });

  return new Promise((resolve) => {
    rl.question(question, (password) => {
      rl.close();
      resolve(password);
    });
  });
}

// Function to encrypt the .env file
async function encryptFile(password) {
  const envContent = fs.readFileSync(".env", "utf8");
  const iv = crypto.randomBytes(16);
  const key = crypto.scryptSync(password, "salt", 32);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(envContent, "utf8", "hex");
  encrypted += cipher.final("hex");

  const encryptedContent = `${iv.toString("hex")}:${encrypted}`;
  fs.writeFileSync(".env.enc", encryptedContent);
  console.log(".env file encrypted and saved to .env.enc");
}

// Function to decrypt the .env.enc file
async function decryptFile(password) {
  const encryptedContent = fs.readFileSync(".env.enc", "utf8");
  const [ivHex, encryptedData] = encryptedContent.split(":");
  const key = crypto.scryptSync(password, "salt", 32);
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    key,
    Buffer.from(ivHex, "hex")
  );

  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  fs.writeFileSync(".env", decrypted);
  console.log(".env file restored from .env.enc");
}

// Main logic to check file existence and perform encryption/decryption
(async () => {
  const envExists = fs.existsSync(".env");
  const envEncExists = fs.existsSync(".env.enc");

  if (envExists && !envEncExists) {
    // If .env exists but .env.enc does not, encrypt .env
    console.log(".env exists but .env.enc does not. Encrypting .env...");
    const password = await promptPassword("Enter password to encrypt .env: ");
    await encryptFile(password);
  } else if (envEncExists && !envExists) {
    // If .env.enc exists but .env does not, decrypt .env.enc
    console.log(".env.enc exists but .env does not. Decrypting .env.enc...");
    const password = await promptPassword(
      "Enter password to decrypt .env.enc: "
    );
    try {
      await decryptFile(password);
    } catch (error) {
      console.error(
        "Decryption failed. Please check the password and try again."
      );
    }
  } else {
    console.log(
      "No action needed. Either both or neither .env/.env.enc files exist."
    );
  }
})();
