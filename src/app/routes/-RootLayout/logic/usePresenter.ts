import { useTranslation } from 'react-i18next'
import { useTheme } from '@/shared/lib'

export const usePresenter = () => {
  const { t } = useTranslation()

  return {
    appTitle: t('common.appTitle'),
    // Toaster из ui-kit не читает тему сам — передаём её пропсом
    toasterTheme: useTheme(),
  }
}
