import { Document } from "@contentful/rich-text-types";
import { contentfulLocale, fetchGraphQL } from "../contentful";

export const DOCUMENT_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  slug
  cloudinaryImgId
  body {
    json
  }
`;

export type ContentfulDocument = {
  sys: {
    id: string;
  };
  title: string;
  slug: string;
  cloudinaryImgId: string;
  body: {
    json: Document;
  };
};

export const getDocumentQuery = (slug: string, locale: string) => `
  query {
    documentCollection(limit: 1, locale: "${locale}", where: { slug: "${slug}"}) {
      items {
        ${DOCUMENT_GRAPHQL_FIELDS}
      }
    }
  }
`;

export const ALL_DOCUMENTS_QUERY = `
  query {
    documentCollection {
      items {
        ${DOCUMENT_GRAPHQL_FIELDS}
      }
    }
  }
`;

export async function getDocuments() {
  const response = await fetchGraphQL(ALL_DOCUMENTS_QUERY, ["document"]);
  return response.data.documentCollection.items;
}

export async function getDocument(
  slug: string,
  locale = "en-US"
): Promise<ContentfulDocument> {
  const query = getDocumentQuery(slug, contentfulLocale(locale));
  const response = await fetchGraphQL(query, ["document"]);
  const document = response.data.documentCollection.items[0];
  return document;
}
