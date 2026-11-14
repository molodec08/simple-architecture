import { ErrorState } from '@/components/ErrorState'
import { BackLink } from '../-components/BackLink'
import { usePresenter } from './logic/usePresenter'

export const ShowError = () => {
  const { onRetry } = usePresenter()

  return (
    <div className="flex flex-col gap-6">
      <BackLink />
      <ErrorState onRetry={onRetry} />
    </div>
  )
}
