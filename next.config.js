/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Enable static exports
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // This helps with static hosting
  async redirects() {
    return [
      // Add your redirects here, for example:
      // {
      //   source: '/old-page',
      //   destination: '/new-page',
      //   permanent: true,
      // },
    ];
  },
};

module.exports = nextConfig;
