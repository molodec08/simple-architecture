import { useTranslation } from 'react-i18next'

export const usePresenter = () => {
  const { t } = useTranslation()

  return {
    description: t('showDetails.notFound'),
  }
}
