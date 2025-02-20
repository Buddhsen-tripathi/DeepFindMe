import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        port: '', // Leave empty unless using a specific port
        pathname: '/**', // Allow all paths under this domain
      },
    ],
  },
};

export default nextConfig;
