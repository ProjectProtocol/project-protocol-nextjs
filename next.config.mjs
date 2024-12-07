import { withSentryConfig } from "@sentry/nextjs";
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

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options
  environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT ?? "development",
  org: "project-protocol-hh",
  project: "project-protocol-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: false,
});
