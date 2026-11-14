import { Skeleton } from '@/shared/ui/kit/skeleton'
import { type ResultGridSkeletonProps, usePresenter } from './usePresenter'

export const ResultGridSkeleton = (props: ResultGridSkeletonProps) => {
  const { placeholders } = usePresenter(props)

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {placeholders.map((key) => (
        <div key={key} className="flex flex-col gap-4 rounded-2xl border bg-card p-5">
          <div className="flex gap-4">
            <Skeleton className="aspect-[2/3] w-24 shrink-0 rounded-lg sm:w-28" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  )
}
