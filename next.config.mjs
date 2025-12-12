/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.Next_STATIC ? "export" : undefined,
  eslne: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
