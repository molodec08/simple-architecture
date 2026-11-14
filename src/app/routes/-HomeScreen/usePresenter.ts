import { getRouteApi } from '@tanstack/react-router'

const routeApi = getRouteApi('/')

/** Первая страница в URL не пишется: `?page=1` и его отсутствие — одно и то же. */
const toPageParam = (page: number) => (page > 1 ? page : undefined)

/** Экран владеет состоянием URL: страница, поисковый запрос и жанр. */
export const usePresenter = () => {
  const { page = 1, q = '', genre } = routeApi.useSearch()
  const navigate = routeApi.useNavigate()

  return {
    query: q,
    page,
    genre,
    isSearching: q.length > 0,
    // Новый запрос — новая выдача: страница и жанр сбрасываются
    onQueryChange: (query: string) => void navigate({ search: { q: query || undefined }, replace: true }),
    onPageChange: (nextPage: number) => {
      void navigate({ search: (prev) => ({ ...prev, page: toPageParam(nextPage) }) })
      window.scrollTo({ top: 0 })
    },
    // Смена жанра меняет состав списка — возвращаемся на первую страницу
    onGenreChange: (nextGenre: string | undefined) =>
      void navigate({ search: (prev) => ({ q: prev.q, genre: nextGenre }) }),
  }
}
