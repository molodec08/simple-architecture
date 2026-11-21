import { EmptyState } from '@/components/EmptyState'
import { ErrorState } from '@/components/ErrorState'
import { ShowGrid } from '@/components/ShowGrid'
import { ShowGridSkeleton } from '@/components/ShowGridSkeleton'
import { usePresenter } from './logic/usePresenter'

/** Избранное: сериалы, отмеченные звёздочкой. Убрать сериал можно той же звёздочкой. */
export const FavoritesScreen = () => {
  const { title, countText, emptyText, shows, isLoading, isError, isEmpty, hasShows, onRetry } = usePresenter()

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
        {hasShows && (
          <span className="rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">{countText}</span>
        )}
      </div>

      {isLoading && <ShowGridSkeleton />}
      {isError && <ErrorState onRetry={onRetry} />}
      {isEmpty && <EmptyState>{emptyText}</EmptyState>}
      {hasShows && <ShowGrid shows={shows} />}
    </section>
  )
}
