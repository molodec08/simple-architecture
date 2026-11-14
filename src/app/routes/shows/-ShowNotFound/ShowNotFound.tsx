import { NotFound } from '@/components/NotFound'
import { usePresenter } from './usePresenter'

export const ShowNotFound = () => {
  const { description } = usePresenter()

  return <NotFound description={description} />
}
