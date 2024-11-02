import { Locale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { host } from "@/lib/constants";
import type { MetadataRoute } from "next";
import path from "path";

// Generates the sitemap.xml file for SEO crawlers
// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
export default function sitemap(): MetadataRoute.Sitemap {
  const pageURLS = [
    "/resources",
    "/rate-my-po",
    "/",
    "content/about",
    "content/how-does-it-work",
    "content/ethical-principles",
    "content/terms-of-service",
    "content/contact-us",
    "content/vote",
  ];

  return pageURLS.map((page) => getEntry(page));
}

function getEntry(url: string) {
  return {
    url: getUrl(url, routing.defaultLocale),
    alernates: {
      languages: {
        "en-US": getUrl(url, "en-US"),
        "es-MX": getUrl(url, "es-MX"),
      },
    },
    lastModified: new Date(),
    priority: 0.8,
  };
}

function getUrl(pathname: string, locale: Locale) {
  return path.join(host, locale, pathname);
}
