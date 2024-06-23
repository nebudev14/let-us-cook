/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [["next-superjson-plugin", {}]],
  },
  images: {
    domains: ["lh3.googleusercontent.com", "images.unsplash.com"],
  },
}

module.exports = nextConfig
