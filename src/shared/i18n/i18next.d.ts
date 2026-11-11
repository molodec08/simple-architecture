import 'i18next'
import type { resources } from './config'

// Типизация ключей: t('showList.title') проверяется компилятором.
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: (typeof resources)['ru']
  }
}
