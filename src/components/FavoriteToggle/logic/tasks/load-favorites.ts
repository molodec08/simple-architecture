import { mapShow, type Show } from '@/model/show'
import { favoritesApi } from '@/shared/api'

/** Таска «загрузить избранное». Порядок (новые первыми) задаёт backend. */
export const loadFavorites = async (signal?: AbortSignal): Promise<Show[]> =>
  (await favoritesApi.getAll(signal)).map(mapShow)
