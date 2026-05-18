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
        source: '/kliniker/:city/dermal-fillers',
        destination: '/kliniker/:city/fillerbehandling',
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
      // Fix broken Jönköping URL (was stored with URL-encoded chars and trailing space)
      {
        source: '/kliniker/j-c3-b6nk-c3-b6ping-20/:slug*',
        destination: '/kliniker/jonkoping/:slug*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
