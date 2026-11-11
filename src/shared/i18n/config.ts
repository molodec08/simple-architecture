import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { en } from './locales/en'
import { ru } from './locales/ru'

export const resources = {
  ru: { translation: ru },
  en: { translation: en },
} as const

export const supportedLanguages = ['ru', 'en'] as const
export type Language = (typeof supportedLanguages)[number]

export const defaultLanguage: Language = 'ru'

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: defaultLanguage,
    supportedLngs: supportedLanguages,
    interpolation: {
      // React сам экранирует значения
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

const syncHtmlLang = (lng: string) => {
  document.documentElement.lang = lng
}
syncHtmlLang(i18n.resolvedLanguage ?? defaultLanguage)
i18n.on('languageChanged', syncHtmlLang)

export { i18n }
