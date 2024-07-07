import { createClient } from "contentful";

export const contentIds = {
  about: "01l6lbfvmtbqQHjt7LuUFL",
  "why-email": "6K61ZF3VLMPMi0BjOQ3gjk",
  "ethical-principles": "6UFa3N1g7ytcAxeBCQVyTY",
  "how-does-it-work": "1BQDLK4P2L1E0DmCwLOrDR",
  vote: "6VgcyUQKmZTr955WYmlhr8",
  "terms-of-service": "1acLWVokjkixcvTh0b3gup",
};

export type ContentfulKey = keyof typeof contentIds;

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
