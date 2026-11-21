# CLAUDE.md

Учебный проект: каталог сериалов на [TVmaze API](https://www.tvmaze.com/api),
написанный по простой модульной архитектуре (Simple Architecture).
Главная ценность проекта — **соблюдение архитектуры**, а не количество фич.

Это **frontend**. Backend (NestJS) — отдельный репозиторий в соседней папке
`../simple-architecture-backend`: он ходит в TVmaze, кеширует ответы, делает
пагинацию, фильтр по жанрам и хранит избранное. Frontend в TVmaze **не ходит**.

Подробности (читай при работе над соответствующей частью):
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — правила архитектуры (View/Presenter, дерево папок, 120 строк,
  разделение frontend/backend);
- [docs/TECH_STACK.md](docs/TECH_STACK.md) — Router, Query, shadcn/ui, i18n, эндпоинты нашего backend.

## Команды

```bash
npm run dev      # dev-сервер; /api проксируется на backend (localhost:3000)
npm run build    # tsc -b + vite build — основная проверка «всё ли собирается»
npm run lint     # oxlint, в том числе импорт только через public api
```

Backend запускается отдельно: `cd ../simple-architecture-backend && npm run start:dev`.
Тестов во frontend пока нет. После изменений запускай `npm run lint && npm run build`.

## Структура (правила — в docs/ARCHITECTURE.md, они обязательны)

Каждый компонент — папка `X/` с `X.tsx` (View, только JSX), `index.ts` (public api)
и `logic/`: `usePresenter.ts` (тексты, данные, обработчики), прочие хуки компонента
и `tasks/` — бизнес-логика в виде обычных функций без React. Дерево папок повторяет
дерево компонентов на экране. Любой файл — не больше 120 строк.

```
src/
├── app/            провайдеры, роутер, стили
│   └── routes/     файлы маршрутов (только конфиг) + дерево экранов в папках `-X/`
│                   (-RootLayout, -HomeScreen, -FavoritesScreen, shows/-ShowScreen …)
├── components/     глобальные переиспользуемые компоненты (≥ 2 веток дерева)
├── model/<name>/   доменная модель, нужная нескольким веткам (типы + мапперы)
├── tasks/          глобальные таски, нужные нескольким компонентам (пока нет)
└── shared/         инфраструктура без бизнес-смысла: api, config, i18n, lib, ui/kit
```

- Компонент одной ветки — в папке родителя; общий для ветки — в её `components/`.
- Глобальные модули — через алиас `@/`, внутри дерева — относительные пути.
- Линтер (`no-restricted-imports`) запрещает импорт в обход `index.ts`.

## Соглашения

- **Бизнес-логика — на backend.** Пагинация, фильтр по жанрам, решение «добавить или
  убрать из избранного» — там. Frontend показывает готовый результат и реагирует
  на действия (toast, навигация). Не переноси такую логику обратно в presenter.
- Таски (`logic/tasks/`): одна таска — одна функция, имя — глагол (`loadCatalogPage`,
  `toggleTheme`). Никакого React: со сторами (i18n, тема) работают напрямую.
  Навигация и toast — не таски, они в presenter'е. Линтер это проверяет.
- Данные: `queryOptions` + хук запроса лежат в `logic/` рядом с presenter'ом
  (`ShowList/logic/useCatalogPage.ts`), `queryFn` вызывает таску; ключи иерархические
  (`['shows', 'detail', id]`). Передавай `signal` в `fetch`. Если запрос нужен другим
  веткам, компонент экспортирует хук из `index.ts` (`useFavorites` из `@/components/FavoriteToggle`).
- URL читает presenter экрана через `getRouteApi('/...')`.
- DTO (`*Dto`) не выходят за пределы `shared/api` и мапперов; компоненты
  работают с доменными моделями.
- `import.meta.env` читается только в `shared/config/env.ts`.
- Тексты UI — только через `t('...')` в presenter'е (View хуков не вызывает). Новый ключ добавляй в
  `shared/i18n/locales/ru.ts` (эталон) **и** `en.ts` — иначе ошибка типов.
- Компоненты shadcn: `npx shadcn@latest add <name>` → появятся в
  `src/shared/ui/kit/`. Импорт: `@/shared/ui/kit/<name>`. Хуки из сгенерированного
  кода убирай (ui-kit без логики): например, `Toaster` получает тему пропсом.
- Именование: папки и View — `PascalCase`, хуки — `useXxx.ts`, прочие модули —
  `kebab-case`. Компоненты — `export const X = () => ...`.
- Используется React Compiler: не добавляй `useMemo`/`useCallback`
  «для оптимизации» без причины.

## Подводные камни

- `src/app/routeTree.gen.ts` генерируется — **не редактировать**, но коммитить
  (без него падает `tsc -b`). Новый маршрут = новый файл в `src/app/routes/`.
  Папки компонентов внутри `routes` обязаны начинаться с `-`, иначе роутер
  примет их файлы за маршруты.
- Параметр `showId` парсится в `number` (`params.parse`), поэтому в
  `<Link params>` передаётся число.
- Кнопка не может лежать внутри `<Link>`: звёздочка в карточках — соседний элемент
  поверх ссылки (`relative`-обёртка + `absolute`).
- Избранное живёт в памяти backend: после перезапуска сервера оно пустое, и оно общее
  для всех пользователей (авторизации нет).
- Алиас `@/*` задан через `paths` без `baseUrl` — и в `tsconfig.json`
  (его читает shadcn CLI), и в `tsconfig.app.json`; плюс `resolve.alias` в `vite.config.ts`.
  Меняешь алиас — меняй во всех трёх местах.
- Если меняешь структуру слоёв или правила — обнови `docs/ARCHITECTURE.md`
  и `.oxlintrc.json` вместе.
