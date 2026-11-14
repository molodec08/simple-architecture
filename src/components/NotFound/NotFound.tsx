import { Link } from '@tanstack/react-router'
import { Button } from '@/shared/ui/kit/button'
import { type NotFoundProps, usePresenter } from './usePresenter'

export const NotFound = (props: NotFoundProps) => {
  const { title, description, backText } = usePresenter(props)

  return (
    <div className="flex flex-col items-center gap-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
      <Button asChild variant="outline">
        <Link to="/">{backText}</Link>
      </Button>
    </div>
  )
}
