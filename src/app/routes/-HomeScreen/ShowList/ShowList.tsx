import { EmptyState } from '@/components/EmptyState'
import { ErrorState } from '@/components/ErrorState'
import { ShowGrid } from '@/components/ShowGrid'
import { ShowGridSkeleton } from '@/components/ShowGridSkeleton'
import { GenreFilter } from '../components/GenreFilter'
import { Pagination } from '../components/Pagination'
import { type ShowListProps, usePresenter } from './logic/usePresenter'

/** Каталог сериалов: постраничный список всех сериалов с фильтром по жанру внутри страницы. */
export const ShowList = (props: ShowListProps) => {
  const {
    title,
    emptyText,
    shows,
    isLoading,
    isError,
    isEmpty,
    hasShows,
    isGenreFilterVisible,
    gridClassName,
    onRetry,
    genreFilter,
    pagination,
  } = usePresenter(props)

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <Pagination {...pagination} />
      </div>

      {isGenreFilterVisible && <GenreFilter {...genreFilter} />}
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
