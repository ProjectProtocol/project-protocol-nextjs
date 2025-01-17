import { createClient } from "contentful";

const SPACE_ID = "zwkgwua3qde9";
const ACCESS_TOKEN = "kKEOXwvZcsASfym1i7BjO-g65KX5esCTa08w9rGHYBg";
const GRAPHQL_URL = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`;
const client = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

const ContentfulClient = {
  getEntry: client.getEntry,
  getEntries: client.getEntries,
  getTags: client.getTags,
};

export const contentfulLocale = (locale: string) =>
  locale === "es-MX" ? "es-US" : locale;

export default ContentfulClient;

export async function getContentfulType(type: string, locale: string) {
  const data = await ContentfulClient.getEntries({
    content_type: type,
    locale: contentfulLocale(locale),
  });
  return data;
}

export async function fetchGraphQL(query: string, cacheKeys: string[]) {
  return fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query }),
    next: { tags: cacheKeys },
  }).then((response) => response.json());
}
