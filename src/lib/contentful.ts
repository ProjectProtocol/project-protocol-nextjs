import { createClient } from "contentful";

export const contentfulPageIds = {
  about: "01l6lbfvmtbqQHjt7LuUFL",
  "the-team": "41UOkLNQQfa6pK2U7Gr46d",
  "why-email": "6K61ZF3VLMPMi0BjOQ3gjk",
  "ethical-principles": "6UFa3N1g7ytcAxeBCQVyTY",
  vote: "6VgcyUQKmZTr955WYmlhr8",
  "terms-of-service": "1acLWVokjkixcvTh0b3gup",
  "community-posting-guidelines": "fYYpah3B5mppvE7rXY1gY",
  "what-is-project-protocol": "1Is9QM4ez0YDMYktRuuJZx",
  "how-it-works": "1BQDLK4P2L1E0DmCwLOrDR",
};

export type ContentfulPageKey = keyof typeof contentfulPageIds;

export const contentfulTeamPageIds = {
  "emiliano-lopez": "4FP3XyfyfkC9o68ofMLrFo",
  "yindi-pei": "3nCFxVLQgT60wsrIVvxvDX",
  "tim-sandberg": "7t5bJNvlML0unFl8TvbHMs",
  "eddie-menefee": "2Z9dHhaMoFh91Uum9hhBvM",
  "emily-chao": "1i2TzlCjMYp7et2GVajG6X",
  "jazmine-rodriguez": "1zaxzn70VIXHeBAgfDpgSh",
};

export type TeamContentfulPageKey = keyof typeof contentfulTeamPageIds;

const client = createClient({
  space: "zwkgwua3qde9",
  accessToken: "kKEOXwvZcsASfym1i7BjO-g65KX5esCTa08w9rGHYBg",
});

const ContentfulClient = {
  getEntry: client.getEntry,
  getEntries: client.getEntries,
  getTags: client.getTags,
};

export default ContentfulClient;

export async function getContent(
  locale: string,
  slug: ContentfulPageKey | TeamContentfulPageKey
) {
  // note spanish locale in contentful is es-US
  const contentfulLocale = locale === "es-MX" ? "es-US" : locale;
  const contentFulIdSrc: { [key: string]: string } =
    slug in contentfulPageIds ? contentfulPageIds : contentfulTeamPageIds;
  const data = await ContentfulClient.getEntry(contentFulIdSrc[slug], {
    locale: contentfulLocale,
  });
  return data;
}
