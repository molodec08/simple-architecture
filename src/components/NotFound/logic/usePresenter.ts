import { useTranslation } from 'react-i18next'

export type NotFoundProps = {
  description?: string
}

export const usePresenter = ({ description }: NotFoundProps) => {
  const { t } = useTranslation()

  return {
    title: t('common.notFoundTitle'),
    description: description ?? t('common.notFoundDescription'),
    backText: t('common.backToList'),
  }
}
