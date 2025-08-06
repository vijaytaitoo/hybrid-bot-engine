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

### ⌨️ Горячие клавиши

| Действие | Команда |
|----------|---------|
| **Полная очистка кода** | `pnpm run clean-code` |
| **Только линтинг** | `pnpm run lint` |
| **Только форматирование** | `pnpm run format` |
| **Проверка типов** | `pnpm run type-check` |

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

### 📝 Правила коммитов

```bash
# ✅ Хорошие коммиты
feat: Add user authentication
fix: Resolve webhook timeout issue
docs: Update API documentation

# ❌ Плохие коммиты
update
fix stuff
wip
```

### 🔍 Проверка перед PR

1. **Запустите полную очистку:**
   ```bash
   pnpm run clean-code
   ```

2. **Проверьте типы:**
   ```bash
   pnpm run type-check
   ```

3. **Убедитесь, что нет ошибок:**
   ```bash
   pnpm run lint
   ```

4. **Проверьте, что проект собирается:**
   ```bash
   pnpm run build
   ```

### 🚀 Deployment

Проект автоматически деплоится при пуше в `main`:
- **GitHub Actions** → проверяет код
- **Railway** → деплоит backend
- **Vercel** → деплоит frontend (когда добавим)

### 🆘 Помощь

Если возникли проблемы:
1. Проверьте [CURSOR_SHORTCUTS.md](./CURSOR_SHORTCUTS.md)
2. Запустите `pnpm run clean-code`
3. Используйте AI-помощь в Cursor
4. Создайте Issue в GitHub

---

**Помните: чистый код = счастливая команда!** 🎉 