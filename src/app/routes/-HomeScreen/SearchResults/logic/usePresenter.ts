import { useTranslation } from 'react-i18next'
import { useSearchShows } from './useSearchShows'

/** Сколько карточек-заглушек показать, пока идёт поиск (backend отдаёт по 3) */
const SKELETON_COUNT = 3

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
  const { data, isLoading, isError, retry } = useSearchShows(query, page, genre)
  const shows = data?.items ?? []
  const genres = data?.genres ?? []
  const pageCount = data?.pageCount ?? 1

  return {
    title: t('showSearch.resultsTitle', { query }),
    emptyText: t('showSearch.empty', { query }),
    foundText: t('showSearch.found', { total: data?.total ?? 0 }),
    skeletonCount: SKELETON_COUNT,
    shows,
    isLoading,
    isError,
    isEmpty: data?.total === 0,
    hasShows: shows.length > 0,
    isGenreFilterVisible: genres.length > 0,
    isPaginationVisible: pageCount > 1,
    onRetry: retry,
    genreFilter: { genres, activeGenre: data?.activeGenre, onChange: onGenreChange },
    pagination: { page: data?.page ?? page, pageCount, hasNext: data?.hasNext ?? false, onPageChange },
  }
}
