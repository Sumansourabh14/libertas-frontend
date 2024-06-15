const withMDX = require("@next/mdx")({});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["wallpapers.com", "firebasestorage.googleapis.com"],
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

module.exports = withMDX(nextConfig);
