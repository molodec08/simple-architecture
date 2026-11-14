import { useTranslation } from 'react-i18next'
import type { ShowDetails } from '../../show-details'
import { useFormatDate } from './useFormatDate'

export type ShowFactsProps = {
  show: ShowDetails
}

export const usePresenter = ({ show }: ShowFactsProps) => {
  const { t } = useTranslation()
  const formatDate = useFormatDate()

  const facts = [
    { label: t('showDetails.premiered'), value: formatDate(show.premiered) },
    { label: t('showDetails.ended'), value: formatDate(show.ended) },
    { label: t('showDetails.network'), value: show.network },
    { label: t('showDetails.language'), value: show.language },
    {
      label: t('showDetails.runtime'),
      value: show.runtime ? t('showDetails.runtimeValue', { count: show.runtime }) : null,
    },
  ].filter((fact) => fact.value)

  return { facts }
}
