import { useEffect, useRef } from 'react'

/**
 * Откладывает вызов функции: `run` перезапускает таймер, вызов случится через `delay` мс
 * после последнего `run`. `cancel` отменяет отложенный вызов.
 * Вызывается всегда свежая версия `callback` — с актуальными props на момент срабатывания.
 */
export const useDebouncedCallback = <Args extends unknown[]>(callback: (...args: Args) => void, delay = 400) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  })

  // Компонент размонтирован — отложенный вызов больше не нужен
  useEffect(() => () => clearTimeout(timerRef.current), [])

  return {
    run: (...args: Args) => {
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => callbackRef.current(...args), delay)
    },
    cancel: () => clearTimeout(timerRef.current),
  }
}
