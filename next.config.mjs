/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // 👇 Allow requests from your LAN or other dev devices
    allowedDevOrigins: [
      'http://192.168.1.2:9586', // adjust to your LAN IP & port
      'http://localhost:9586',
    ],
  },
};

export default nextConfig;
