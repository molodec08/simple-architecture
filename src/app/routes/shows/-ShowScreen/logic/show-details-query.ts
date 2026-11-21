import { queryOptions } from '@tanstack/react-query'
import { loadShowDetails } from './tasks/load-show-details'

/** Запрос подробностей о сериале. Нужен и экрану, и лоадеру маршрута. */
export const showDetailsQuery = (id: number) =>
  queryOptions({
    queryKey: ['shows', 'detail', id],
    queryFn: ({ signal }) => loadShowDetails(id, signal),
  })
