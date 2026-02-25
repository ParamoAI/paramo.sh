// Static export configuration for GitHub Pages
const BUILD_DIR = 'docs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: BUILD_DIR,
  trailingSlash: true,
  images: {
    unoptimized: true,
    loader: 'custom',
    domains: [],
  },
};

export default nextConfig;
