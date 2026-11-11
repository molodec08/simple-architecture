import { useTranslation } from 'react-i18next'
import { Badge } from '@/shared/ui/kit/badge'
import { knownShowStatuses, type KnownShowStatus } from '../model/types'

const isKnownStatus = (status: string): status is KnownShowStatus =>
  (knownShowStatuses as readonly string[]).includes(status)

export const ShowStatusBadge = ({ status }: { status: string }) => {
  const { t } = useTranslation()
  const label = isKnownStatus(status) ? t(`show.status.${status}`) : status

  return <Badge variant={status === 'Running' ? 'default' : 'secondary'}>{label}</Badge>
}
