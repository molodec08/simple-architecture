import { Link } from '@tanstack/react-router'
import { GenreBadge } from '@/components/GenreBadge'
import { ShowPoster } from '@/components/ShowPoster'
import { ShowRating } from '@/components/ShowRating'
import { ShowStatusBadge } from '@/components/ShowStatusBadge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/kit/card'
import { type ShowCardProps, usePresenter } from './logic/usePresenter'

export const ShowCard = (props: ShowCardProps) => {
  const { show, linkParams, genres, hasGenres } = usePresenter(props)

  return (
    <Link
      to="/shows/$showId"
      params={linkParams}
      className="group block h-full rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Card className="h-full gap-3 rounded-2xl pt-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-primary/15">
        <div className="relative overflow-hidden">
          <ShowPoster
            src={show.posterUrl}
            alt={show.name}
            className="transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 rounded-full bg-card/90 shadow-sm backdrop-blur">
            <ShowStatusBadge status={show.status} />
          </div>
        </div>
        <CardHeader className="gap-1.5">
          <CardTitle className="line-clamp-1 group-hover:text-primary" title={show.name}>
            {show.name}
          </CardTitle>
          <CardDescription>
            <ShowRating rating={show.rating} />
          </CardDescription>
        </CardHeader>
        {hasGenres && (
          <CardContent className="mt-auto flex flex-wrap gap-1">
            {genres.map((genre) => (
              <GenreBadge key={genre} genre={genre} />
            ))}
          </CardContent>
        )}
      </Card>
    </Link>
  )
}
