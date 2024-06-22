/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  experimental: {
    swcPlugins: [["next-superjson-plugin", {}]],
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
}

module.exports = nextConfig
