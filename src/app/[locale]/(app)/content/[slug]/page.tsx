// note spanish locale in contentful is es-US

import { ALL_LOCALES } from "@/i18n/config";
import ContentfulClient, {
  ContentfulPageKey,
  contentfulPageIds,
} from "@/lib/contentful";
import { Document } from "@contentful/rich-text-types";
import renderRichText from "@/lib/renderRichText";
import "@/styles/content-pages.scss";
import ContentPage from "../_components/ContentPage";
import { setRequestLocale } from "next-intl/server";
import { defaultMetadata } from "@/lib/metadataUtils";

export async function generateStaticParams() {
  const locales = ALL_LOCALES;

  const pages = [];
  for (const locale of locales) {
    for (const slug of Object.keys(contentfulPageIds)) {
      pages.push({ locale, slug });
    }
  }
  return pages;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: ContentfulPageKey };
}) {
  const data = await getContent(params.locale, params.slug);
  const title = data.fields.title as string;
  return defaultMetadata({ title });
}

async function getContent(locale: string, slug: ContentfulPageKey) {
  const contentfulLocale = locale === "es-MX" ? "es-US" : locale;
  const data = await ContentfulClient.getEntry(contentfulPageIds[slug], {
    locale: contentfulLocale,
  });
  return data;
}

export default async function Page({
  params: { locale, slug },
}: {
  params: { slug: ContentfulPageKey; locale: string };
}) {
  setRequestLocale(locale);
  const data = await getContent(locale, slug);
  const title = data.fields.title as string;
  const body = data.fields.body as Document;

  let coverImageSrc;
  if (!!data.fields.cloudinaryImgId) {
    let id = data.fields.cloudinaryImgId as string;
    coverImageSrc = id;
  }

  return (
    <ContentPage title={title} coverImageSrc={coverImageSrc}>
      <div className="content-page">{renderRichText(body)}</div>
    </ContentPage>
  );
}
