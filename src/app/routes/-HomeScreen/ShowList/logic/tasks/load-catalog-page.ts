import { mapShowsPage, type ShowsPage } from '@/model/show'
import { showsApi } from '@/shared/api'

/**
 * Таска «загрузить страницу каталога». Пагинацию и фильтр по жанру выполняет backend.
 * @param page — номер страницы, начиная с 1
 */
export const loadCatalogPage = async (
  page: number,
  genre: string | undefined,
  signal?: AbortSignal,
): Promise<ShowsPage> => mapShowsPage(await showsApi.getCatalog(page, genre, signal))
