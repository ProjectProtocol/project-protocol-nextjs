import PageHeader from "@/src/components/PageHeader";
import contentfulEntryMap from "./contentfulEntryMap";
import { Entry, createClient } from "contentful";
import renderRichText from "@/src/lib/util/renderRichText";
import { Document } from "@contentful/rich-text-types";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

interface IContentfulPage {
  params: {
    contentfulDocument: keyof typeof contentfulEntryMap;
  };
}

export async function generateStaticParams() {
  const entries = Object.keys(contentfulEntryMap);

  return entries.map((entry) => ({
    params: { contentfulDocument: entry },
  }));
}

export default async function Page({ params }: IContentfulPage) {
  const contentfulId = contentfulEntryMap[params.contentfulDocument];

  const entry: Entry = await client.getEntry(contentfulId);
  const document = entry.fields.body as Document;
  return (
    <>
      <PageHeader title={entry.fields.title as string} showBack />
      {renderRichText(document)}
    </>
  );
}
