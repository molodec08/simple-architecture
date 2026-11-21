import { mapShow, type Show } from '@/model/show'
import { favoritesApi } from '@/shared/api'

export type ToggleFavoriteResult = {
  /** Состояние после переключения */
  isFavorite: boolean
  show: Show
}

/**
 * Таска «добавить в избранное или убрать оттуда».
 * Решение принимает backend: клиент лишь сообщает, на какой сериал нажали.
 */
export const toggleFavorite = async (showId: number): Promise<ToggleFavoriteResult> => {
  const { isFavorite, show } = await favoritesApi.toggle(showId)
  return { isFavorite, show: mapShow(show) }
}
