import SearchMeta from './SearchMeta'

export type SearchData<T> = {
  meta: SearchMeta
  data: T[]
}
