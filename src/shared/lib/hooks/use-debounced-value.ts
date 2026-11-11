import { useEffect, useState } from 'react'

/** Возвращает значение, которое обновляется не чаще, чем раз в `delay` мс. */
export const useDebouncedValue = <T>(value: T, delay = 400): T => {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
