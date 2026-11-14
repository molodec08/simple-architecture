import { mapShow, type Show } from '@/model/show'
import { tvmazeApi } from '@/shared/api'

/** Таска «найти сериалы по названию». Фильтрацию по запросу выполняет сам API. */
export const searchShows = async (query: string, signal?: AbortSignal): Promise<Show[]> =>
  (await tvmazeApi.searchShows(query, signal)).map((result) => mapShow(result.show))
