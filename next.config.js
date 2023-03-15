/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    ADMIN_USER:process.env.ADMIN_USER,
  },
  images: {
    domains: ['avatars.dicebear.com'],
  },
}

module.exports = nextConfig
