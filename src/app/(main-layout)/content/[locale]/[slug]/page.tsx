// note spanish locale in contentful is es-US

import { ALL_LOCALES } from "@/i18n";
import ContentfulClient, { ContentfulKey, contentIds } from "@/lib/contentful";
import { Document } from "@contentful/rich-text-types";
import renderRichText from "@/lib/renderRichText";
import "@/styles/content-pages.scss";
import ContentPage from "../_components/ContentPage";

export const dynamicParams = false;

export async function generateStaticParams() {
  const locales = ALL_LOCALES;
  const slugs = [
    "about",
    "why-email",
    "how-does-it-work",
    "ethical-principles",
    "vote",
    "terms-of-service",
  ];

  const pages = [];
  for (const locale of locales) {
    for (const slug of slugs) {
      pages.push({ locale, slug });
    }
  }
  return pages;
}

async function getContent(locale: string, slug: ContentfulKey) {
  const contentfulLocale = locale === "es-MX" ? "es-US" : locale;
  const data = await ContentfulClient.getEntry(contentIds[slug], {
    locale: contentfulLocale,
  });
  return data;
}

export default async function Page({
  params,
}: {
  params: { slug: ContentfulKey; locale: string };
}) {
  const data = await getContent(params.locale, params.slug);
  const title = data.fields.title as string;
  const body = data.fields.body as Document;

  return (
    <ContentPage title={title}>
      <div className="content-page">{renderRichText(body)}</div>
    </ContentPage>
  );
}
