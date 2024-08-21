import type { MetadataRoute } from "next";
import path from "path";

// Generates the robots.txt file for SEO crawlers
// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
export default function robots(): MetadataRoute.Robots {
  const host = process.env.HOST ?? "http://localhost:3001";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/account/",
    },
    sitemap: path.join(host, "/sitemap.xml"),
  };
}
