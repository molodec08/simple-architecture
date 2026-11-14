import { Link } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'
import { Button } from '@/shared/ui/kit/button'
import { usePresenter } from './usePresenter'

export const BackLink = () => {
  const { text } = usePresenter()

  return (
    <Button asChild variant="ghost" size="sm" className="w-fit">
      <Link to="/">
        <ArrowLeftIcon />
        {text}
      </Link>
    </Button>
  )
}
