import { useMutation, useQueryClient } from '@tanstack/react-query'
import { favoritesKey } from './favorites-query'
import { toggleFavorite } from './tasks/toggle-favorite'

/** Переключение избранного. После ответа сервера список избранного перезапрашивается. */
export const useToggleFavorite = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: toggleFavorite,
    onSettled: () => queryClient.invalidateQueries({ queryKey: favoritesKey }),
  })
}
