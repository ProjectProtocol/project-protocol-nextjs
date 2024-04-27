import { createClient } from 'contentful'

const client = createClient({
  space: 'zwkgwua3qde9',
  accessToken: 'kKEOXwvZcsASfym1i7BjO-g65KX5esCTa08w9rGHYBg',
})

const ContentfulClient = {
  ids: {
    ABOUT_US: '01l6lbfvmtbqQHjt7LuUFL',
    WHY_EMAIL: '6K61ZF3VLMPMi0BjOQ3gjk',
    ETHICAL_PRINCIPLES: '6UFa3N1g7ytcAxeBCQVyTY',
    HOW_DOES_IT_WORK: '1BQDLK4P2L1E0DmCwLOrDR',
  },
  getEntry: client.getEntry,
  getEntries: client.getEntries,
  getTags: client.getTags,
}

export default ContentfulClient
