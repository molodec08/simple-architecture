import { AlertCircleIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Alert, AlertAction, AlertDescription, AlertTitle } from './kit/alert'
import { Button } from './kit/button'

type ErrorStateProps = {
  title?: string
  description?: string
  onRetry?: () => void
}

export const ErrorState = ({ title, description, onRetry }: ErrorStateProps) => {
  const { t } = useTranslation()

  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>{title ?? t('common.errorTitle')}</AlertTitle>
      <AlertDescription>{description ?? t('common.errorDescription')}</AlertDescription>
      {onRetry && (
        <AlertAction>
          <Button variant="outline" size="sm" onClick={onRetry}>
            {t('common.retry')}
          </Button>
        </AlertAction>
      )}
    </Alert>
  )
}
