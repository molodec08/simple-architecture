import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/kit/card'
import type { Show } from '../model/types'
import { ShowPoster } from './show-poster'
import { ShowRating } from './show-rating'
import { ShowStatusBadge } from './show-status-badge'

export const ShowCard = ({ show }: { show: Show }) => (
  <Link
    to="/shows/$showId"
    params={{ showId: show.id }}
    className="group block rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
  >
    <Card className="h-full gap-3 overflow-hidden pt-0 transition-shadow group-hover:shadow-lg">
      <ShowPoster src={show.posterUrl} alt={show.name} />
      <CardHeader className="gap-2">
        <CardTitle className="line-clamp-1" title={show.name}>
          {show.name}
        </CardTitle>
        <CardDescription className="flex items-center justify-between gap-2">
          <ShowRating rating={show.rating} />
          <ShowStatusBadge status={show.status} />
        </CardDescription>
      </CardHeader>
      {show.genres.length > 0 && (
        <CardContent className="text-xs text-muted-foreground">{show.genres.join(' · ')}</CardContent>
      )}
    </Card>
  </Link>
)
