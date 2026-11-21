/**
 * Доменная модель сериала. В отличие от DTO, она:
 *  - содержит только нужные приложению поля;
 *  - не содержит HTML (summary уже очищен);
 *  - не зависит от формы ответа TVmaze.
 */

export const knownShowStatuses = ['Running', 'Ended', 'To Be Determined', 'In Development'] as const
export type KnownShowStatus = (typeof knownShowStatuses)[number]

export type Show = {
  id: number
  name: string
  genres: string[]
  /** Статус из API; известные значения переводятся, остальные показываются как есть */
  status: string
  rating: number | null
  premiered: string | null
  posterUrl: string | null
  summary: string
}

/** Жанр выдачи и сколько сериалов к нему относится */
export type GenreOption = {
  name: string
  count: number
}

/** Страница выдачи (каталог или поиск). Пагинацию и фильтр по жанру делает backend. */
export type ShowsPage = {
  items: Show[]
  /** Текущая страница, начиная с 1 (backend прижимает её к краю выдачи) */
  page: number
  /** Всего страниц; `null` — неизвестно (каталог) */
  pageCount: number | null
  hasNext: boolean
  /** Сколько сериалов подходит под фильтр */
  total: number
  /** Жанры всей выдачи — варианты для фильтра */
  genres: GenreOption[]
  /** Применённый жанр; жанр, которого нет в выдаче, backend игнорирует */
  activeGenre: string | undefined
}
