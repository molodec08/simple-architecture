import { ErrorState } from '@/components/ErrorState'
import { EmptyState } from '../components/EmptyState'
import { Pagination } from '../components/Pagination'
import { GenreFilter } from './GenreFilter'
import { ResultGrid } from './ResultGrid'
import { ResultGridSkeleton } from './ResultGridSkeleton'
import { type SearchResultsProps, usePresenter } from './usePresenter'

export const SearchResults = (props: SearchResultsProps) => {
  const {
    title,
    emptyText,
    foundText,
    skeletonCount,
    shows,
    isLoading,
    isError,
    isEmpty,
    hasShows,
    isGenreFilterVisible,
    isPaginationVisible,
    onRetry,
    genreFilter,
    pagination,
  } = usePresenter(props)

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {hasShows && (
          <span className="rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">{foundText}</span>
        )}
      </div>

      {isGenreFilterVisible && <GenreFilter {...genreFilter} />}
      {isLoading && <ResultGridSkeleton count={skeletonCount} />}
      {isError && <ErrorState onRetry={onRetry} />}
      {isEmpty && <EmptyState>{emptyText}</EmptyState>}
      {hasShows && <ResultGrid shows={shows} />}

      {isPaginationVisible && (
        <div className="flex justify-center">
          <Pagination {...pagination} />
        </div>
      )}
    </section>
  )
}
