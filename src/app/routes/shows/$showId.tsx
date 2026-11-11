import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { createFileRoute, Link, notFound, useRouter } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ShowDetails } from '@/features/show-details'
import { showQueries } from '@/services/show'
import { isApiError } from '@/shared/api'
import { Button } from '@/shared/ui/kit/button'
import { ErrorState } from '@/shared/ui/error-state'
import { NotFound } from '../../layout/not-found'
import { ShowDetailsSkeleton } from '../../layout/show-details-skeleton'

export const Route = createFileRoute('/shows/$showId')({
  params: {
    parse: ({ showId }) => {
      const id = Number(showId)
      if (!Number.isInteger(id) || id <= 0) throw notFound()
      return { showId: id }
    },
    stringify: ({ showId }) => ({ showId: String(showId) }),
  },
  // Лоадер заранее кладёт данные в кэш React Query;
  // компонент читает их через useSuspenseQuery
  loader: async ({ context: { queryClient }, params: { showId } }) => {
    try {
      await queryClient.ensureQueryData(showQueries.detail(showId))
    } catch (error) {
      if (isApiError(error) && error.status === 404) throw notFound()
      throw error
    }
  },
  component: ShowPage,
  pendingComponent: ShowDetailsSkeleton,
  errorComponent: ShowPageError,
  notFoundComponent: ShowPageNotFound,
})

function BackLink() {
  const { t } = useTranslation()
  return (
    <Button asChild variant="ghost" size="sm" className="w-fit">
      <Link to="/">
        <ArrowLeftIcon />
        {t('common.backToList')}
      </Link>
    </Button>
  )
}

function ShowPage() {
  const { showId } = Route.useParams()
  return (
    <div className="flex flex-col gap-6">
      <BackLink />
      <ShowDetails showId={showId} />
    </div>
  )
}

function ShowPageError() {
  const router = useRouter()
  const { reset } = useQueryErrorResetBoundary()

  useEffect(() => {
    reset()
  }, [reset])

  return (
    <div className="flex flex-col gap-6">
      <BackLink />
      <ErrorState onRetry={() => void router.invalidate()} />
    </div>
  )
}

function ShowPageNotFound() {
  const { t } = useTranslation()
  return <NotFound description={t('showDetails.notFound')} />
}
