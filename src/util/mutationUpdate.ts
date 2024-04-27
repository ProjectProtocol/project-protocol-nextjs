import { InfiniteData } from '@tanstack/react-query'
import { SearchData } from 'src/types/SearchData'
import { Page } from 'src/types/SearchMeta'

/**
 * Updates a single item in the search data.
 * @param newItem - The new item to update.
 * @returns A function that takes the previous search data and returns the updated search data with the new item.
 */
export function updateQueryItem<T extends { id: number }>(newItem: T) {
  return (prev: SearchData<T>) => {
    return {
      ...prev,
      data: prev.data.map((i) =>
        i.id === newItem.id ? { ...i, ...newItem } : i,
      ),
    }
  }
}

/**
 * Updates a single item in the infinite query data -- searches through all pages of the infinite query data.
 * @param newItem - The new item to update.
 * @returns A function that takes the previous data and returns the updated data with the new item.
 */
export function updateInfiniteQueryItem<T extends { id: number }>(newItem: T) {
  return (prev: InfiniteData<Page<T>>) => {
    const newPages = prev.pages.map((page) => {
      const newData = page.data.map((r) =>
        r.id === newItem.id ? { ...r, ...newItem } : r,
      )

      return { data: newData, meta: page.meta }
    })
    return { ...prev, pages: newPages }
  }
}
