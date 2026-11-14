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
    themeToDark: 'Включить тёмную тему',
    themeToLight: 'Включить светлую тему',
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
  home: {
    heroTitle: 'Найдите свой',
    heroAccent: 'следующий сериал',
    heroSubtitle: 'Тысячи шоу из каталога TVmaze: ищите по названию и фильтруйте по жанрам.',
  },
  showList: {
    title: 'Все сериалы',
    empty: 'На этой странице сериалов нет.',
  },
  pagination: {
    page: 'Страница {{page}}',
    pageOf: 'Страница {{page}} из {{total}}',
    prev: 'Назад',
    next: 'Вперёд',
  },
  showSearch: {
    placeholder: 'Поиск сериалов…',
    resultsTitle: 'Результаты поиска «{{query}}»',
    empty: 'По запросу «{{query}}» ничего не найдено.',
    found: 'Найдено: {{total}}',
    genresLabel: 'Фильтр по жанрам',
    allGenres: 'Все жанры',
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
