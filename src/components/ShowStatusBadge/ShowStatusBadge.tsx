import { Badge } from '@/shared/ui/kit/badge'
import { type ShowStatusBadgeProps, usePresenter } from './logic/usePresenter'

export const ShowStatusBadge = (props: ShowStatusBadgeProps) => {
  const { label, isRunning, className } = usePresenter(props)

  return (
    <Badge className={className}>
      {isRunning && <span className="size-1.5 animate-pulse rounded-full bg-current" />}
      {label}
    </Badge>
  )
}
