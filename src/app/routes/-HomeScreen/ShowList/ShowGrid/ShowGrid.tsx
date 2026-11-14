import type { Show } from '@/model/show'
import { ShowGridLayout } from '../components/ShowGridLayout'
import { ShowCard } from './ShowCard'

export const ShowGrid = ({ shows }: { shows: Show[] }) => (
  <ShowGridLayout>
    {shows.map((show) => (
      <ShowCard key={show.id} show={show} />
    ))}
  </ShowGridLayout>
)
