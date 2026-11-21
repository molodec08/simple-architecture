import { useTranslation } from 'react-i18next'
import type { Show } from '@/model/show'

export type ResultCardProps = {
  show: Show
}

export const usePresenter = ({ show }: ResultCardProps) => {
  const { t } = useTranslation()
  const year = show.premiered?.slice(0, 4) ?? null

  return {
    showId: show.id,
    linkParams: { showId: show.id },
    name: show.name,
    posterUrl: show.posterUrl,
    backdropUrl: show.posterUrl ?? undefined,
    hasBackdrop: show.posterUrl !== null,
    rating: show.rating,
    status: show.status,
    yearText: year,
    hasYear: year !== null,
    summaryText: show.summary || t('showDetails.noSummary'),
    genres: show.genres,
    hasGenres: show.genres.length > 0,
  }
}
