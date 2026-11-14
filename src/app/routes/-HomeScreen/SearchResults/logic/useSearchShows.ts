import { useRequest } from '@/shared/lib'
import { searchShows } from './tasks/search-shows'

/**
 * Поиск сериалов (без TanStack Query): новый запрос отменяет предыдущий.
 * Debounce ввода — забота поля поиска (SearchInput), сюда приходит готовый запрос.
 */
export const useSearchShows = (query: string) => useRequest(query || null, (signal) => searchShows(query, signal))
