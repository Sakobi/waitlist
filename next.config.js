/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath: '/Sakobi_w8list',
  assetPrefix: '/Sakobi_w8list',
  outputFileTracingRoot: __dirname,
  webpack: (config, { isServer }) => {
    // Fix for potential module resolution issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig
