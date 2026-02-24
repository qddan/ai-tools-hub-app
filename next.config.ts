import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  outputFileTracingIncludes: {
    "/*": ["./prisma/dev.db"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "t1.gstatic.com",
      },
    ],
  },
};

export default nextConfig;
