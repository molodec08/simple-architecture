import { useTranslation } from 'react-i18next'
import type { ShowDetails } from '@/services/show'

export const ShowFacts = ({ show }: { show: ShowDetails }) => {
  const { t, i18n } = useTranslation()

  const formatDate = (date: string | null) =>
    date ? new Intl.DateTimeFormat(i18n.resolvedLanguage, { dateStyle: 'long' }).format(new Date(date)) : null

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

  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
      {facts.map((fact) => (
        <div key={fact.label} className="contents">
          <dt className="text-muted-foreground">{fact.label}</dt>
          <dd className="font-medium">{fact.value}</dd>
        </div>
      ))}
    </dl>
  )
}
