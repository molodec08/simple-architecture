import { createFileRoute } from '@tanstack/react-router'
import { ShowList } from '@/features/show-list'
import { ShowSearchInput, ShowSearchResults } from '@/features/show-search'

type HomeSearch = {
  /** Страница каталога, начиная с 1 */
  page?: number
  /** Поисковый запрос */
  q?: string
}

/**
 * Главная страница. Маршрут — это слой композиции:
 * он владеет состоянием URL и решает, какие фичи показать.
 * Сами фичи ничего не знают о URL и друг о друге.
 */
export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): HomeSearch => {
    const page = Number(search.page)
    const q = typeof search.q === 'string' ? search.q.trim() : ''
    return {
      page: Number.isInteger(page) && page > 1 ? page : undefined,
      q: q || undefined,
    }
  },
  component: HomePage,
})

function HomePage() {
  const { page = 1, q = '' } = Route.useSearch()
  const navigate = Route.useNavigate()

  return (
    <div className="flex flex-col gap-8">
      <ShowSearchInput
        value={q}
        onChange={(query) => void navigate({ search: { q: query || undefined }, replace: true })}
      />

      {q ? (
        <ShowSearchResults query={q} />
      ) : (
        <ShowList
          page={page}
          onPageChange={(nextPage) => {
            void navigate({ search: { page: nextPage } })
            window.scrollTo({ top: 0 })
          }}
        />
      )}
    </div>
  )
}
