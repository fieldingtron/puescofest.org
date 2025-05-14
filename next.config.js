/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Enable static exports
  images: {
    unoptimized: true, // Required for static export
  },
  // Note: rewrites are not supported with output: export
  trailingSlash: true, // This helps with static hosting
};

module.exports = nextConfig;
