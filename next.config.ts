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
      // Fix broken Lidingö URL (was stored with URL-encoded chars)
      {
        source: '/kliniker/liding-c3-b6/:slug*',
        destination: '/kliniker/lidingo/:slug*',
        permanent: true,
      },
      // Swedish city name redirects (URL-encoded) – å, ä, ö → ASCII slugs
      { source: '/kliniker/liding%C3%B6/:path*',          destination: '/kliniker/lidingo/:path*',          permanent: true },
      { source: '/kliniker/malm%C3%B6/:path*',           destination: '/kliniker/malmo/:path*',           permanent: true },
      { source: '/kliniker/g%C3%B6teborg/:path*',         destination: '/kliniker/goteborg/:path*',         permanent: true },
      { source: '/kliniker/%C3%B6rebro/:path*',           destination: '/kliniker/orebro/:path*',           permanent: true },
      { source: '/kliniker/v%C3%A4ster%C3%A5s/:path*',         destination: '/kliniker/vasteras/:path*',         permanent: true },
      { source: '/kliniker/link%C3%B6ping/:path*',        destination: '/kliniker/linkoping/:path*',        permanent: true },
      { source: '/kliniker/j%C3%B6nk%C3%B6ping/:path*',        destination: '/kliniker/jonkoping/:path*',        permanent: true },
      { source: '/kliniker/norrk%C3%B6ping/:path*',       destination: '/kliniker/norrkoping/:path*',       permanent: true },
      { source: '/kliniker/rydeb%C3%A4ck/:path*',         destination: '/kliniker/rydeback/:path*',         permanent: true },
      { source: '/kliniker/m%C3%B6lndal/:path*',          destination: '/kliniker/molndal/:path*',          permanent: true },
      { source: '/kliniker/arl%C3%B6v/:path*',            destination: '/kliniker/arlov/:path*',            permanent: true },
      { source: '/kliniker/eker%C3%B6/:path*',            destination: '/kliniker/ekero/:path*',            permanent: true },
      { source: '/kliniker/h%C3%A4gersten/:path*',        destination: '/kliniker/hagersten/:path*',        permanent: true },
      { source: '/kliniker/j%C3%A4rf%C3%A4lla/:path*',         destination: '/kliniker/jarfalla/:path*',         permanent: true },
      { source: '/kliniker/sk%C3%A4rholmen/:path*',       destination: '/kliniker/skarholmen/:path*',       permanent: true },
      { source: '/kliniker/v%C3%A4stra-fr%C3%B6lunda/:path*',  destination: '/kliniker/vastra-frolunda/:path*',  permanent: true },
      { source: '/kliniker/%C3%A4lvsj%C3%B6/:path*',           destination: '/kliniker/alvsjo/:path*',           permanent: true },
      { source: '/kliniker/%C3%A5by/:path*',              destination: '/kliniker/aby/:path*',              permanent: true },
      { source: '/kliniker/%C3%B6rnsk%C3%B6ldsvik/:path*',    destination: '/kliniker/ornskoldsvik/:path*',    permanent: true },
      { source: '/kliniker/hov%C3%A5s/:path*',            destination: '/kliniker/hovas/:path*',            permanent: true },
      { source: '/kliniker/s%C3%B6dert%C3%A4lje/:path*',      destination: '/kliniker/sodertalje/:path*',      permanent: true },
      { source: '/kliniker/bor%C3%A5s/:path*',            destination: '/kliniker/boras/:path*',            permanent: true },
    ];
  },
};

export default nextConfig;
