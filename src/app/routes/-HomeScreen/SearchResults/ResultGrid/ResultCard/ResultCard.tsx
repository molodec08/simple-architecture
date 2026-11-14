import { Link } from '@tanstack/react-router'
import { GenreBadge } from '@/components/GenreBadge'
import { ShowPoster } from '@/components/ShowPoster'
import { ShowRating } from '@/components/ShowRating'
import { ShowStatusBadge } from '@/components/ShowStatusBadge'
import { Card } from '@/shared/ui/kit/card'
import { type ResultCardProps, usePresenter } from './logic/usePresenter'

/** Карточка результата: размытый постер подкрашивает шапку в цвета сериала. */
export const ResultCard = (props: ResultCardProps) => {
  const {
    linkParams,
    name,
    posterUrl,
    backdropUrl,
    hasBackdrop,
    rating,
    status,
    yearText,
    hasYear,
    summaryText,
    genres,
    hasGenres,
  } = usePresenter(props)

  return (
    <Link
      to="/shows/$showId"
      params={linkParams}
      className="group block h-full rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Card className="h-full gap-0 rounded-2xl py-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-primary/15">
        <div className="relative isolate flex gap-4 p-5">
          <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br from-primary/25 to-highlight/25">
            {hasBackdrop && (
              <img src={backdropUrl} alt="" className="size-full scale-150 object-cover opacity-60 blur-2xl saturate-150" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-card/10 via-card/60 to-card" />
          </div>

          <div className="w-24 shrink-0 overflow-hidden rounded-lg shadow-lg ring-1 ring-black/10 transition-transform duration-300 group-hover:scale-105 sm:w-28">
            <ShowPoster src={posterUrl} alt={name} />
          </div>

          <div className="flex min-w-0 flex-col items-start gap-2">
            <ShowStatusBadge status={status} />
            <h3 className="line-clamp-3 text-lg leading-tight font-bold group-hover:text-primary">{name}</h3>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <ShowRating rating={rating} />
              {hasYear && <span>{yearText}</span>}
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 px-5 pb-5">
          <p className="line-clamp-4 text-sm leading-relaxed text-muted-foreground">{summaryText}</p>
          {hasGenres && (
            <div className="mt-auto flex flex-wrap gap-1.5">
              {genres.map((genre) => (
                <GenreBadge key={genre} genre={genre} />
              ))}
            </div>
          )}
        </div>
      </Card>
    </Link>
  )
}
