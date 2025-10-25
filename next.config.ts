import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // reactCompiler: true,
  typescript: {
    ignoreBuildErrors: true, // ⚠️ ignores TS errors on build
  },
  eslint: {
    ignoreDuringBuilds: true, // ⚠️ ignores ESLint errors on build
  },
};

export default nextConfig;
