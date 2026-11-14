import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

export const usePresenter = () => {
  const router = useRouter()
  const { reset } = useQueryErrorResetBoundary()

  // Сбрасываем ошибку запроса, чтобы повторная загрузка не упала сразу же
  useEffect(() => {
    reset()
  }, [reset])

  return {
    onRetry: () => void router.invalidate(),
  }
}
