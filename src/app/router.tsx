import { createRouter } from '@tanstack/react-router'
import { queryClient } from './query-client'
import { routeTree } from './routeTree.gen'

export const router = createRouter({
  routeTree,
  context: { queryClient },
  // Лоадеры только кладут данные в кэш React Query, поэтому собственный кэш
  // роутера не нужен — за свежесть данных отвечает React Query
  defaultPreloadStaleTime: 0,
  defaultPreload: 'intent',
  scrollRestoration: true,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
