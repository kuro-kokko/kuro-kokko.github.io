/** @type {import('next').NextConfig} */

const urlPrefix = "/202303_kadai";

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: process.env.NODE_ENV === "production" ? urlPrefix : "",
  basePath: process.env.NODE_ENV === "production" ? urlPrefix : "",
  trailingSlash: true,
  publicRuntimeConfig: { urlPrefix },
};

module.exports = nextConfig;
