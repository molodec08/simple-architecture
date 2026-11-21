import { useState } from 'react'
import { useDebouncedCallback } from '@/shared/lib'

/**
 * Черновик поискового запроса: пользователь печатает в поле, а наружу значение
 * уходит с задержкой (debounce).
 *
 * - Очистка поля применяется сразу: запроса нет, ждать нечего.
 * - Наружу уходит только реально новый запрос. Если за время задержки текст
 *   вернулся к применённому (`forest` → `fores` → `forest`), ничего не происходит:
 *   нет лишнего запроса, не сбрасываются страница и жанр.
 */
export const useSearchDraft = (value: string, onChange: (value: string) => void) => {
  const [draft, setDraft] = useState(value)
  const [prevValue, setPrevValue] = useState(value)
  const emitChange = useDebouncedCallback((query: string) => {
    // Колбэк видит свежие draft и value. Если поле успели поменять снаружи
    // (например, «Назад» в браузере), устаревший ввод не перетирает его.
    if (query === draft.trim() && query !== value) onChange(query)
  })

  // Значение сменилось снаружи (например, «Назад» в браузере) — синхронизируем поле.
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  if (value !== prevValue) {
    setPrevValue(value)
    if (value !== draft.trim()) setDraft(value)
  }

  const changeDraft = (next: string) => {
    setDraft(next)
    const query = next.trim()

    if (query === '') {
      emitChange.cancel()
      if (value !== '') onChange('')
      return
    }

    emitChange.run(query)
  }

  return [draft, changeDraft] as const
}
