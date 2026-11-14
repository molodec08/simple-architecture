import { ErrorState } from '@/components/ErrorState'
import { EmptyState } from '../components/EmptyState'
import { ShowGrid } from './ShowGrid'
import { ShowGridSkeleton } from './ShowGridSkeleton'
import { Pagination } from '../components/Pagination'
import { type ShowListProps, usePresenter } from './usePresenter'

/** Каталог сериалов: постраничный список всех сериалов TVmaze. */
export const ShowList = (props: ShowListProps) => {
  const { title, emptyText, shows, isLoading, isError, isEmpty, hasShows, gridClassName, onRetry, pagination } =
    usePresenter(props)

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <Pagination {...pagination} />
      </div>

      {isLoading && <ShowGridSkeleton />}
      {isError && <ErrorState onRetry={onRetry} />}
      {isEmpty && <EmptyState>{emptyText}</EmptyState>}
      {hasShows && (
        <div className={gridClassName}>
          <ShowGrid shows={shows} />
        </div>
      )}

      {hasShows && (
        <div className="flex justify-end">
          <Pagination {...pagination} />
        </div>
      )}
    </section>
  )
}
