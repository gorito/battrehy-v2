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
      // Swedish city name redirects – å, ä, ö → ASCII slugs
      { source: '/kliniker/malmö/:slug*',            destination: '/kliniker/malmo/:slug*',            permanent: true },
      { source: '/kliniker/göteborg/:slug*',          destination: '/kliniker/goteborg/:slug*',          permanent: true },
      { source: '/kliniker/örebro/:slug*',            destination: '/kliniker/orebro/:slug*',            permanent: true },
      { source: '/kliniker/västerås/:slug*',          destination: '/kliniker/vasteras/:slug*',          permanent: true },
      { source: '/kliniker/linköping/:slug*',         destination: '/kliniker/linkoping/:slug*',         permanent: true },
      { source: '/kliniker/jönköping/:slug*',         destination: '/kliniker/jonkoping/:slug*',         permanent: true },
      { source: '/kliniker/norrköping/:slug*',        destination: '/kliniker/norrkoping/:slug*',        permanent: true },
      { source: '/kliniker/rydebäck/:slug*',          destination: '/kliniker/rydeback/:slug*',          permanent: true },
      { source: '/kliniker/mölndal/:slug*',           destination: '/kliniker/molndal/:slug*',           permanent: true },
      { source: '/kliniker/arlöv/:slug*',             destination: '/kliniker/arlov/:slug*',             permanent: true },
      { source: '/kliniker/ekerö/:slug*',             destination: '/kliniker/ekero/:slug*',             permanent: true },
      { source: '/kliniker/hägersten/:slug*',         destination: '/kliniker/hagersten/:slug*',         permanent: true },
      { source: '/kliniker/järfälla/:slug*',          destination: '/kliniker/jarfalla/:slug*',          permanent: true },
      { source: '/kliniker/skärholmen/:slug*',        destination: '/kliniker/skarholmen/:slug*',        permanent: true },
      { source: '/kliniker/västra-frölunda/:slug*',   destination: '/kliniker/vastra-frolunda/:slug*',   permanent: true },
      { source: '/kliniker/älvsjö/:slug*',            destination: '/kliniker/alvsjo/:slug*',            permanent: true },
      { source: '/kliniker/åby/:slug*',               destination: '/kliniker/aby/:slug*',               permanent: true },
      { source: '/kliniker/örnsköldsvik/:slug*',      destination: '/kliniker/ornskoldsvik/:slug*',      permanent: true },
      { source: '/kliniker/hovås/:slug*',             destination: '/kliniker/hovas/:slug*',             permanent: true },
      // City-only pages (without clinic slug)
      { source: '/kliniker/malmö',                    destination: '/kliniker/malmo',                    permanent: true },
      { source: '/kliniker/göteborg',                 destination: '/kliniker/goteborg',                 permanent: true },
      { source: '/kliniker/örebro',                   destination: '/kliniker/orebro',                   permanent: true },
      { source: '/kliniker/västerås',                 destination: '/kliniker/vasteras',                 permanent: true },
      { source: '/kliniker/linköping',                destination: '/kliniker/linkoping',                permanent: true },
      { source: '/kliniker/jönköping',                destination: '/kliniker/jonkoping',                permanent: true },
      { source: '/kliniker/norrköping',               destination: '/kliniker/norrkoping',               permanent: true },
      { source: '/kliniker/rydebäck',                 destination: '/kliniker/rydeback',                 permanent: true },
      { source: '/kliniker/mölndal',                  destination: '/kliniker/molndal',                  permanent: true },
    ];
  },
};

export default nextConfig;
