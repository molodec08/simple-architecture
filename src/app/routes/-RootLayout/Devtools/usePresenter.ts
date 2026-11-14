import { env } from '@/shared/config'

export const usePresenter = () => ({
  isVisible: env.isDev,
})
