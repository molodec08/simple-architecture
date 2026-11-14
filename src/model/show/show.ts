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
