import { SearchIcon } from 'lucide-react'
import { useEffect, useEffectEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDebouncedValue } from '@/shared/lib'
import { Input } from '@/shared/ui/kit/input'

type ShowSearchInputProps = {
  /** Текущий (уже применённый) поисковый запрос */
  value: string
  /** Вызывается с задержкой после того, как пользователь перестал печатать */
  onChange: (value: string) => void
}

export const ShowSearchInput = ({ value, onChange }: ShowSearchInputProps) => {
  const { t } = useTranslation()
  const [draft, setDraft] = useState(value)
  const [prevValue, setPrevValue] = useState(value)
  const debouncedDraft = useDebouncedValue(draft.trim())

  // Значение сменилось снаружи (например, «Назад» в браузере) — синхронизируем поле.
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  if (value !== prevValue) {
    setPrevValue(value)
    if (value !== draft.trim()) setDraft(value)
  }

  const emitChange = useEffectEvent((next: string) => {
    if (next !== value) onChange(next)
  })

  useEffect(() => {
    emitChange(debouncedDraft)
  }, [debouncedDraft])

  return (
    <div className="relative w-full max-w-md">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder={t('showSearch.placeholder')}
        aria-label={t('showSearch.placeholder')}
        className="pl-9"
      />
    </div>
  )
}
