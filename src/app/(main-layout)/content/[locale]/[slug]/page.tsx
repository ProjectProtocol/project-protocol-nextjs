// note spanish locale in contentful is es-US

import { ALL_LOCALES } from "@/i18n";
import ContentfulClient, { ContentfulKey, contentIds } from "@/lib/contentful";
import { Document } from "@contentful/rich-text-types";
import renderRichText from "@/lib/renderRichText";
import "@/styles/content-pages.scss";
import ContentPage from "../_components/ContentPage";
import { metaTitle } from "@/lib/metadataUtils";

export const dynamicParams = false;

export async function generateStaticParams() {
  const locales = ALL_LOCALES;

  const pages = [];
  for (const locale of locales) {
    for (const slug of Object.keys(contentIds)) {
      pages.push({ locale, slug });
    }
  }
  return pages;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: ContentfulKey };
}) {
  const data = await getContent(params.locale, params.slug);
  const title = data.fields.title as string;
  return {
    title: metaTitle(title),
  };
}

async function getContent(locale: string, slug: ContentfulKey) {
  const contentfulLocale = locale === "es-MX" ? "es-US" : locale;
  const data = await ContentfulClient.getEntry(contentIds[slug], {
    locale: contentfulLocale,
  });
  return data;
}

type CoverImage = {
  fields: {
    file: {
      url: string;
    };
  };
};

export default async function Page({
  params,
}: {
  params: { slug: ContentfulKey; locale: string };
}) {
  const data = await getContent(params.locale, params.slug);
  const title = data.fields.title as string;
  const body = data.fields.body as Document;

  let coverImageSrc;
  if (!!data.fields.coverImage) {
    const url = (data.fields.coverImage as CoverImage).fields.file.url;
    coverImageSrc = `https:${url}?w=1200`;
  }

  return (
    <ContentPage title={title} coverImageSrc={coverImageSrc}>
      <div className="content-page">{renderRichText(body)}</div>
    </ContentPage>
  );
}
