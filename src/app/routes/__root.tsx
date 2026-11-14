import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext } from '@tanstack/react-router'
import { NotFound } from '@/components/NotFound'
import { RootLayout } from './-RootLayout'

/** Контекст, доступный во всех лоадерах и beforeLoad */
export type RouterContext = {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  notFoundComponent: () => <NotFound />,
})
