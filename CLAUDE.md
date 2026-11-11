# CLAUDE.md

Учебный проект: каталог сериалов на [TVmaze API](https://www.tvmaze.com/api),
написанный по простой модульной архитектуре (Simple Architecture).
Главная ценность проекта — **соблюдение архитектуры**, а не количество фич.

Подробности (читай при работе над соответствующей частью):
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — слои, потоки данных, как добавить фичу;
- [docs/TECH_STACK.md](docs/TECH_STACK.md) — Router, Query, shadcn/ui, i18n, эндпоинты TVmaze.

## Команды

```bash
npm run dev      # dev-сервер; плагин роутера перегенерирует src/app/routeTree.gen.ts
npm run build    # tsc -b + vite build — основная проверка «всё ли собирается»
npm run lint     # oxlint, в том числе границы слоёв
```

Тестов пока нет. После изменений запускай `npm run lint && npm run build`.

## Слои (импорт только сверху вниз)

```
app → features → services → shared
```

- `app/` — композиция: маршруты (`app/routes`, file-based), layout, провайдеры.
  Маршрут = страница: владеет URL-состоянием и собирает фичи.
- `features/<name>/` — пользовательские сценарии. **Не импортируют друг друга**
  и не знают об URL (состояние приходит через props).
- `services/<name>/` — переиспользуемая бизнес-логика: доменная модель,
  мапперы DTO → модель, `queryOptions`-фабрики, общий UI сущности.
- `shared/` — инфраструктура без бизнес-смысла: `api` (http-клиент, DTO TVmaze),
  `ui/kit` (shadcn), `i18n`, `lib`, `config`.

Правила, которые проверяет линтер (`.oxlintrc.json`, `no-restricted-imports`):
- снаружи модуль `features/*` / `services/*` импортируется **только через `index.ts`**
  (`@/services/show`, не `@/services/show/api/...`);
- между модулями — только алиас `@/`, внутри модуля — относительные пути.

Код сначала живёт внутри фичи; в `services` переносится, когда нужен второй фиче.

## Соглашения

- Данные: запросы только через фабрики `xxxQueries` в `services/*/api`,
  ключи иерархические (`['shows', 'detail', id]`). Передавай `signal` в `fetch`.
- DTO (`*Dto`) не выходят за пределы `shared/api` и мапперов; компоненты
  работают с доменными моделями.
- `import.meta.env` читается только в `shared/config/env.ts`.
- Тексты UI — только через `t('...')`. Новый ключ добавляй в
  `shared/i18n/locales/ru.ts` (эталон) **и** `en.ts` — иначе ошибка типов.
- Компоненты shadcn: `npx shadcn@latest add <name>` → появятся в
  `src/shared/ui/kit/`. Импорт: `@/shared/ui/kit/<name>`.
- Файлы — `kebab-case`, компоненты — `export const X = () => ...`
  (в файлах маршрутов — `function` ниже `Route`).
- Используется React Compiler: не добавляй `useMemo`/`useCallback`
  «для оптимизации» без причины.

## Подводные камни

- `src/app/routeTree.gen.ts` генерируется — **не редактировать**, но коммитить
  (без него падает `tsc -b`). Новый маршрут = новый файл в `src/app/routes/`.
- Параметр `showId` парсится в `number` (`params.parse`), поэтому в
  `<Link params>` передаётся число.
- TVmaze: страницы `/shows?page=N` с 0, по 250 штук; 404 за концом списка
  превращается в `[]`. Лимит ~20 запросов / 10 с (429 ретраится).
- Алиас `@/*` задан через `paths` без `baseUrl` — и в `tsconfig.json`
  (его читает shadcn CLI), и в `tsconfig.app.json`; плюс `resolve.alias` в `vite.config.ts`.
  Меняешь алиас — меняй во всех трёх местах.
- Если меняешь структуру слоёв или правила — обнови `docs/ARCHITECTURE.md`
  и `.oxlintrc.json` вместе.
