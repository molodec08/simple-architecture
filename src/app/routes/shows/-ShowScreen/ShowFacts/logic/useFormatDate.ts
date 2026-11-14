import { useTranslation } from 'react-i18next'

/** Форматирует дату из API («2013-06-24») на языке интерфейса. */
export const useFormatDate = () => {
  const { i18n } = useTranslation()

  return (date: string | null) =>
    date ? new Intl.DateTimeFormat(i18n.resolvedLanguage, { dateStyle: 'long' }).format(new Date(date)) : null
}
