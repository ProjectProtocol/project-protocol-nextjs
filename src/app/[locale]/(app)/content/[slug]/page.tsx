import { ALL_LOCALES } from "@/i18n/config";
import { Document } from "@contentful/rich-text-types";
import renderRichText from "@/lib/renderRichText";
import "@/styles/content-pages.scss";
import ContentPage from "../_components/ContentPage";
import { setRequestLocale } from "next-intl/server";
import { defaultMetadata } from "@/lib/metadataUtils";
import {
  ContentfulDocument,
  getDocument,
  getDocuments,
} from "@/lib/contentful/document";

export async function generateStaticParams() {
  const pages = [];
  const allDocuments = (await getDocuments()) as ContentfulDocument[];
  for (const locale of ALL_LOCALES) {
    for (const document of allDocuments) {
      if (!document.slug) {
        continue;
      }
      pages.push({ locale, slug: document.slug });
    }
  }
  return pages;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const { title } = await getDocument(slug, locale);
  return defaultMetadata({ title });
}

export default async function Page(props: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const params = await props.params;
  const { locale, slug } = params;
  setRequestLocale(locale);
  const data = await getDocument(slug, locale);
  const title = data.title as string;
  const body = data.body.json as Document;

  let coverImageSrc;
  if (!!data.cloudinaryImgId) {
    let id = data.cloudinaryImgId as string;
    coverImageSrc = id;
  }

  return (
    <ContentPage title={title} coverImageSrc={coverImageSrc}>
      <div className="content-page">{renderRichText(body)}</div>
    </ContentPage>
  );
}
