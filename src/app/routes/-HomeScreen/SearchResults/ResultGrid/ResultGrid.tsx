import type { Show } from '@/model/show'
import { ResultCard } from './ResultCard'

export const ResultGrid = ({ shows }: { shows: Show[] }) => (
  <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {shows.map((show) => (
      <li key={show.id}>
        <ResultCard show={show} />
      </li>
    ))}
  </ul>
)
