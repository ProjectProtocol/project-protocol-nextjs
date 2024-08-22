import type { MetadataRoute } from "next";
import path from "path";

// Generates the sitemap.xml file for SEO crawlers
// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
export default function sitemap(): MetadataRoute.Sitemap {
  let host;
  if (!process.env.HOST) {
    return [];
  } else {
    host = process.env.HOST ?? "http://localhost:3001";
  }

  const pageURLS = [
    "/resources",
    "/rate-my-po",
    "/",
    "content/en-US/about",
    "content/en-US/how-does-it-work",
    "content/en-US/ethical-principles",
    "content/en-US/terms-of-service",
    "content/en-US/contact-us",
    "content/en-US/vote",
  ];

  return pageURLS.map((url) => ({
    url: path.join(host, url),
    lastModified: new Date(),
    priority: 0.8,
    changeFrequency: "monthly",
  }));
}
