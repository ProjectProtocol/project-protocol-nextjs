import { SearchData } from 'src/types/SearchData'
import Agent from '../types/Agent'
import Office from '../types/Office'
import SearchMeta from '../types/SearchMeta'
import apiClient from './client'

interface SearchArgs {
  searchText?: string
  filter?: 'Agent' | 'Office'
  page?: number
}

export async function search({
  searchText,
  filter,
  page,
}: SearchArgs): Promise<SearchData<Agent | Office>> {
  const params = {
    search: searchText,
    filter,
    page,
    ...(searchText ? {} : { default: true }),
  }

  const { data }: { data: SearchData<Agent | Office> } = await apiClient.get(
    'search',
    {
      params,
    },
  )

  return { meta: data.meta as SearchMeta, data: data.data }
}
