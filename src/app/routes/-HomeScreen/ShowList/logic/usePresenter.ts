import { useTranslation } from 'react-i18next'
import { useShowsPage } from './useShowsPage'

export type ShowListProps = {
  /** Номер страницы для пользователя, начиная с 1 */
  page: number
  onPageChange: (page: number) => void
}

export const usePresenter = ({ page, onPageChange }: ShowListProps) => {
  const { t } = useTranslation()
  const { data, isPending, isError, isPlaceholderData, refetch } = useShowsPage(page)
  const shows = data ?? []

  return {
    title: t('showList.title'),
    emptyText: t('showList.empty'),
    shows,
    isLoading: isPending,
    isError,
    isEmpty: data?.length === 0,
    hasShows: shows.length > 0,
    gridClassName: isPlaceholderData ? 'opacity-60 transition-opacity' : undefined,
    onRetry: () => void refetch(),
    pagination: {
      page,
      hasNext: shows.length > 0,
      isLoading: isPlaceholderData,
      onPageChange,
    },
  }
}
