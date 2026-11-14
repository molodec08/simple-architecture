import { useTranslation } from 'react-i18next'

export const usePresenter = () => {
  const { t } = useTranslation()

  return {
    text: t('common.backToList'),
  }
}
