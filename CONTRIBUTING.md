# 🤝 Contributing to Hybrid Bot Engine

## 📋 Code Quality Standards

### ✅ Before Committing

Всегда запускайте перед коммитом:

```bash
pnpm run clean-code
```

Эта команда автоматически:
- ✅ Исправит все ESLint ошибки
- ✅ Отформатирует код через Prettier
- ✅ Организует импорты
- ✅ Удалит console.log (кроме warn/error)
- ✅ Удалит debugger
- ✅ Предупредит о TODO комментариях

### 🛡️ Проверка безопасности

```bash
# Полная проверка безопасности
pnpm run security

# Проверка уязвимостей зависимостей
pnpm run snyk:test

# Мониторинг зависимостей
pnpm run snyk:monitor
```

### 🚫 Запрещенные элементы в коде

| Элемент | Статус | Альтернатива |
|---------|--------|--------------|
| `console.log()` | ❌ Ошибка | `Logger.info()` или `console.warn()` |
| `debugger` | ❌ Ошибка | Используйте отладчик IDE |
| `TODO` комментарии | ⚠️ Предупреждение | Создайте GitHub Issue |

### 📊 Система логирования

Вместо `console.log` используйте:

```typescript
import { Logger, log, logWarn, logError } from '../lib/logger';

// Информационные сообщения
await log('User registered', userId, 'auth');

// Предупреждения
await logWarn('API rate limit approaching', userId, 'api');

// Ошибки
await logError('Database connection failed', userId, 'database', { error: err.message });

// Отладка (только в development)
await Logger.debug('Processing webhook', userId, 'webhook', { payload });
```

### ⌨️ Все доступные команды

| Действие | Команда | Описание |
|----------|---------|----------|
| **Полная очистка кода** | `pnpm run clean-code` | Lint + Format |
| **Только линтинг** | `pnpm run lint` | ESLint исправления |
| **Только форматирование** | `pnpm run format` | Prettier форматирование |
| **Проверка типов** | `pnpm run type-check` | TypeScript проверка |
| **Проверка безопасности** | `pnpm run security` | Snyk сканирование |
| **Генерация changelog** | `pnpm run changelog` | Обновить CHANGELOG.md |

### 📝 Conventional Commits

Используйте правильный формат коммитов:

```bash
# ✅ Хорошие коммиты
feat: add user authentication
fix: resolve webhook timeout issue
docs: update API documentation
refactor: improve logging system
security: update vulnerable dependencies

# ❌ Плохие коммиты
update
fix stuff
wip
changes
```

### 🤖 AI Code Review

Каждый Pull Request автоматически проходит:

- 🔍 **ESLint проверка**
- 🎨 **Prettier форматирование**
- 📝 **TypeScript проверка типов**
- 🛡️ **Security сканирование**
- 🤖 **AI-анализ изменений**

AI-бот автоматически добавит комментарий с результатами проверки.

### 🔧 Настройка IDE

#### VS Code / Cursor

Добавьте в settings.json:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.organizeImports": true
  },
  "eslint.validate": ["typescript", "typescriptreact"],
  "eslint.alwaysShowStatus": true,
  "prettier.enable": true
}
```

### 🎯 AI-помощь

В Cursor используйте:
- `Cmd+K` → "Fix with AI" для исправления сложных ошибок
- `Cmd+K` → "Clean this file" для очистки всего файла
- `Cmd+K` → "Explain this" для понимания кода

### 🔍 Проверка перед PR

1. **Запустите полную очистку:**
   ```bash
   pnpm run clean-code
   ```

2. **Проверьте безопасность:**
   ```bash
   pnpm run security
   ```

3. **Проверьте типы:**
   ```bash
   pnpm run type-check
   ```

4. **Убедитесь, что проект собирается:**
   ```bash
   pnpm run build
   ```

### 🚀 Deployment & CI/CD

Проект автоматически проходит проверки при каждом PR:

- **Security Scan**: Snyk + npm audit
- **Code Quality**: ESLint + Prettier + TypeScript
- **AI Review**: Автоматический анализ изменений
- **Deploy**: Автоматический деплой в Railway/Vercel

### 📋 Release Process

1. **Обновите changelog:**
   ```bash
   pnpm run changelog
   ```

2. **Создайте PR с изменениями**
3. **После мерджа создайте Git tag:**
   ```bash
   git tag v1.0.1
   git push origin v1.0.1
   ```

### 🛡️ Security Guidelines

- Никогда не коммитьте API ключи или секреты
- Используйте GitHub Secrets для CI/CD
- Регулярно обновляйте зависимости
- Проверяйте уязвимости перед релизом

### 🆘 Помощь

Если возникли проблемы:
1. Проверьте [CURSOR_SHORTCUTS.md](./CURSOR_SHORTCUTS.md)
2. Прочитайте [SECURITY.md](./SECURITY.md)
3. Запустите `pnpm run clean-code`
4. Используйте AI-помощь в Cursor
5. Создайте Issue в GitHub

---

**Помните: безопасный и чистый код = счастливая команда!** 🎉 