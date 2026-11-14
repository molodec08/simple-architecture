# CLAUDE.md

Учебный проект: каталог сериалов на [TVmaze API](https://www.tvmaze.com/api),
написанный по простой модульной архитектуре (Simple Architecture).
Главная ценность проекта — **соблюдение архитектуры**, а не количество фич.

Подробности (читай при работе над соответствующей частью):
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — правила архитектуры (View/Presenter, дерево папок, 120 строк);
- [docs/TECH_STACK.md](docs/TECH_STACK.md) — Router, Query, shadcn/ui, i18n, эндпоинты TVmaze.

## Команды

```bash
npm run dev      # dev-сервер; плагин роутера перегенерирует src/app/routeTree.gen.ts
npm run build    # tsc -b + vite build — основная проверка «всё ли собирается»
npm run lint     # oxlint, в том числе импорт только через public api
```

Тестов пока нет. После изменений запускай `npm run lint && npm run build`.

## Структура (правила — в docs/ARCHITECTURE.md, они обязательны)

Каждый компонент — папка `X/` с `X.tsx` (View, только JSX), `usePresenter.ts`
(логика, тексты, данные) и `index.ts` (public api). Дерево папок повторяет
дерево компонентов на экране. Любой файл — не больше 120 строк.

```
src/
├── app/            провайдеры, роутер, стили
│   └── routes/     файлы маршрутов (только конфиг) + дерево экранов в папках `-X/`
│                   (-RootLayout, -HomeScreen, shows/-ShowScreen …)
├── components/     глобальные переиспользуемые компоненты (≥ 2 веток дерева)
├── model/<name>/   доменная модель, нужная нескольким веткам (типы + мапперы)
└── shared/         инфраструктура без бизнес-смысла: api, config, i18n, lib, ui/kit
```

- Компонент одной ветки — в папке родителя; общий для ветки — в её `components/`.
- Глобальные модули — через алиас `@/`, внутри дерева — относительные пути.
- Линтер (`no-restricted-imports`) запрещает импорт в обход `index.ts`.

## Соглашения

- Данные: `queryOptions` + хук запроса лежат рядом с presenter'ом, который их
  использует (`ShowList/useShowsPage.ts`); ключи иерархические
  (`['shows', 'detail', id]`). Передавай `signal` в `fetch`.
- URL читает presenter экрана через `getRouteApi('/...')`.
- DTO (`*Dto`) не выходят за пределы `shared/api` и мапперов; компоненты
  работают с доменными моделями.
- `import.meta.env` читается только в `shared/config/env.ts`.
- Тексты UI — только через `t('...')` в presenter'е (View хуков не вызывает). Новый ключ добавляй в
  `shared/i18n/locales/ru.ts` (эталон) **и** `en.ts` — иначе ошибка типов.
- Компоненты shadcn: `npx shadcn@latest add <name>` → появятся в
  `src/shared/ui/kit/`. Импорт: `@/shared/ui/kit/<name>`.
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
- TVmaze: страницы `/shows?page=N` с 0, по 250 штук; 404 за концом списка
  превращается в `[]`. Лимит ~20 запросов / 10 с (429 ретраится).
- Алиас `@/*` задан через `paths` без `baseUrl` — и в `tsconfig.json`
  (его читает shadcn CLI), и в `tsconfig.app.json`; плюс `resolve.alias` в `vite.config.ts`.
  Меняешь алиас — меняй во всех трёх местах.
- Если меняешь структуру слоёв или правила — обнови `docs/ARCHITECTURE.md`
  и `.oxlintrc.json` вместе.
