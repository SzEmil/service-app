/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        // pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: 'service-api-x2zr.onrender.com',
      },
    ],
  },
};
