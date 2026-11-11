/**
 * Русская локаль — эталонная: по ней выводятся типы ключей,
 * остальные локали обязаны повторять её структуру.
 */
export const ru = {
  common: {
    appTitle: 'Сериалы',
    backToList: 'К списку',
    retry: 'Повторить',
    errorTitle: 'Что-то пошло не так',
    errorDescription: 'Не удалось загрузить данные. Попробуйте ещё раз.',
    notFoundTitle: 'Страница не найдена',
    notFoundDescription: 'Такой страницы не существует.',
    language: 'Язык',
  },
  show: {
    noImage: 'Нет постера',
    noRating: 'Нет рейтинга',
    status: {
      Running: 'Выходит',
      Ended: 'Завершён',
      'To Be Determined': 'Будущее не определено',
      'In Development': 'В разработке',
    },
  },
  showList: {
    title: 'Все сериалы',
    page: 'Страница {{page}}',
    prev: 'Назад',
    next: 'Вперёд',
    empty: 'На этой странице сериалов нет.',
  },
  showSearch: {
    placeholder: 'Поиск сериалов…',
    resultsTitle: 'Результаты поиска «{{query}}»',
    empty: 'По запросу «{{query}}» ничего не найдено.',
  },
  showDetails: {
    premiered: 'Премьера',
    ended: 'Окончание',
    network: 'Канал',
    language: 'Язык',
    runtime: 'Длительность',
    runtimeValue: '{{count}} мин',
    officialSite: 'Официальный сайт',
    cast: 'В ролях',
    asCharacter: 'в роли {{name}}',
    noSummary: 'Описание отсутствует.',
    notFound: 'Сериал не найден.',
  },
}

/** Структура переводов без привязки к конкретным строкам. */
type DeepStringify<T> = { [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]> }
export type Translations = DeepStringify<typeof ru>
