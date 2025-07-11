import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: [process.env.NEXT_PUBLIC_SUPABASE_URL!.split('://')[1]],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_SUPABASE_URL!.split('://')[1],
      },
    ],
  },
}

export default nextConfig
