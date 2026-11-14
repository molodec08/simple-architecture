import { ExternalLinkIcon } from 'lucide-react'
import { GenreBadge } from '@/components/GenreBadge'
import { ShowPoster } from '@/components/ShowPoster'
import { ShowRating } from '@/components/ShowRating'
import { ShowStatusBadge } from '@/components/ShowStatusBadge'
import { BackLink } from '../-components/BackLink'
import { ShowCast } from './ShowCast'
import { ShowFacts } from './ShowFacts'
import { usePresenter } from './logic/usePresenter'

/** Страница сериала. Данные заранее загружает лоадер роутера, поэтому состояний загрузки здесь нет. */
export const ShowScreen = () => {
  const { show, summary, officialSiteText, officialSiteUrl, hasOfficialSite, hasCast } = usePresenter()

  return (
    <div className="flex flex-col gap-6">
      <BackLink />
      <article className="flex flex-col gap-10">
        <div className="grid gap-8 md:grid-cols-[280px_1fr]">
          <ShowPoster
            src={show.posterUrlLarge}
            alt={show.name}
            className="rounded-2xl shadow-2xl shadow-primary/20 ring-1 ring-border"
          />

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{show.name}</h1>
              <div className="flex flex-wrap items-center gap-3">
                <ShowRating rating={show.rating} />
                <ShowStatusBadge status={show.status} />
                {show.genres.map((genre) => (
                  <GenreBadge key={genre} genre={genre} />
                ))}
              </div>
            </div>

            <p className="leading-relaxed text-muted-foreground">{summary}</p>

            <ShowFacts show={show} />

            {hasOfficialSite && (
              <a
                href={officialSiteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                {officialSiteText}
                <ExternalLinkIcon className="size-4" />
              </a>
            )}
          </div>
        </div>

        {hasCast && <ShowCast cast={show.cast} />}
      </article>
    </div>
  )
}
