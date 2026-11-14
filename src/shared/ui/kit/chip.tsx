import type { ComponentProps } from 'react'
import { cn } from 'cn'

type ChipProps = ComponentProps<'button'> & {
  /** Выбран ли тег; отражается в aria-pressed, от него зависят стили */
  selected?: boolean
}

/** Кликабельный тег-переключатель. Только внешний вид: никакой логики. */
function Chip({ selected = false, className, type = 'button', ...props }: ChipProps) {
  return (
    <button
      data-slot="chip"
      type={type}
      aria-pressed={selected}
      className={cn(
        'inline-flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-border bg-background px-3 text-sm font-medium whitespace-nowrap transition-colors outline-none',
        'hover:border-primary/40 hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50',
        'aria-pressed:border-transparent aria-pressed:bg-gradient-to-r aria-pressed:from-primary aria-pressed:to-highlight aria-pressed:text-white aria-pressed:shadow-md aria-pressed:shadow-primary/25',
        className,
      )}
      {...props}
    />
  )
}

export { Chip }
