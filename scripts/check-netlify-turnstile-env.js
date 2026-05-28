const isNetlifyBuild = process.env.NETLIFY === "true";

if (!isNetlifyBuild) {
  process.exit(0);
}

const fs = require("node:fs");
const path = require("node:path");

function readEnvFileMap() {
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return {};

  const fileContent = fs.readFileSync(envPath, "utf8");
  const map = {};

  for (const line of fileContent.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }

    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    let value = trimmed.slice(index + 1).trim();
    value = value.replace(/^['\"]|['\"]$/g, "");
    map[key] = value;
  }

  return map;
}

const envFileMap = readEnvFileMap();

const requiredVars = ["TURNSTILE_SECRET_KEY"];
const missingVars = requiredVars.filter(
  (name) => !process.env[name] && !envFileMap[name]
);

if (missingVars.length > 0) {
  console.error("[build-check] Missing required env vars for deploy:");
  for (const name of missingVars) {
    console.error(`- ${name}`);
  }
  process.exit(1);
}

console.log("[build-check] Turnstile env validation passed.");
