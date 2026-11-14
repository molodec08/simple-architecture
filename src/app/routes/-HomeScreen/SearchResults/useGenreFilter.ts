import type { Show } from '@/model/show'

export type GenreOption = {
  name: string
  /** Сколько сериалов выдачи относится к жанру */
  count: number
}

const collectGenres = (shows: Show[]): GenreOption[] => {
  const counts = new Map<string, number>()
  for (const genre of shows.flatMap((show) => show.genres)) {
    counts.set(genre, (counts.get(genre) ?? 0) + 1)
  }
  return [...counts]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}

/**
 * Уникальные жанры текущей выдачи и фильтрация по выбранному жанру.
 * Жанр из URL, которого нет в выдаче, игнорируется — показываем всё.
 */
export const useGenreFilter = (shows: Show[], genre: string | undefined) => {
  const genres = collectGenres(shows)
  const activeGenre = genres.some((option) => option.name === genre) ? genre : undefined

  return {
    genres,
    activeGenre,
    filteredShows: activeGenre ? shows.filter((show) => show.genres.includes(activeGenre)) : shows,
  }
}
