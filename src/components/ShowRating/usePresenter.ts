import { useTranslation } from 'react-i18next'

export type ShowRatingProps = {
  rating: number | null
}

export const usePresenter = ({ rating }: ShowRatingProps) => {
  const { t } = useTranslation()

  return {
    hasRating: rating !== null,
    value: rating?.toFixed(1),
    noRatingText: t('show.noRating'),
  }
}
