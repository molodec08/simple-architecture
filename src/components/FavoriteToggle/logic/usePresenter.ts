import { useTranslation } from 'react-i18next'
import type { ToggleFavoriteResult } from './tasks/toggle-favorite'
import { useFavorites } from './useFavorites'
import { useToggleFavorite } from './useToggleFavorite'
import { cn } from '@/shared/lib'
import { toast } from '@/shared/ui/kit/sonner'

export type FavoriteToggleProps = {
  showId: number
  /** Позиционирование снаружи (например, поверх постера) */
  className?: string
}

export const usePresenter = ({ showId, className }: FavoriteToggleProps) => {
  const { t } = useTranslation()
  const { data: favorites } = useFavorites()
  const { mutate, isPending } = useToggleFavorite()
  const isFavorite = favorites?.some((show) => show.id === showId) ?? false
  const label = isFavorite ? t('favorites.remove') : t('favorites.add')

  // Уведомление — реакция интерфейса, а не бизнес-логика, поэтому оно здесь, а не в таске
  const notify = ({ isFavorite: added, show }: ToggleFavoriteResult) =>
    toast.success(t(added ? 'favorites.added' : 'favorites.removed', { name: show.name }))

  return {
    isFavorite,
    label,
    isDisabled: isPending,
    className: cn(
      'rounded-full bg-card/90 shadow-sm backdrop-blur aria-pressed:[&_svg]:fill-amber-400 aria-pressed:[&_svg]:text-amber-500',
      className,
    ),
    onToggle: () => mutate(showId, { onSuccess: notify, onError: () => toast.error(t('favorites.error')) }),
  }
}
