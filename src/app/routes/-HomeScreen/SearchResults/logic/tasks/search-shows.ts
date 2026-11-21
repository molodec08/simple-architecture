import { mapShowsPage, type ShowsPage } from '@/model/show'
import { showsApi } from '@/shared/api'

/**
 * Таска «найти сериалы по названию».
 * Поиск, фильтр по жанру и разбиение на страницы выполняет backend.
 * @param page — номер страницы, начиная с 1
 */
export const searchShows = async (
  query: string,
  page: number,
  genre: string | undefined,
  signal?: AbortSignal,
): Promise<ShowsPage> => mapShowsPage(await showsApi.search(query, page, genre, signal))
