# openvenice → Apex Ant frontend
- Build: `docker build --build-arg VITE_VENICE_BASE_URL=https://api.apex-ant.net/api/v1 -t apex-app .`
  (стейдж уже в .env.production: api.next.apex-ant.net)
- Юзер вставляет ключ `apx_live_…` в UI (Settings → API key); ключ живёт в localStorage
  его браузера, бэкенда у фронта нет — сторит вся privacy-история.
- TODO при деплое: CORS на gateway (allowlist app.apex-ant.net), ключ-плейсхолдер-подсказка
  «apx_live_…», модельный каталог подтянуть с нашего /v1/models (openvenice дёргает
  {base}/models — gateway должен отдавать наш список в Venice-совместимом формате —
  ПРОВЕРИТЬ соответствие полей, Venice API shape vs OpenAI shape различаются!
  Venice /models возвращает свою схему; возможно нужен адаптер на gateway).
- НЕ деплоить в прод до TEE (декрет). Стейдж: app.next.apex-ant.net.
