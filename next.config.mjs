import createNextIntlPlugin from "next-intl/plugin";
import pwaPlugin from "next-pwa";

const withPWA = pwaPlugin({
  dest: "public",
  mode: "production",
  disable:
    process.env.CONTEXT !== "production" && process.env.ENABLE_PWA !== "true",
});

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
let nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s2.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
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

nextConfig = withNextIntl(nextConfig);

export default withPWA(nextConfig);
