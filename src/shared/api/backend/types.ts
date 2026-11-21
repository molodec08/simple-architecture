/**
 * DTO — типы ровно в том виде, в каком их отдаёт наш backend
 * (репозиторий simple-architecture-backend). Описание эндпоинтов — в docs/TECH_STACK.md.
 */

export type ShowDto = {
  id: number
  name: string
  genres: string[]
  status: string
  rating: number | null
  /** Дата `YYYY-MM-DD` */
  premiered: string | null
  posterUrl: string | null
  /** Уже без HTML */
  summary: string
}

export type GenreOptionDto = {
  name: string
  count: number
}

export type ShowsPageDto = {
  items: ShowDto[]
  /** Текущая страница, начиная с 1 */
  page: number
  /** `null` — количество страниц неизвестно (каталог) */
  pageCount: number | null
  hasNext: boolean
  total: number
  genres: GenreOptionDto[]
  activeGenre: string | null
}

export type CastMemberDto = {
  personId: number
  personName: string
  characterName: string
  photoUrl: string | null
}

export type ShowDetailsDto = ShowDto & {
  ended: string | null
  language: string | null
  network: string | null
  runtime: number | null
  officialSite: string | null
  posterUrlLarge: string | null
  cast: CastMemberDto[]
}

export type ToggleFavoriteDto = {
  /** Состояние после переключения */
  isFavorite: boolean
  show: ShowDto
}
