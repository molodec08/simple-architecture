import { useSuspenseQuery } from '@tanstack/react-query'
import { showDetailsQuery } from './show-details-query'

/** Подробности о сериале. Данные уже в кэше: их положил лоадер маршрута. */
export const useShowDetails = (showId: number) => useSuspenseQuery(showDetailsQuery(showId)).data
