import { queryOptions } from '@tanstack/react-query'
import { tvmazeApi } from '@/shared/api'
import { mapShowDetails } from './show-details'

/** Запрос подробностей о сериале. Нужен и экрану, и лоадеру маршрута. */
export const showDetailsQuery = (id: number) =>
  queryOptions({
    queryKey: ['shows', 'detail', id],
    queryFn: async ({ signal }) => mapShowDetails(await tvmazeApi.getShow(id, signal)),
  })
