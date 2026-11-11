# TV Shows · Simple Architecture

Учебный проект для отработки **простой модульной архитектуры фронтенда**.
Приложение показывает каталог сериалов из [TVmaze API](https://www.tvmaze.com/api):
список с пагинацией, поиск и подробную карточку сериала с актёрским составом.

**Стек:** React 19 (React Compiler) · TypeScript · Vite · TanStack Router ·
TanStack Query · Tailwind CSS 4 · shadcn/ui · i18next (ru / en) · oxlint

## Быстрый старт

```bash
npm install
npm run dev        # http://localhost:5173
```

| Скрипт            | Что делает                                    |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | dev-сервер (заодно генерирует дерево маршрутов) |
| `npm run build`   | проверка типов + production-сборка            |
| `npm run preview` | локальный просмотр production-сборки           |
| `npm run lint`    | линтер, в том числе проверка границ слоёв      |

Переменные окружения необязательны, см. [`.env.example`](.env.example).

## Структура в двух словах

```
src/
├── app/        композиция: маршруты, layout, провайдеры
├── features/   сценарии: show-list, show-search, show-details, language-switcher
├── services/   переиспользуемая бизнес-логика: show
└── shared/     инфраструктура: api, ui-kit (shadcn), i18n, lib, config
```

Импорт разрешён только сверху вниз. Фичи не знают друг о друге. Модули
доступны снаружи только через свой `index.ts`. Эти правила проверяет `npm run lint`.

## Документация

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): слои, правила, потоки данных,
  как добавить новую фичу
- [docs/TECH_STACK.md](docs/TECH_STACK.md): как устроены и как использовать
  TanStack Router/Query, shadcn/ui, i18n и TVmaze API
- [CLAUDE.md](CLAUDE.md): короткая выжимка правил для Claude Code
  (и для людей, которым лень читать всё остальное)

## Идеи для практики

- Тёмная тема и переключатель темы (feature `theme-switcher`).
- Список эпизодов на странице сериала (`GET /shows/:id/episodes`).
- «Избранное» в `localStorage`. Используется и в карточке, и в отдельном
  разделе. Хорошая задача, чтобы решить, что идёт в `services`, а что в `features`.
- Страница актёра (`GET /people/:id`) с переходом из блока «В ролях».
- Бесконечная прокрутка каталога через `useInfiniteQuery`.
