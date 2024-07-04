import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s2.googleusercontent.com",
      },
    ],
  },
  logging: {
    level: "verbose",
    fetches: {
      fullUrl: true,
    },
  },
};

export default withNextIntl(nextConfig);
