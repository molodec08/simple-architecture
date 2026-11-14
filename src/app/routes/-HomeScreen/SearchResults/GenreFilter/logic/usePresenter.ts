import type { CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { hashHue } from '@/shared/lib'
import type { GenreOption } from '../../logic/useGenreFilter'

export type GenreFilterProps = {
  genres: GenreOption[]
  activeGenre: string | undefined
  /** `undefined` — сбросить фильтр */
  onChange: (genre: string | undefined) => void
}

export const usePresenter = ({ genres, activeGenre, onChange }: GenreFilterProps) => {
  const { t } = useTranslation()

  return {
    label: t('showSearch.genresLabel'),
    allText: t('showSearch.allGenres'),
    isAllSelected: activeGenre === undefined,
    onReset: () => onChange(undefined),
    items: genres.map(({ name, count }) => ({
      name,
      count,
      // Тот же цвет, что у бейджа жанра в карточке (GenreBadge)
      dotStyle: { backgroundColor: `oklch(0.65 0.17 ${hashHue(name)})` } satisfies CSSProperties,
      isSelected: name === activeGenre,
      // Повторный клик по выбранному жанру тоже сбрасывает фильтр
      onClick: () => onChange(name === activeGenre ? undefined : name),
    })),
  }
}
