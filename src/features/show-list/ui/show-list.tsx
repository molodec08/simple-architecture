import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { ShowGrid, ShowGridSkeleton, showQueries } from '@/services/show'
import { EmptyState } from '@/shared/ui/empty-state'
import { ErrorState } from '@/shared/ui/error-state'
import { ShowListPagination } from './show-list-pagination'

type ShowListProps = {
  /** Номер страницы для пользователя, начиная с 1 */
  page: number
  onPageChange: (page: number) => void
}

/**
 * Фича «Каталог сериалов»: постраничный список всех сериалов TVmaze.
 * Не знает, откуда берётся номер страницы (URL, стейт и т.д.) — это решает app.
 */
export const ShowList = ({ page, onPageChange }: ShowListProps) => {
  const { t } = useTranslation()
  const { data, isPending, isError, isPlaceholderData, refetch } = useQuery({
    ...showQueries.list(page - 1),
    // Пока грузится следующая страница, показываем предыдущую
    placeholderData: keepPreviousData,
  })

  const pagination = (
    <ShowListPagination
      page={page}
      hasNext={Boolean(data?.length)}
      isLoading={isPlaceholderData}
      onPageChange={onPageChange}
    />
  )

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">{t('showList.title')}</h1>
        {pagination}
      </div>

      {isPending && <ShowGridSkeleton />}
      {isError && <ErrorState onRetry={() => void refetch()} />}
      {data?.length === 0 && <EmptyState>{t('showList.empty')}</EmptyState>}
      {data && data.length > 0 && (
        <div className={isPlaceholderData ? 'opacity-60 transition-opacity' : undefined}>
          <ShowGrid shows={data} />
        </div>
      )}

      {data && data.length > 0 && <div className="flex justify-end">{pagination}</div>}
    </section>
  )
}
