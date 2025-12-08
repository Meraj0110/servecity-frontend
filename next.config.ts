/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sakadjbdcohhvvacnndy.supabase.co",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "aexpzoeclxoklxjznqjr.supabase.co",
        pathname: "/storage/**",
      },
    ],
  },
};

module.exports = nextConfig;
