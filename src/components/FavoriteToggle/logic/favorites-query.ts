import { queryOptions } from '@tanstack/react-query'
import { loadFavorites } from './tasks/load-favorites'

/** Ключ избранного: его сбрасывает мутация после переключения. */
export const favoritesKey = ['favorites'] as const

export const favoritesQuery = () =>
  queryOptions({
    queryKey: favoritesKey,
    queryFn: ({ signal }) => loadFavorites(signal),
  })
