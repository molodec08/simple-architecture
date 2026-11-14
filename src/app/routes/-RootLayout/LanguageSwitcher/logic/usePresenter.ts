import { useTranslation } from 'react-i18next'
import { supportedLanguages, type Language } from '@/shared/i18n'
import { changeLanguage } from './tasks/change-language'

const languageNames: Record<Language, string> = {
  ru: 'Русский',
  en: 'English',
}

export const usePresenter = () => {
  const { t, i18n } = useTranslation()

  return {
    value: i18n.resolvedLanguage,
    ariaLabel: t('common.language'),
    options: supportedLanguages.map((language) => ({ value: language, label: languageNames[language] })),
    onValueChange: (language: string) => void changeLanguage(language),
  }
}
