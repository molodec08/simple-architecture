import type { ReactNode } from 'react'
import { Skeleton } from '@/shared/ui/kit/skeleton'
import type { Show } from '../model/types'
import { ShowCard } from './show-card'

const ShowGridLayout = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">{children}</div>
)

export const ShowGrid = ({ shows }: { shows: Show[] }) => (
  <ShowGridLayout>
    {shows.map((show) => (
      <ShowCard key={show.id} show={show} />
    ))}
  </ShowGridLayout>
)

export const ShowGridSkeleton = ({ count = 10 }: { count?: number }) => (
  <ShowGridLayout>
    {Array.from({ length: count }, (_, index) => (
      <div key={index} className="flex flex-col gap-3">
        <Skeleton className="aspect-[2/3] w-full rounded-xl" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    ))}
  </ShowGridLayout>
)
