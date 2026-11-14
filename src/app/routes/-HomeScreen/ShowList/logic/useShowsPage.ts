import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query'
import { loadShowsPage } from './tasks/load-shows-page'

/** @param apiPage — номер страницы API, начиная с 0 */
const showsPageQuery = (apiPage: number) =>
  queryOptions({
    queryKey: ['shows', 'list', apiPage],
    queryFn: ({ signal }) => loadShowsPage(apiPage, signal),
    // Индекс TVmaze кэшируется на их стороне до 24 часов — часто обновлять незачем
    staleTime: 10 * 60 * 1000,
  })

/**
 * Страница каталога.
 * @param page — номер страницы для пользователя, начиная с 1
 */
export const useShowsPage = (page: number) =>
  useQuery({
    ...showsPageQuery(page - 1),
    // Пока грузится следующая страница, показываем предыдущую
    placeholderData: keepPreviousData,
  })
