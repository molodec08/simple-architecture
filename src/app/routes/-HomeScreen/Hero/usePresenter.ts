import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib'

export type HeroProps = {
  /** Свернуть заголовок, оставив только поле поиска (когда есть результаты поиска) */
  isCompact: boolean
  children: ReactNode
}

export const usePresenter = ({ isCompact, children }: HeroProps) => {
  const { t } = useTranslation()

  return {
    title: t('home.heroTitle'),
    accent: t('home.heroAccent'),
    subtitle: t('home.heroSubtitle'),
    children,
    isCompact,
    sectionClassName: cn(
      'mx-auto flex w-full max-w-2xl flex-col items-center text-center transition-[padding] duration-500',
      isCompact ? 'py-0' : 'py-6 sm:py-10',
    ),
    // Плавное сворачивание: grid-rows 1fr → 0fr анимирует высоту «auto»
    headingClassName: cn(
      'grid w-full transition-all duration-500 ease-out',
      isCompact ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100',
    ),
  }
}
