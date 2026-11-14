import { useEffect, useEffectEvent, useState } from 'react'

type Settled<T> = { requestId: string } & ({ status: 'success'; data: T } | { status: 'error'; error: unknown })

export type RequestResult<T> = {
  data: T | undefined
  isLoading: boolean
  isError: boolean
  /** Повторить запрос с тем же ключом (например, после ошибки) */
  retry: () => void
}

/**
 * Загрузка данных без сторонних библиотек.
 *
 * - `key === null` — запрос не нужен (например, пустая строка поиска);
 * - смена `key` отменяет предыдущий запрос через AbortController, а ответ
 *   принимается, только если он относится к текущему ключу, — так устаревший
 *   ответ никогда не перетрёт свежий (race condition);
 * - состояние загрузки не хранится, а выводится: «ключ есть, а ответа на него ещё нет».
 */
export const useRequest = <T>(key: string | null, fetcher: (signal: AbortSignal) => Promise<T>): RequestResult<T> => {
  const [attempt, setAttempt] = useState(0)
  const [settled, setSettled] = useState<Settled<T> | null>(null)
  const requestId = key === null ? null : `${attempt}:${key}`
  // Свежая версия fetcher без перезапуска эффекта на каждый рендер
  const runFetcher = useEffectEvent(fetcher)

  useEffect(() => {
    if (requestId === null) return
    const controller = new AbortController()

    runFetcher(controller.signal).then(
      (data) => {
        if (!controller.signal.aborted) setSettled({ requestId, status: 'success', data })
      },
      (error: unknown) => {
        if (!controller.signal.aborted) setSettled({ requestId, status: 'error', error })
      },
    )

    return () => controller.abort()
  }, [requestId])

  const current = settled?.requestId === requestId ? settled : null

  return {
    data: current?.status === 'success' ? current.data : undefined,
    isLoading: requestId !== null && current === null,
    isError: current?.status === 'error',
    retry: () => setAttempt((value) => value + 1),
  }
}
