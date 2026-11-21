import { useRequest } from '@/shared/lib'
import { searchShows } from './tasks/search-shows'

/**
 * Поиск сериалов (без TanStack Query): новый запрос отменяет предыдущий.
 * Debounce ввода — забота поля поиска (SearchInput), сюда приходит готовый запрос.
 * Ключ включает страницу и жанр: их применяет backend.
 */
export const useSearchShows = (query: string, page: number, genre: string | undefined) =>
  useRequest(query ? JSON.stringify([query, page, genre]) : null, (signal) =>
    searchShows(query, page, genre, signal),
  )
