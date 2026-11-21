import type { ShowDto, ShowsPageDto } from '@/shared/api'
import type { Show, ShowsPage } from './show'

export const mapShow = (dto: ShowDto): Show => ({
  id: dto.id,
  name: dto.name,
  genres: dto.genres,
  status: dto.status,
  rating: dto.rating,
  premiered: dto.premiered,
  posterUrl: dto.posterUrl,
  summary: dto.summary,
})

export const mapShowsPage = (dto: ShowsPageDto): ShowsPage => ({
  items: dto.items.map(mapShow),
  page: dto.page,
  pageCount: dto.pageCount,
  hasNext: dto.hasNext,
  total: dto.total,
  genres: dto.genres,
  activeGenre: dto.activeGenre ?? undefined,
})
