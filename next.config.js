/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["cdn.hypeauditor.com"],
    unoptimized: true,
  },
};

module.exports = nextConfig;
