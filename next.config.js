const withMDX = require("@next/mdx")({});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "wallpapers.com" },
      { hostname: "firebasestorage.googleapis.com" },
    ],
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

module.exports = withMDX(nextConfig);
