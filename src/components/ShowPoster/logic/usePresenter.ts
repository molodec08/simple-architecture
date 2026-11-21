import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib'

export type ShowPosterProps = {
  src: string | null
  alt: string
  className?: string
}

export const usePresenter = ({ src, alt, className }: ShowPosterProps) => {
  const { t } = useTranslation()

  return {
    src: src ?? undefined,
    alt,
    hasImage: Boolean(src),
    noImageText: t('show.noImage'),
    imageClassName: cn('aspect-[2/3] w-full bg-muted object-cover', className),
    placeholderClassName: cn(
      'flex aspect-[2/3] flex-col items-center justify-center gap-2 bg-muted text-sm text-muted-foreground',
      className,
    ),
  }
}
