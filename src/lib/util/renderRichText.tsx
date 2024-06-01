import {
  Options,
  documentToReactComponents,
} from '@contentful/rich-text-react-renderer'
import { BLOCKS, Document } from '@contentful/rich-text-types'

const options: Options = {
  renderNode: {
    [BLOCKS.QUOTE]: (_, children) => (
      <blockquote className="blockquote text-center my-5 fw-bold">
        {children}
      </blockquote>
    ),
  },
}

export default function renderRichText(document: Document) {
  return documentToReactComponents(document, options)
}
