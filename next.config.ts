import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["154.53.37.70"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "154.53.37.70",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
