import { useTranslation } from 'react-i18next'
import { setTheme, useTheme } from '@/shared/lib'

export const usePresenter = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isDark = theme === 'dark'

  return {
    isDark,
    ariaLabel: isDark ? t('common.themeToLight') : t('common.themeToDark'),
    onToggle: () => setTheme(isDark ? 'light' : 'dark'),
  }
}
