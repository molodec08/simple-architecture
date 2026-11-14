import type { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchDraft } from './useSearchDraft'

export type SearchInputProps = {
  /** Текущий (уже применённый) поисковый запрос */
  value: string
  /** Вызывается с задержкой после того, как пользователь перестал печатать */
  onChange: (value: string) => void
}

export const usePresenter = ({ value, onChange }: SearchInputProps) => {
  const { t } = useTranslation()
  const [draft, setDraft] = useSearchDraft(value, onChange)

  return {
    draft,
    placeholder: t('showSearch.placeholder'),
    onDraftChange: (event: ChangeEvent<HTMLInputElement>) => setDraft(event.target.value),
  }
}
