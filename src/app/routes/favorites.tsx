import { createFileRoute } from '@tanstack/react-router'
import { FavoritesScreen } from './-FavoritesScreen'

/** Страница избранного: список хранится на backend. */
export const Route = createFileRoute('/favorites')({
  component: FavoritesScreen,
})
