import { StarIcon } from 'lucide-react'
import { Button } from '@/shared/ui/kit/button'
import { type FavoriteToggleProps, usePresenter } from './logic/usePresenter'

/** Звёздочка «в избранное». Заливка зависит от aria-pressed, а не от условий в коде. */
export const FavoriteToggle = (props: FavoriteToggleProps) => {
  const { isFavorite, label, isDisabled, className, onToggle } = usePresenter(props)

  return (
    <Button
      variant="outline"
      size="icon-sm"
      aria-pressed={isFavorite}
      aria-label={label}
      title={label}
      disabled={isDisabled}
      className={className}
      onClick={onToggle}
    >
      <StarIcon />
    </Button>
  )
}
