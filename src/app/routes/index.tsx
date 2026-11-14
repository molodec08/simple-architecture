import { createFileRoute } from '@tanstack/react-router'
import { HomeScreen } from './-HomeScreen'

export type HomeSearch = {
  /** Страница каталога или результатов поиска, начиная с 1 */
  page?: number
  /** Поисковый запрос */
  q?: string
  /** Выбранный жанр в результатах поиска */
  genre?: string
}

const parseString = (value: unknown) => (typeof value === 'string' ? value.trim() : '') || undefined

/** Главная страница: маршрут описывает URL, экран читает его через usePresenter. */
export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): HomeSearch => {
    const page = Number(search.page)
    return {
      page: Number.isInteger(page) && page > 1 ? page : undefined,
      q: parseString(search.q),
      genre: parseString(search.genre),
    }
  },
  component: HomeScreen,
})
