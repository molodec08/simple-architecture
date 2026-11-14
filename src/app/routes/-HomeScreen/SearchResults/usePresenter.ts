import { useTranslation } from 'react-i18next'
import { useGenreFilter } from './useGenreFilter'
import { usePageSlice } from './usePageSlice'
import { useSearchShows } from './useSearchShows'

const PAGE_SIZE = 3

export type SearchResultsProps = {
  query: string
  /** Страница выдачи, начиная с 1 */
  page: number
  genre: string | undefined
  onPageChange: (page: number) => void
  onGenreChange: (genre: string | undefined) => void
}

export const usePresenter = ({ query, page, genre, onPageChange, onGenreChange }: SearchResultsProps) => {
  const { t } = useTranslation()
  const { data, isLoading, isError, retry } = useSearchShows(query)
  const { genres, activeGenre, filteredShows } = useGenreFilter(data ?? [], genre)
  const { pageItems, currentPage, pageCount } = usePageSlice(filteredShows, page, PAGE_SIZE)

  return {
    title: t('showSearch.resultsTitle', { query }),
    emptyText: t('showSearch.empty', { query }),
    foundText: t('showSearch.found', { total: filteredShows.length }),
    skeletonCount: PAGE_SIZE,
    shows: pageItems,
    isLoading,
    isError,
    isEmpty: data?.length === 0,
    hasShows: pageItems.length > 0,
    isGenreFilterVisible: genres.length > 0,
    isPaginationVisible: pageCount > 1,
    onRetry: retry,
    genreFilter: { genres, activeGenre, onChange: onGenreChange },
    pagination: { page: currentPage, pageCount, hasNext: currentPage < pageCount, onPageChange },
  }
}
