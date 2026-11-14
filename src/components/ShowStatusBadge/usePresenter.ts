import { useTranslation } from 'react-i18next'
import { knownShowStatuses, type KnownShowStatus } from '@/model/show'

export type ShowStatusBadgeProps = {
  status: string
}

const isKnownStatus = (status: string): status is KnownShowStatus =>
  (knownShowStatuses as readonly string[]).includes(status)

/** Цвет статуса: выходит — зелёный, в разработке — янтарный, остальное — нейтральный. */
const statusClassNames: Partial<Record<string, string>> = {
  Running: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  'In Development': 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
}

export const usePresenter = ({ status }: ShowStatusBadgeProps) => {
  const { t } = useTranslation()

  return {
    label: isKnownStatus(status) ? t(`show.status.${status}`) : status,
    isRunning: status === 'Running',
    className: statusClassNames[status] ?? 'bg-muted text-muted-foreground',
  }
}
