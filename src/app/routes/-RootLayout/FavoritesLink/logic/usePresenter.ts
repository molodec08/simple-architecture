import { useTranslation } from 'react-i18next'
import { useFavorites } from '@/components/FavoriteToggle'

export const usePresenter = () => {
  const { t } = useTranslation()
  const { data: favorites } = useFavorites()
  const count = favorites?.length ?? 0

  return {
    text: t('favorites.title'),
    countText: String(count),
    ariaLabel: t('favorites.linkLabel', { count }),
  }
}
