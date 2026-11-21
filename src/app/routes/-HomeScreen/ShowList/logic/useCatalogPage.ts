import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query'
import { loadCatalogPage } from './tasks/load-catalog-page'

const catalogPageQuery = (page: number, genre: string | undefined) =>
  queryOptions({
    queryKey: ['shows', 'list', page, genre ?? null],
    queryFn: ({ signal }) => loadCatalogPage(page, genre, signal),
    // Индекс TVmaze меняется редко, backend и так кеширует его на 5 минут
    staleTime: 10 * 60 * 1000,
  })

/**
 * Страница каталога.
 * @param page — номер страницы, начиная с 1
 */
export const useCatalogPage = (page: number, genre: string | undefined) =>
  useQuery({
    ...catalogPageQuery(page, genre),
    // Пока грузится следующая страница, показываем предыдущую
    placeholderData: keepPreviousData,
  })
