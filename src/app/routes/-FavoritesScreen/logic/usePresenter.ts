import { useTranslation } from 'react-i18next'
import { useFavorites } from '@/components/FavoriteToggle'

export const usePresenter = () => {
  const { t } = useTranslation()
  const { data, isPending, isError, refetch } = useFavorites()
  const shows = data ?? []

  return {
    title: t('favorites.title'),
    countText: t('favorites.count', { count: shows.length }),
    emptyText: t('favorites.empty'),
    shows,
    isLoading: isPending,
    isError,
    isEmpty: data?.length === 0,
    hasShows: shows.length > 0,
    onRetry: () => void refetch(),
  }
}
