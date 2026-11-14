import { mapShow } from '@/model/show'
import { tvmazeApi } from '@/shared/api'
import { useRequest } from '@/shared/lib'

const searchShows = async (query: string, signal: AbortSignal) =>
  (await tvmazeApi.searchShows(query, signal)).map((result) => mapShow(result.show))

/**
 * Поиск сериалов по названию (без TanStack Query).
 * Фильтрацию по запросу выполняет сам API; новый запрос отменяет предыдущий.
 * Debounce ввода — забота поля поиска (SearchInput), сюда приходит готовый запрос.
 */
export const useSearchShows = (query: string) => useRequest(query || null, (signal) => searchShows(query, signal))
