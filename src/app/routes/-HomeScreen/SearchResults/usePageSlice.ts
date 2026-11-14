/**
 * Клиентская пагинация: API поиска отдаёт все результаты сразу,
 * страницы нарезаем сами. Страница за пределами списка прижимается к краю.
 * @param page — номер страницы для пользователя, начиная с 1
 */
export const usePageSlice = <T>(items: T[], page: number, pageSize: number) => {
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize))
  const currentPage = Math.min(Math.max(1, page), pageCount)
  const start = (currentPage - 1) * pageSize

  return {
    pageItems: items.slice(start, start + pageSize),
    currentPage,
    pageCount,
  }
}
