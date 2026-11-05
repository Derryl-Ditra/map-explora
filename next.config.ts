import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/map-explora' : '',
  images: {
    unoptimized: true,
  },
  devIndicators: {
    position: 'bottom-right',
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
