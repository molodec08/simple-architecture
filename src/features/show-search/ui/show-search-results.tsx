import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { ShowGrid, ShowGridSkeleton, showQueries } from '@/services/show'
import { EmptyState } from '@/shared/ui/empty-state'
import { ErrorState } from '@/shared/ui/error-state'

/** Фича «Поиск»: результаты поиска сериалов по названию. */
export const ShowSearchResults = ({ query }: { query: string }) => {
  const { t } = useTranslation()
  const { data, isPending, isError, refetch } = useQuery(showQueries.search(query))

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">{t('showSearch.resultsTitle', { query })}</h1>

      {isPending && <ShowGridSkeleton />}
      {isError && <ErrorState onRetry={() => void refetch()} />}
      {data?.length === 0 && <EmptyState>{t('showSearch.empty', { query })}</EmptyState>}
      {data && data.length > 0 && <ShowGrid shows={data} />}
    </section>
  )
}
