import { useTranslation } from 'react-i18next'

export type ErrorStateProps = {
  onRetry?: () => void
}

export const usePresenter = ({ onRetry }: ErrorStateProps) => {
  const { t } = useTranslation()

  return {
    title: t('common.errorTitle'),
    description: t('common.errorDescription'),
    retryText: t('common.retry'),
    hasRetry: Boolean(onRetry),
    onRetry,
  }
}
