import { useTranslation } from 'react-i18next'
import { useTheme } from '@/shared/lib'
import { toggleTheme } from './tasks/toggle-theme'

export const usePresenter = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isDark = theme === 'dark'

  return {
    isDark,
    ariaLabel: isDark ? t('common.themeToLight') : t('common.themeToDark'),
    onToggle: toggleTheme,
  }
}
