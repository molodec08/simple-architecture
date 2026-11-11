import { useSuspenseQuery } from '@tanstack/react-query'
import { ExternalLinkIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ShowPoster, ShowRating, ShowStatusBadge, showQueries } from '@/services/show'
import { Badge } from '@/shared/ui/kit/badge'
import { ShowCast } from './show-cast'
import { ShowFacts } from './show-facts'

/**
 * Фича «Карточка сериала».
 * Использует useSuspenseQuery: данные заранее загружает лоадер роутера,
 * поэтому здесь они всегда есть, без состояний загрузки.
 */
export const ShowDetails = ({ showId }: { showId: number }) => {
  const { t } = useTranslation()
  const { data: show } = useSuspenseQuery(showQueries.detail(showId))

  return (
    <article className="flex flex-col gap-10">
      <div className="grid gap-8 md:grid-cols-[280px_1fr]">
        <ShowPoster src={show.posterUrlLarge} alt={show.name} className="rounded-xl" />

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold">{show.name}</h1>
            <div className="flex flex-wrap items-center gap-3">
              <ShowRating rating={show.rating} />
              <ShowStatusBadge status={show.status} />
              {show.genres.map((genre) => (
                <Badge key={genre} variant="outline">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>

          <p className="leading-relaxed text-muted-foreground">{show.summary || t('showDetails.noSummary')}</p>

          <ShowFacts show={show} />

          {show.officialSite && (
            <a
              href={show.officialSite}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
            >
              {t('showDetails.officialSite')}
              <ExternalLinkIcon className="size-4" />
            </a>
          )}
        </div>
      </div>

      {show.cast.length > 0 && <ShowCast cast={show.cast} />}
    </article>
  )
}
