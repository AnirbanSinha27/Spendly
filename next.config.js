/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },
  // Disable static generation for pages that need dynamic data
  trailingSlash: false,
  generateEtags: false,
};

module.exports = nextConfig;
