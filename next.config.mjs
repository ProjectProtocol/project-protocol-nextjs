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
    formats: ["image/avif", "image/webp"],
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
  productionBrowserSourceMaps: true,
  async redirects() {
    return [
      {
        source: "/:slug*",
        has: [
          {
            type: "host",
            value: "app.projectprotocol.org",
          },
        ],
        permanent: true,
        destination: "https://projectprotocol.org/:slug*",
      },
    ];
  },
};

nextConfig = withNextIntl(nextConfig);
nextConfig = withPWA(nextConfig);

export default nextConfig;
