import { Badge } from '@/shared/ui/kit/badge'
import { type GenreBadgeProps, usePresenter } from './usePresenter'

export const GenreBadge = (props: GenreBadgeProps) => {
  const { label, style } = usePresenter(props)

  return (
    <Badge
      style={style}
      className="bg-[oklch(0.95_0.05_var(--hue))] text-[oklch(0.42_0.14_var(--hue))] dark:bg-[oklch(0.32_0.07_var(--hue))] dark:text-[oklch(0.88_0.09_var(--hue))]"
    >
      {label}
    </Badge>
  )
}
