import { LanguagesIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { supportedLanguages, type Language } from '@/shared/i18n'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/kit/select'

const languageNames: Record<Language, string> = {
  ru: 'Русский',
  en: 'English',
}

/** Фича «Смена языка интерфейса». */
export const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation()

  return (
    <Select value={i18n.resolvedLanguage} onValueChange={(language) => void i18n.changeLanguage(language)}>
      <SelectTrigger size="sm" aria-label={t('common.language')}>
        <LanguagesIcon />
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {supportedLanguages.map((language) => (
          <SelectItem key={language} value={language}>
            {languageNames[language]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
