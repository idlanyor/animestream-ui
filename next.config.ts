import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'v1.samehadaku.how',
      },
      {
        protocol: 'https',
        hostname: 'www.sankavollerei.com',
      },
      {
        protocol: 'https',
        hostname: '*.samehadaku.how',
      },
    ],
  },
};

export default nextConfig;
