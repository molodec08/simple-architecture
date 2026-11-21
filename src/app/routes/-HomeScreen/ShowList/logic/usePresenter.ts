import { useTranslation } from 'react-i18next'
import { useCatalogPage } from './useCatalogPage'

export type ShowListProps = {
  /** Номер страницы для пользователя, начиная с 1 */
  page: number
  genre: string | undefined
  onPageChange: (page: number) => void
  onGenreChange: (genre: string | undefined) => void
}

export const usePresenter = ({ page, genre, onPageChange, onGenreChange }: ShowListProps) => {
  const { t } = useTranslation()
  const { data, isPending, isError, isPlaceholderData, refetch } = useCatalogPage(page, genre)
  const shows = data?.items ?? []
  const genres = data?.genres ?? []

  return {
    title: t('showList.title'),
    emptyText: data?.activeGenre ? t('showList.emptyGenre', { genre: data.activeGenre }) : t('showList.empty'),
    shows,
    isLoading: isPending,
    isError,
    isEmpty: data?.items.length === 0,
    hasShows: shows.length > 0,
    isGenreFilterVisible: genres.length > 0,
    gridClassName: isPlaceholderData ? 'opacity-60 transition-opacity' : undefined,
    onRetry: () => void refetch(),
    genreFilter: { genres, activeGenre: data?.activeGenre, onChange: onGenreChange },
    pagination: {
      page,
      hasNext: data?.hasNext ?? false,
      isLoading: isPlaceholderData,
      onPageChange,
    },
  }
}
