import type { CSSProperties } from 'react'
import { hashHue } from '@/shared/lib'

export type GenreBadgeProps = {
  genre: string
}

/** Каждый жанр получает свой постоянный цвет — через CSS-переменную `--hue`. */
export const usePresenter = ({ genre }: GenreBadgeProps) => ({
  label: genre,
  style: { '--hue': hashHue(genre) } as CSSProperties,
})
