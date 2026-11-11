import type { TvmazeShowDto, TvmazeShowWithCastDto } from '@/shared/api'
import { htmlToText } from '@/shared/lib'
import type { Show, ShowDetails } from './types'

export const mapShow = (dto: TvmazeShowDto): Show => ({
  id: dto.id,
  name: dto.name,
  genres: dto.genres,
  status: dto.status,
  rating: dto.rating.average,
  premiered: dto.premiered,
  posterUrl: dto.image?.medium ?? null,
  summary: htmlToText(dto.summary),
})

export const mapShowDetails = (dto: TvmazeShowWithCastDto): ShowDetails => ({
  ...mapShow(dto),
  ended: dto.ended,
  language: dto.language,
  network: dto.network?.name ?? dto.webChannel?.name ?? null,
  runtime: dto.runtime ?? dto.averageRuntime,
  officialSite: dto.officialSite,
  posterUrlLarge: dto.image?.original ?? null,
  cast: (dto._embedded?.cast ?? []).map(({ person, character }) => ({
    personId: person.id,
    personName: person.name,
    characterName: character.name,
    photoUrl: character.image?.medium ?? person.image?.medium ?? null,
  })),
})
