type SearchMeta = {
  total: number
  page: number
  totalPages: number
}

export type Page<T> = {
  data: T[]
  meta: SearchMeta
}

export default SearchMeta
