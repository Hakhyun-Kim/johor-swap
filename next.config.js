/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['res.cloudinary.com'], // Add your image domains here
  },
}

module.exports = nextConfig 