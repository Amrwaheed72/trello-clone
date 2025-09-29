import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ⚠️ ignores TS errors on build
  },
  eslint: {
    ignoreDuringBuilds: true, // ⚠️ ignores ESLint errors on build
  },
};

export default nextConfig;
