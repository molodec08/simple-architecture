import { i18n, supportedLanguages, type Language } from '@/shared/i18n'

const isLanguage = (value: string): value is Language => supportedLanguages.some((language) => language === value)

/**
 * Таска «сменить язык интерфейса». Работает с экземпляром i18n напрямую,
 * без React-обёрток: язык меняется в любом месте приложения, а выбор сохраняет
 * детектор языка (localStorage).
 */
export const changeLanguage = async (language: string) => {
  if (!isLanguage(language)) return
  await i18n.changeLanguage(language)
}
