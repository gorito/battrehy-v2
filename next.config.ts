import type { NextConfig } from "next";

const nextConfig: any = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.bokadirekt.se',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      }
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/behandlingar/dermal-fillers',
        destination: '/behandlingar/fillerbehandling',
        permanent: true,
      },
      {
        source: '/stad/:city',
        destination: '/kliniker/:city',
        permanent: true,
      },
      {
        source: '/stad/:city/:slug*',
        destination: '/kliniker/:city/:slug*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
