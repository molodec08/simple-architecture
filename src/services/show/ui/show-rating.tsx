import { StarIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const ShowRating = ({ rating }: { rating: number | null }) => {
  const { t } = useTranslation()

  if (rating === null) {
    return <span className="text-sm text-muted-foreground">{t('show.noRating')}</span>
  }

  return (
    <span className="inline-flex items-center gap-1 text-sm font-medium">
      <StarIcon className="size-4 fill-yellow-400 text-yellow-400" />
      {rating.toFixed(1)}
    </span>
  )
}
