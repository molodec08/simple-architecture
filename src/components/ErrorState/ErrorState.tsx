import { AlertCircleIcon } from 'lucide-react'
import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/shared/ui/kit/alert'
import { Button } from '@/shared/ui/kit/button'
import { type ErrorStateProps, usePresenter } from './logic/usePresenter'

export const ErrorState = (props: ErrorStateProps) => {
  const { title, description, retryText, hasRetry, onRetry } = usePresenter(props)

  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
      {hasRetry && (
        <AlertAction>
          <Button variant="outline" size="sm" onClick={onRetry}>
            {retryText}
          </Button>
        </AlertAction>
      )}
    </Alert>
  )
}
