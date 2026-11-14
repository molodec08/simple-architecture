import { mapShow, type Show } from '@/model/show'
import { tvmazeApi } from '@/shared/api'

/**
 * Таска «загрузить страницу каталога».
 * @param apiPage — номер страницы API, начиная с 0; за концом каталога — пустой массив
 */
export const loadShowsPage = async (apiPage: number, signal?: AbortSignal): Promise<Show[]> =>
  (await tvmazeApi.getShows(apiPage, signal)).map(mapShow)
