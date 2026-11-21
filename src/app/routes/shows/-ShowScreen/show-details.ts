import { mapShow, type Show } from '@/model/show'
import type { ShowDetailsDto } from '@/shared/api'

export type CastMember = {
  personId: number
  personName: string
  characterName: string
  photoUrl: string | null
}

export type ShowDetails = Show & {
  ended: string | null
  language: string | null
  network: string | null
  runtime: number | null
  officialSite: string | null
  posterUrlLarge: string | null
  cast: CastMember[]
}

export const mapShowDetails = (dto: ShowDetailsDto): ShowDetails => ({
  ...mapShow(dto),
  ended: dto.ended,
  language: dto.language,
  network: dto.network,
  runtime: dto.runtime,
  officialSite: dto.officialSite,
  posterUrlLarge: dto.posterUrlLarge,
  cast: dto.cast.map((member) => ({ ...member })),
})
