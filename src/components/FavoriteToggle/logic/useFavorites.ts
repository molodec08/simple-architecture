import { useQuery } from '@tanstack/react-query'
import { favoritesQuery } from './favorites-query'

/** Список избранного. Один запрос на всё приложение: кнопка, звёздочки и страница делят кеш. */
export const useFavorites = () => useQuery(favoritesQuery())
