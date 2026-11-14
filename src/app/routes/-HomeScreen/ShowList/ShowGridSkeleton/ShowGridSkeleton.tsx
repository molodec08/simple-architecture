import { Skeleton } from '@/shared/ui/kit/skeleton'
import { ShowGridLayout } from '../components/ShowGridLayout'
import { usePresenter } from './logic/usePresenter'

export const ShowGridSkeleton = () => {
  const { placeholders } = usePresenter()

  return (
    <ShowGridLayout>
      {placeholders.map((key) => (
        <div key={key} className="flex flex-col gap-3">
          <Skeleton className="aspect-[2/3] w-full rounded-xl" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </ShowGridLayout>
  )
}
