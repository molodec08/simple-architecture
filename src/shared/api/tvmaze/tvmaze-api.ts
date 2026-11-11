import { env } from '@/shared/config'
import { createHttpClient, isApiError } from '../http-client'
import type { TvmazeSearchResultDto, TvmazeShowDto, TvmazeShowWithCastDto } from './types'

const http = createHttpClient(env.tvmazeApiUrl)

/**
 * Эндпоинты TVmaze. Только транспорт: никакой бизнес-логики и маппинга.
 */
export const tvmazeApi = {
  /**
   * Индекс сериалов. Страницы нумеруются с 0, до 250 записей на страницу.
   * За последней страницей API отвечает 404 — превращаем это в пустой массив.
   */
  getShows: async (page: number, signal?: AbortSignal): Promise<TvmazeShowDto[]> => {
    try {
      return await http.get<TvmazeShowDto[]>('/shows', { params: { page }, signal })
    } catch (error) {
      if (isApiError(error) && error.status === 404) return []
      throw error
    }
  },

  searchShows: (query: string, signal?: AbortSignal) =>
    http.get<TvmazeSearchResultDto[]>('/search/shows', { params: { q: query }, signal }),

  getShow: (id: number, signal?: AbortSignal) =>
    http.get<TvmazeShowWithCastDto>(`/shows/${id}`, { params: { embed: 'cast' }, signal }),
}
