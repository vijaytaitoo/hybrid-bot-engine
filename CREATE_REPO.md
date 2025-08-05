# 🚀 Создание GitHub репозитория

## 📋 Быстрые шаги

### 1. Создайте репозиторий на GitHub

1. Перейдите на https://github.com/teleplatform
2. Нажмите "New repository"
3. Название: `hybrid-bot-engine`
4. Описание: `Unified bot engine for Telegram and Web platforms with Supabase integration`
5. Выберите "Public"
6. НЕ инициализируйте с README
7. Нажмите "Create repository"

### 2. Запушите код

```bash
git push -u origin main
```

### 3. Настройте переменные окружения

В GitHub Settings → Secrets добавьте:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `TELEGRAM_BOT_TOKEN`
- `OPENAI_API_KEY`

### 4. Настройте деплой

- **Vercel**: Подключите репозиторий, укажите директорию `apps/webbot-ui`
- **Railway**: Подключите репозиторий, укажите директорию `apps/bots/hybrid-bot-engine`

## ✅ Готово!

После этого у вас будет:

- ✅ GitHub репозиторий с кодом
- ✅ CI/CD с GitHub Actions
- ✅ Автоматический деплой на Vercel и Railway
- ✅ Готовность к добавлению Web UI и AI

## 📞 Поддержка

- Email: v.taitoo@bk.ru
- Telegram: @Vijayee83
