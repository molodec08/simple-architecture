import { createFileRoute, notFound } from '@tanstack/react-router'
import { isApiError } from '@/shared/api'
import { ShowError } from './-ShowError'
import { ShowNotFound } from './-ShowNotFound'
import { ShowScreen, showDetailsQuery } from './-ShowScreen'
import { ShowSkeleton } from './-ShowSkeleton'

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
  // экран читает их через useSuspenseQuery
  loader: async ({ context: { queryClient }, params: { showId } }) => {
    try {
      await queryClient.ensureQueryData(showDetailsQuery(showId))
    } catch (error) {
      if (isApiError(error) && error.status === 404) throw notFound()
      throw error
    }
  },
  component: ShowScreen,
  pendingComponent: ShowSkeleton,
  errorComponent: ShowError,
  notFoundComponent: ShowNotFound,
})
