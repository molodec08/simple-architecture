import { QueryClient } from '@tanstack/react-query'
import { isApiError } from '@/shared/api'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
      // Ошибки 4xx повторять бессмысленно (кроме 429 — лимит запросов TVmaze)
      retry: (failureCount, error) => {
        if (isApiError(error) && error.status < 500 && error.status !== 429) return false
        return failureCount < 2
      },
    },
  },
})
