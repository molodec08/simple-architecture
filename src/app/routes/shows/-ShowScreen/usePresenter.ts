import { getRouteApi } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useShowDetails } from './useShowDetails'

const routeApi = getRouteApi('/shows/$showId')

export const usePresenter = () => {
  const { t } = useTranslation()
  const { showId } = routeApi.useParams()
  const show = useShowDetails(showId)

  return {
    show,
    summary: show.summary || t('showDetails.noSummary'),
    officialSiteText: t('showDetails.officialSite'),
    officialSiteUrl: show.officialSite ?? undefined,
    hasOfficialSite: Boolean(show.officialSite),
    hasCast: show.cast.length > 0,
  }
}
