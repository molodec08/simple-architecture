import { env } from '@/shared/config'
import { createHttpClient } from '../http-client'
import type { ShowDetailsDto, ShowDto, ShowsPageDto, ToggleFavoriteDto } from './types'

const http = createHttpClient(env.apiUrl)

/**
 * Эндпоинты нашего backend. Только транспорт: никакой бизнес-логики и маппинга.
 * Пагинация, жанры, кеш и избранное — на сервере.
 */
export const showsApi = {
  /** Страница каталога (`page` с 1), опционально — с фильтром по жанру */
  getCatalog: (page: number, genre: string | undefined, signal?: AbortSignal) =>
    http.get<ShowsPageDto>('/shows', { params: { page, genre }, signal }),

  search: (query: string, page: number, genre: string | undefined, signal?: AbortSignal) =>
    http.get<ShowsPageDto>('/shows/search', { params: { q: query, page, genre }, signal }),

  getShow: (id: number, signal?: AbortSignal) => http.get<ShowDetailsDto>(`/shows/${id}`, { signal }),
}

export const favoritesApi = {
  getAll: (signal?: AbortSignal) => http.get<ShowDto[]>('/favorites', { signal }),

  toggle: (showId: number) => http.post<ToggleFavoriteDto>(`/favorites/${showId}/toggle`),
}
