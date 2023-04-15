/** @type {import('next').NextConfig} */

const urlPrefix = "";

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: process.env.NODE_ENV === "production" ? urlPrefix : "",
  basePath: process.env.NODE_ENV === "production" ? urlPrefix : "",
  trailingSlash: true,
  publicRuntimeConfig: { urlPrefix },
};

module.exports = nextConfig;
