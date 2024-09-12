import { createClient } from "contentful";

export const contentfulPageIds = {
  about: "01l6lbfvmtbqQHjt7LuUFL",
  "why-email": "6K61ZF3VLMPMi0BjOQ3gjk",
  "ethical-principles": "6UFa3N1g7ytcAxeBCQVyTY",
  vote: "6VgcyUQKmZTr955WYmlhr8",
  "terms-of-service": "1acLWVokjkixcvTh0b3gup",
  "community-posting-guidelines": "fYYpah3B5mppvE7rXY1gY",
  "what-is-project-protocol": "1Is9QM4ez0YDMYktRuuJZx",
};

export type ContentfulPageKey = keyof typeof contentfulPageIds;

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
