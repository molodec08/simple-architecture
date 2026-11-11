import { Skeleton } from '@/shared/ui/kit/skeleton'

export const ShowDetailsSkeleton = () => (
  <div className="flex flex-col gap-6">
    <Skeleton className="h-8 w-32" />
    <div className="grid gap-8 md:grid-cols-[280px_1fr]">
      <Skeleton className="aspect-[2/3] w-full rounded-xl" />
      <div className="flex flex-col gap-4">
        <Skeleton className="h-9 w-2/3" />
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-20 w-1/2" />
      </div>
    </div>
  </div>
)
