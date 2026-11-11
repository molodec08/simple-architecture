import { queryOptions } from '@tanstack/react-query'
import { tvmazeApi } from '@/shared/api'
import { mapShow, mapShowDetails } from '../model/mappers'

/**
 * Фабрика query options — единственное место, где описаны ключи и запросы
 * для сериалов. Компоненты, лоадеры роутера и инвалидация используют её,
 * а не собирают ключи вручную.
 */
export const showQueries = {
  all: () => ['shows'] as const,

  lists: () => [...showQueries.all(), 'list'] as const,
  /** @param page — номер страницы API, начиная с 0 */
  list: (page: number) =>
    queryOptions({
      queryKey: [...showQueries.lists(), page],
      queryFn: async ({ signal }) => (await tvmazeApi.getShows(page, signal)).map(mapShow),
      // Индекс TVmaze кэшируется на их стороне до 24 часов — часто обновлять незачем
      staleTime: 10 * 60 * 1000,
    }),

  search: (query: string) =>
    queryOptions({
      queryKey: [...showQueries.all(), 'search', query],
      queryFn: async ({ signal }) =>
        (await tvmazeApi.searchShows(query, signal)).map((result) => mapShow(result.show)),
      enabled: query.trim().length > 0,
    }),

  detail: (id: number) =>
    queryOptions({
      queryKey: [...showQueries.all(), 'detail', id],
      queryFn: async ({ signal }) => mapShowDetails(await tvmazeApi.getShow(id, signal)),
    }),
}
