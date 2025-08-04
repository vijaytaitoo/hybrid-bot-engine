# 🔗 Создание GitHub репозитория

## 📋 Шаги для создания репозитория

### 1. Создайте репозиторий на GitHub

1. Перейдите на https://github.com/teleplatform
2. Нажмите "New repository"
3. Название: `hybrid-bot-engine`
4. Описание: `Unified bot engine for Telegram and Web platforms with Supabase integration`
5. Выберите "Public"
6. НЕ инициализируйте с README (у нас уже есть)
7. Нажмите "Create repository"

### 2. Запушите код

После создания репозитория выполните:

```bash
# Убедитесь, что вы в папке hybrid-bot-engine
cd /path/to/hybrid-bot-engine

# Добавьте remote (если еще не добавлен)
git remote add origin https://github.com/teleplatform/hybrid-bot-engine.git

# Запушите код
git push -u origin main
```

### 3. Настройте GitHub Actions (опционально)

Создайте файл `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
```

### 4. Настройте деплой

#### Vercel (Frontend)
1. Подключите репозиторий к Vercel
2. Укажите корневую директорию: `apps/webbot-ui`
3. Добавьте переменные окружения
4. Deploy

#### Railway (Backend)
1. Подключите репозиторий к Railway
2. Укажите директорию: `apps/bots/hybrid-bot-engine`
3. Добавьте переменные окружения
4. Deploy

### 5. Настройте переменные окружения

В GitHub Settings → Secrets добавьте:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `TELEGRAM_BOT_TOKEN`
- `OPENAI_API_KEY`

### 6. Проверьте работу

После настройки проверьте:

1. ✅ Репозиторий создан: https://github.com/teleplatform/hybrid-bot-engine
2. ✅ Код загружен
3. ✅ CI/CD работает
4. ✅ Деплой настроен

## 🎯 Следующие шаги

После создания репозитория:

1. **Добавьте Web UI** (React чат)
2. **Подключите AI** (OpenAI/LangChain)
3. **Настройте fallback логику**
4. **Добавьте мониторинг**

## 📞 Поддержка

Если возникли проблемы:

- Email: v.taitoo@bk.ru
- Telegram: @Vijayee83
- GitHub Issues: https://github.com/teleplatform/hybrid-bot-engine/issues 