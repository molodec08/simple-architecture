# Технологический стек и how-to

| Технология                         | Версия | Зачем                                       |
| ---------------------------------- | ------ | ------------------------------------------- |
| React + React Compiler             | 19.3   | UI; мемоизацию делает компилятор            |
| TypeScript                         | 7.0    | Типизация                                   |
| Vite                               | 8      | Сборка и dev-сервер                         |
| TanStack Router                    | 1.x    | Типобезопасный file-based роутинг           |
| TanStack Query                     | 5.x    | Серверное состояние, кэш, загрузка данных   |
| Tailwind CSS                       | 4      | Стили                                       |
| shadcn/ui (стиль `radix-nova`)     | CLI 4  | Готовые компоненты поверх Radix UI          |
| i18next + react-i18next            | 27/18  | Локализация (ru, en)                        |
| oxlint                             | 1.x    | Линтер, в том числе импорт через public api |

Версии указаны на момент создания проекта, точные значения смотрите в
`package.json`.

---

## TanStack Router

**Конфигурация:** плагин в `vite.config.ts`:

```ts
tanstackRouter({
  target: 'react',
  autoCodeSplitting: true,               // каждый маршрут становится отдельным чанком
  routesDirectory: './src/app/routes',   // маршруты лежат в слое app
  generatedRouteTree: './src/app/routeTree.gen.ts',
})
```

Плагин следит за `src/app/routes` и пересобирает `routeTree.gen.ts`, когда
запущены `npm run dev` или `npm run build`. **Этот файл не редактируют
вручную.** Он закоммичен, чтобы `tsc` работал сразу после клонирования.

**Именование файлов:**

| Файл                         | URL               |
| ---------------------------- | ----------------- |
| `routes/__root.tsx`          | корневой layout   |
| `routes/index.tsx`           | `/`               |
| `routes/shows/$showId.tsx`   | `/shows/:showId`  |

**Новый маршрут:** создайте файл, например `routes/about.tsx`, при запущенном
`npm run dev`. Плагин сам добавит заготовку `createFileRoute('/about')`.

**Контекст роутера:** в `__root.tsx` через `createRootRouteWithContext`
объявлен `{ queryClient }`. Он доступен в каждом `loader`:

```ts
loader: ({ context: { queryClient }, params }) =>
  queryClient.ensureQueryData(showDetailsQuery(params.showId)),
```

**Компоненты внутри `routes`:** папки с префиксом `-` (`-HomeScreen/`,
`shows/-ShowScreen/`) плагин игнорирует (`routeFileIgnorePrefix`, по умолчанию
`-`), вложенные в них папки — тоже. Экран читает URL через `getRouteApi`:

```ts
const routeApi = getRouteApi('/')
const { page = 1, q = '' } = routeApi.useSearch()
```

**Типизированные параметры:** `params.parse` в `shows/$showId.tsx`
превращает строку из URL в `number`. Поэтому `<Link params={{ showId: 1 }}>`
принимает число, а невалидный id сразу ведёт на 404.

**Search params:** `validateSearch` в `routes/index.tsx` превращает
«грязные» параметры URL в типизированный объект `{ page?: number; q?: string }`.

**Devtools:** в dev-режиме в правом нижнем углу.

---

## TanStack Query

**Клиент:** `src/app/query-client.ts`. Глобальные настройки:

- `staleTime: 60s`: данные считаются свежими минуту;
- `refetchOnWindowFocus: false`;
- `retry`: ошибки 4xx не повторяются, кроме 429 (лимит TVmaze); остальные
  повторяются до 2 раз.

**Query options рядом с presenter'ом:** запрос описывается через
`queryOptions` в соседнем с presenter'ом файле, и там же лежит хук, который его
вызывает (`-HomeScreen/ShowList/useShowsPage.ts`):

```ts
const showsPageQuery = (apiPage: number) =>
  queryOptions({ queryKey: ['shows', 'list', apiPage], queryFn: ... })

export const useShowsPage = (page: number) => useQuery(showsPageQuery(page - 1))
```

Если запрос нужен ещё и лоадеру, `queryOptions` экспортируется из `index.ts`
экрана (`showDetailsQuery` из `shows/-ShowScreen`). Так ключ и функция запроса
всегда совпадают, и TypeScript выводит тип `data`. Все ключи начинаются с
`'shows'`, поэтому `invalidateQueries({ queryKey: ['shows'] })` сбросит всё.

**`signal`:** в `queryFn` передаётся `AbortSignal`. Если запрос стал не нужен
(например, пользователь ввёл следующий символ в поиске), `fetch` отменяется.

**Devtools:** в dev-режиме в левом нижнем углу.

