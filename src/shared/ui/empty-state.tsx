import type { ReactNode } from 'react'

export const EmptyState = ({ children }: { children: ReactNode }) => (
  <p className="py-16 text-center text-muted-foreground">{children}</p>
)
