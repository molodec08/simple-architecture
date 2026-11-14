import { StarIcon } from 'lucide-react'
import { type ShowRatingProps, usePresenter } from './logic/usePresenter'

export const ShowRating = (props: ShowRatingProps) => {
  const { hasRating, value, noRatingText } = usePresenter(props)

  if (!hasRating) {
    return <span className="text-sm text-muted-foreground">{noRatingText}</span>
  }

  return (
    <span className="inline-flex items-center gap-1 text-sm font-medium">
      <StarIcon className="size-4 fill-yellow-400 text-yellow-400" />
      {value}
    </span>
  )
}
