import { useTranslation } from 'react-i18next'

export type PaginationProps = {
  /** Текущая страница, начиная с 1 */
  page: number
  hasNext: boolean
  /** Всего страниц, если известно (в каталоге TVmaze — неизвестно) */
  pageCount?: number
  isLoading?: boolean
  onPageChange: (page: number) => void
}

export const usePresenter = ({ page, hasNext, pageCount, isLoading = false, onPageChange }: PaginationProps) => {
  const { t } = useTranslation()

  return {
    prevText: t('pagination.prev'),
    nextText: t('pagination.next'),
    pageText: pageCount ? t('pagination.pageOf', { page, total: pageCount }) : t('pagination.page', { page }),
    isPrevDisabled: page <= 1 || isLoading,
    isNextDisabled: !hasNext || isLoading,
    onPrev: () => onPageChange(page - 1),
    onNext: () => onPageChange(page + 1),
  }
}
