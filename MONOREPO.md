# 🏗️ TeleGa Platform Monorepo

## 📁 Структура проекта

```
telega-platform/
├── apps/                    # Приложения
│   ├── web/                # Next.js WebApp (Vercel)
│   └── bot/                # Telegram Bot (Railway)
├── packages/               # Общие пакеты
│   ├── ui/                # UI компоненты (shadcn + Tailwind)
│   ├── utils/             # Утилиты, валидация, форматирование
│   └── core/              # Общая логика (auth, db, api)
├── turbo.json             # TurboRepo конфигурация
├── pnpm-workspace.yaml    # pnpm workspace
└── package.json           # Корневой package.json
```

## 🚀 Быстрый старт

```bash
# Установка зависимостей
pnpm install

# Разработка всех приложений
pnpm dev

# Сборка всех пакетов
pnpm build

# Тестирование
pnpm test

# Линтинг
pnpm lint
```

## 📦 Пакеты

### `@telega/ui` - UI компоненты
- **Назначение**: Переиспользуемые React компоненты
- **Технологии**: shadcn/ui, Tailwind CSS, class-variance-authority
- **Компоненты**: Button, Card, Badge, и другие
- **Использование**: `import { Button } from '@telega/ui'`

### `@telega/utils` - Утилиты
- **Назначение**: Общие функции и хелперы
- **Модули**: validation, formatting, parsers
- **Использование**: `import { validateEmail } from '@telega/utils'`

### `@telega/core` - Основная логика
- **Назначение**: База данных, аутентификация, API
- **Модули**: database, auth, api, models
- **Использование**: `import { supabase } from '@telega/core'`

## 🔧 Команды

### Разработка
```bash
# Запуск всех приложений в режиме разработки
pnpm dev

# Запуск конкретного приложения
pnpm dev --filter=@telega/web
pnpm dev --filter=@telega/bot

# Запуск пакета в режиме watch
pnpm dev --filter=@telega/ui
```

### Сборка
```bash
# Сборка всех пакетов и приложений
pnpm build

# Сборка конкретного пакета
pnpm build --filter=@telega/ui
pnpm build --filter=@telega/utils
pnpm build --filter=@telega/core
```

### Тестирование
```bash
# Запуск всех тестов
pnpm test

# Тесты с покрытием
pnpm test:coverage

# Тесты конкретного пакета
pnpm test --filter=@telega/utils
```

### Линтинг и форматирование
```bash
# Линтинг всех файлов
pnpm lint

# Форматирование
pnpm format

# Проверка типов
pnpm type-check
```

## 🏗️ Архитектура

### Приложения (`apps/`)
- **web**: Next.js приложение для веб-интерфейса
- **bot**: Telegram бот с Express сервером

### Пакеты (`packages/`)
- **ui**: Переиспользуемые UI компоненты
- **utils**: Общие утилиты и хелперы
- **core**: Основная бизнес-логика

### Зависимости
```
apps/web     → @telega/ui, @telega/utils, @telega/core
apps/bot     → @telega/utils, @telega/core
packages/ui  → react, tailwindcss
packages/utils → zod, date-fns
packages/core → @supabase/supabase-js, openai, grammy
```

## 🔄 Workflow

### Разработка
1. Создайте новую ветку: `git checkout -b feature/new-feature`
2. Внесите изменения в пакеты или приложения
3. Запустите тесты: `pnpm test`
4. Проверьте линтер: `pnpm lint`
5. Соберите проект: `pnpm build`
6. Создайте PR

### Добавление нового пакета
1. Создайте папку в `packages/`
2. Добавьте `package.json` с именем `@telega/package-name`
3. Настройте `tsconfig.json` и `tsup.config.ts`
4. Добавьте в `pnpm-workspace.yaml`
5. Установите зависимости: `pnpm install`

### Добавление нового приложения
1. Создайте папку в `apps/`
2. Добавьте `package.json` с именем `@telega/app-name`
3. Настройте зависимости от пакетов
4. Добавьте в `turbo.json` pipeline
5. Установите зависимости: `pnpm install`

## 🚀 Деплой

### WebApp (Vercel)
- **Путь**: `apps/web`
- **Команда сборки**: `pnpm build`
- **Автодеплой**: при push в `main`

### Bot (Railway)
- **Путь**: `apps/bot`
- **Команда запуска**: `pnpm start`
- **Автодеплой**: при push в `main`

## 📊 Мониторинг

### TurboRepo кэш
- **Локальный кэш**: `.turbo/`
- **Удаленный кэш**: через Vercel
- **Очистка**: `pnpm clean:all`

### Производительность
- **Параллельная сборка**: TurboRepo
- **Кэширование**: зависимостей и результатов
- **Инкрементальная сборка**: только измененные файлы

## 🔒 Безопасность

### Переменные окружения
- **Локально**: `.env.local`
- **Продакшн**: через платформы деплоя
- **Секреты**: в GitHub Secrets

### Аудит
- **Зависимости**: `pnpm audit`
- **Сканирование**: Snyk интеграция
- **Автоматические проверки**: в CI/CD

## 📚 Документация

### Пакеты
- **UI**: Компоненты и их использование
- **Utils**: Функции и их API
- **Core**: Модули и их интеграция

### Приложения
- **WebApp**: Структура и роутинг
- **Bot**: Команды и обработчики

### API
- **REST**: Endpoints и схемы
- **WebSocket**: Реальное время
- **GraphQL**: Запросы и мутации

## 🤝 Contributing

### Правила
1. Используйте Conventional Commits
2. Добавляйте тесты для новых функций
3. Обновляйте документацию
4. Проверяйте типы TypeScript

### Процесс
1. Fork репозитория
2. Создайте feature ветку
3. Внесите изменения
4. Добавьте тесты
5. Обновите документацию
6. Создайте Pull Request

## 🐛 Troubleshooting

### Проблемы с зависимостями
```bash
# Очистка кэша
pnpm clean:all

# Переустановка
pnpm install

# Проверка зависимостей
pnpm why @telega/ui
```

### Проблемы со сборкой
```bash
# Очистка сборки
pnpm clean

# Пересборка
pnpm build

# Проверка конфигурации
pnpm type-check
```

### Проблемы с тестами
```bash
# Запуск тестов с отладкой
pnpm test --reporter=verbose

# Проверка покрытия
pnpm test:coverage

# Запуск конкретного теста
pnpm test --filter=@telega/utils -- --grep="validation"
```
