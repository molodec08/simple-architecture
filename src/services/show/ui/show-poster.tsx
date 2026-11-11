import { ImageOffIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib'

type ShowPosterProps = {
  src: string | null
  alt: string
  className?: string
}

export const ShowPoster = ({ src, alt, className }: ShowPosterProps) => {
  const { t } = useTranslation()

  if (!src) {
    return (
      <div
        className={cn(
          'flex aspect-[2/3] flex-col items-center justify-center gap-2 bg-muted text-sm text-muted-foreground',
          className,
        )}
      >
        <ImageOffIcon className="size-8" />
        {t('show.noImage')}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={cn('aspect-[2/3] w-full bg-muted object-cover', className)}
    />
  )
}
