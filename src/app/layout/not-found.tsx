import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/kit/button'

export const NotFound = ({ description }: { description?: string }) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center gap-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">{t('common.notFoundTitle')}</h1>
      <p className="text-muted-foreground">{description ?? t('common.notFoundDescription')}</p>
      <Button asChild variant="outline">
        <Link to="/">{t('common.backToList')}</Link>
      </Button>
    </div>
  )
}
