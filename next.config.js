/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Enable static exports
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // This helps with static hosting
  async redirects() {
    return [];
  },
  // Add rewrites for Tina
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
    ];
  },
  // Configure Tina assets
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Mock assets that aren't needed in production
      ".fysics_vflow.mp4": false,
      ".fysics_vflow_web.mp4": false,
    };
    return config;
  },
};

module.exports = nextConfig;