**Исключение — поиск (`-HomeScreen/SearchResults/useSearchShows.ts`)** сделан без
TanStack Query, на хуке `useRequest` из `@/shared/lib`:

- debounce ввода (400 мс) — в `SearchInput/useSearchDraft.ts`, запрос уходит
  только после паузы в наборе. Очистка поля применяется сразу, без задержки.
  Если за время задержки текст вернулся к уже применённому запросу
  (`forest` → `fores` → `forest`), ничего не происходит: нет запроса, страница
  и жанр не сбрасываются;
- смена запроса отменяет предыдущий `fetch` через `AbortController`; ответ
  принимается, только если относится к текущему ключу (нет race condition);
- `isLoading` / `isError` / `retry()` — состояния загрузки и ошибки;
- кэша нет: повторный заход на тот же запрос снова идёт в сеть.

Пагинация (по 3) и фильтр по жанрам в выдаче — клиентские: API поиска отдаёт
все результаты сразу. Страница и жанр лежат в URL (`?q=…&genre=…&page=…`).

---

## shadcn/ui

Компоненты **копируются в проект**, а не ставятся как зависимость. Это
обычный код, его можно менять.

Настройки CLI лежат в `components.json`. Алиасы перенастроены под слой `shared`:

```json
"aliases": {
  "components": "@/shared/ui",
  "ui": "@/shared/ui/kit",
  "utils": "@/shared/lib/css",
  "lib": "@/shared/lib",
  "hooks": "@/shared/lib/hooks"
}
```

**Добавить компонент:**

```bash
npx shadcn@latest add dialog
# → src/shared/ui/kit/dialog.tsx
```

**Использовать:**

```tsx
import { Button } from '@/shared/ui/kit/button'
```

**Тема:** CSS-переменные (`--background`, `--primary`, ...) в
`src/app/styles/index.css`. Тёмная тема включается классом `.dark` на `<html>`.
Переключателя темы пока нет, это хорошее упражнение.

**Утилита `cn`:** объединяет классы Tailwind и разрешает конфликты между ними:
`cn('px-2', isActive && 'px-4')`.

---

## i18n

**Файлы:**

```
src/shared/i18n/
├── config.ts          # инициализация i18next + детектор языка
├── i18next.d.ts       # типизация ключей
├── locales/ru.ts      # эталонная локаль
└── locales/en.ts      # обязана совпадать по структуре с ru (тип Translations)
```

**Определение языка:** сначала `localStorage` (выбор пользователя), потом язык
браузера, по умолчанию `ru`. Выбранный язык сохраняется в `localStorage`
и синхронизируется с `<html lang>`.

**Использование:**

```tsx
const { t, i18n } = useTranslation()   // только в хуках (usePresenter), не во View
t('showList.page', { page: 2 })   // "Страница 2"
i18n.changeLanguage('en')
```

**Типобезопасность:** ключи проверяются компилятором. `t('showList.titel')`
вызовет ошибку TypeScript. Если добавить ключ в `ru.ts` и забыть про `en.ts`,
TypeScript тоже сообщит об ошибке.

**Новый язык:**

1. `locales/de.ts`: `export const de: Translations = { ... }`;
2. добавить его в `resources` и `supportedLanguages` в `config.ts`;
3. добавить название в `languageNames` (`app/routes/-RootLayout/LanguageSwitcher/usePresenter.ts`).

**Почему словари в `.ts`, а не в `.json`:** так проще получить проверку
структуры через тип `Translations`. Для учебного проекта этого достаточно. В
большом проекте словари обычно грузят лениво по неймспейсам.

> Данные из TVmaze (названия, описания, жанры) приходят только на английском и
> не переводятся. Переводятся только статусы сериалов (`show.status.*`).

---

## TVmaze API

- Базовый URL: `https://api.tvmaze.com` (можно переопределить через
  `VITE_TVMAZE_API_URL`, см. `.env.example`).
- Ключ не нужен, CORS разрешён.
- Лимит: не меньше 20 запросов за 10 секунд с одного IP. При превышении
  приходит `429`.

Используемые эндпоинты:

| Метод `tvmazeApi`   | Запрос                      | Примечание                                            |
| ------------------- | --------------------------- | ----------------------------------------------------- |
| `getShows(page)`    | `GET /shows?page=N`         | До 250 сериалов на страницу, `page` с 0. За концом списка приходит 404, мы превращаем его в `[]` |
| `searchShows(q)`    | `GET /search/shows?q=...`   | Ответ: `[{ score, show }]`, нечёткий поиск            |
| `getShow(id)`       | `GET /shows/:id?embed=cast` | Сериал + актёрский состав в `_embedded.cast`          |

Документация: https://www.tvmaze.com/api
