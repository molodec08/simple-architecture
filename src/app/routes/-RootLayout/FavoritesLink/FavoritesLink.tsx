import { Link } from '@tanstack/react-router'
import { StarIcon } from 'lucide-react'
import { Button } from '@/shared/ui/kit/button'
import { usePresenter } from './logic/usePresenter'

/** Кнопка в шапке: сколько сериалов в избранном, по клику — страница избранного. */
export const FavoritesLink = () => {
  const { text, countText, ariaLabel } = usePresenter()

  return (
    <Button variant="outline" size="sm" asChild>
      <Link to="/favorites" aria-label={ariaLabel} title={ariaLabel}>
        <StarIcon className="fill-amber-400 text-amber-500" />
        <span className="hidden sm:inline">{text}</span>
        <span className="min-w-5 rounded-full bg-primary px-1.5 text-center text-xs font-semibold text-primary-foreground tabular-nums">
          {countText}
        </span>
      </Link>
    </Button>
  )
}
