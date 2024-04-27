import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful'

export interface DocumentFields {
  title: EntryFieldTypes.Symbol
  body?: EntryFieldTypes.RichText
}

export type DocumentSkeleton = EntrySkeletonType<DocumentFields, 'document'>
export type Document<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
> = Entry<DocumentSkeleton, Modifiers, Locales>
