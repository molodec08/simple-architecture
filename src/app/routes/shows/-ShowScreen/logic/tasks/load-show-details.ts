import { tvmazeApi } from '@/shared/api'
import { mapShowDetails, type ShowDetails } from '../../show-details'

/** Таска «загрузить подробности о сериале» вместе с актёрским составом. */
export const loadShowDetails = async (id: number, signal?: AbortSignal): Promise<ShowDetails> =>
  mapShowDetails(await tvmazeApi.getShow(id, signal))
