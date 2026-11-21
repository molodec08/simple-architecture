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
| sonner (shadcn `sonner`)           | 2.x    | Toast-уведомления                           |
| NestJS (отдельный репозиторий)     | 12     | Backend: TVmaze, кеш, жанры, избранное      |

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
`queryOptions` в папке `logic/` рядом с presenter'ом, и там же лежит хук, который его
вызывает (`-HomeScreen/ShowList/logic/useCatalogPage.ts`). Сама загрузка — таска
(`logic/tasks/load-catalog-page.ts`): обычная функция без React, Query только
кэширует её результат:

```ts
const catalogPageQuery = (page: number, genre: string | undefined) =>
  queryOptions({
    queryKey: ['shows', 'list', page, genre ?? null],
    queryFn: ({ signal }) => loadCatalogPage(page, genre, signal),
  })
```

Избранное целиком живёт в `components/FavoriteToggle` (запрос, мутация, таски);
`useFavorites` экспортируется из его `index.ts` для шапки и страницы `/favorites`. Мутация после ответа сбрасывает ключ
`['favorites']`, и кнопка в шапке, звёздочки и страница избранного обновляются разом.

Если запрос нужен ещё и лоадеру, `queryOptions` экспортируется из `index.ts`
экрана (`showDetailsQuery` из `shows/-ShowScreen`). Так ключ и функция запроса
всегда совпадают, и TypeScript выводит тип `data`. Все ключи начинаются с
`'shows'`, поэтому `invalidateQueries({ queryKey: ['shows'] })` сбросит все сериалы.

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
- клиентского кэша нет: повторный заход снова идёт в сеть (backend отдаст из своего кеша).

Пагинация (по 3) и фильтр по жанрам — на backend: ключ запроса — `[q, page, genre]`.
Страница и жанр лежат в URL (`?q=…&genre=…&page=…`).

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
3. добавить название в `languageNames` (`app/routes/-RootLayout/LanguageSwitcher/logic/usePresenter.ts`).

**Почему словари в `.ts`, а не в `.json`:** так проще получить проверку
структуры через тип `Translations`. Для учебного проекта этого достаточно. В
большом проекте словари обычно грузят лениво по неймспейсам.

> Данные из TVmaze (названия, описания, жанры) приходят только на английском и
> не переводятся. Переводятся только статусы сериалов (`show.status.*`).

---

## Наш backend

Отдельный репозиторий `../simple-architecture-backend` (NestJS 12). Запуск:
`npm run start:dev` (порт 3000). В dev Vite проксирует `/api` на него
(`server.proxy` в `vite.config.ts`, цель — `API_PROXY_TARGET`), поэтому CORS не нужен.
Базовый URL клиента — `VITE_API_URL` (по умолчанию `/api`), см. `.env.example`.

| Метод (`shared/api`)                 | Запрос                                    | Ответ                                    |
| ------------------------------------ | ----------------------------------------- | ---------------------------------------- |
| `showsApi.getCatalog(page, genre)`   | `GET /api/shows?page=N&genre=G`           | `ShowsPageDto`, `pageCount: null`        |
| `showsApi.search(q, page, genre)`    | `GET /api/shows/search?q=…&page=N&genre=G` | `ShowsPageDto`, по 3 на страницу        |
| `showsApi.getShow(id)`               | `GET /api/shows/:id`                      | `ShowDetailsDto` (с актёрами), 404       |
| `favoritesApi.getAll()`              | `GET /api/favorites`                      | `ShowDto[]`, новые первыми               |
| `favoritesApi.toggle(id)`            | `POST /api/favorites/:id/toggle`          | `{ isFavorite, show }`                   |

`page` везде начинается с 1. Страница каталога — страница индекса TVmaze (до 250
сериалов), жанр фильтруется внутри неё: у TVmaze нет фильтра по жанру, а страницы
индекса — диапазоны id с пропусками, так что «ровные» страницы по N штук без загрузки
всех предыдущих не посчитать. Ответы TVmaze backend кеширует на 5 минут.

Ошибки: 400 — кривые параметры, 404 — сериала нет, 429 — лимит TVmaze,
502 — TVmaze недоступен. Документация TVmaze: https://www.tvmaze.com/api
