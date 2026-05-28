const crypto = require("node:crypto");
const fs = require("node:fs");
const readline = require("node:readline");

const isProduction =
  process.env.VERCEL_ENV?.toLowerCase() === "production" ||
  process.env.CONTEXT?.toLowerCase() === "production";
const isInteractiveTerminal = Boolean(process.stdin.isTTY);
const shouldPromptForEncryption =
  process.env.ENV_ENCRYPTION_PROMPT?.toLowerCase() === "true";
const envPassword = process.env.PASSWORD || process.env.password || "";
const hasEnvPassword = envPassword.length > 0;

if (
  isProduction ||
  (!isInteractiveTerminal && !hasEnvPassword) ||
  (!shouldPromptForEncryption && !hasEnvPassword)
) {
  console.log(
    "Skipping .env encryption/decryption in postinstall. Set ENV_ENCRYPTION_PROMPT=true or provide PASSWORD to run it."
  );
  process.exit(0);
}

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
  if (hasEnvPassword) {
    console.log("PASSWORD env var detected. Running .env protection with environment password.");
  } else {
    console.log("ENV_ENCRYPTION_PROMPT=true detected. Running interactive .env protection.");
  }
  const envExists = fs.existsSync(".env");
  const envEncExists = fs.existsSync(".env.enc");

  if (envExists && !envEncExists) {
    // If .env exists but .env.enc does not, encrypt .env
    console.log(".env exists but .env.enc does not. Encrypting .env...");
    const password = hasEnvPassword
      ? envPassword
      : await promptPassword("Enter password to encrypt .env: ");
    await encryptFile(password);
  } else if (envEncExists && !envExists) {
    // If .env.enc exists but .env does not, decrypt .env.enc
    console.log(".env.enc exists but .env does not. Decrypting .env.enc...");
    const password = hasEnvPassword
      ? envPassword
      : await promptPassword("Enter password to decrypt .env.enc: ");
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
