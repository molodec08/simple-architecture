import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Button } from '@/shared/ui/kit/button'
import { type PaginationProps, usePresenter } from './logic/usePresenter'

export const Pagination = (props: PaginationProps) => {
  const { prevText, nextText, pageText, isPrevDisabled, isNextDisabled, onPrev, onNext } = usePresenter(props)

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" disabled={isPrevDisabled} onClick={onPrev}>
        <ChevronLeftIcon />
        {prevText}
      </Button>
      <span className="min-w-24 text-center text-sm text-muted-foreground">{pageText}</span>
      <Button variant="outline" size="sm" disabled={isNextDisabled} onClick={onNext}>
        {nextText}
        <ChevronRightIcon />
      </Button>
    </div>
  )
}
