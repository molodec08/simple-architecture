import type { Show } from '@/model/show'

export type ShowCardProps = {
  show: Show
}

/** В компактной карточке каталога хватает места на два жанра. */
const MAX_GENRES = 2

export const usePresenter = ({ show }: ShowCardProps) => ({
  show,
  linkParams: { showId: show.id },
  genres: show.genres.slice(0, MAX_GENRES),
  hasGenres: show.genres.length > 0,
})
