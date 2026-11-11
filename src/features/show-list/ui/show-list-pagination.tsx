import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/kit/button'

type ShowListPaginationProps = {
  page: number
  hasNext: boolean
  isLoading: boolean
  onPageChange: (page: number) => void
}

export const ShowListPagination = ({ page, hasNext, isLoading, onPageChange }: ShowListPaginationProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={page <= 1 || isLoading}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeftIcon />
        {t('showList.prev')}
      </Button>
      <span className="min-w-24 text-center text-sm text-muted-foreground">
        {t('showList.page', { page })}
      </span>
      <Button variant="outline" size="sm" disabled={!hasNext || isLoading} onClick={() => onPageChange(page + 1)}>
        {t('showList.next')}
        <ChevronRightIcon />
      </Button>
    </div>
  )
}
