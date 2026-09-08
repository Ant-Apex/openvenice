# openvenice → Apex Ant frontend

- Build: `docker build --build-arg VITE_VENICE_BASE_URL=https://api.apex-ant.net/api/v1 -t apex-app .`
  (staging is already set in .env.production: api.next.apex-ant.net)
- The user pastes an `apx_live_…` key in the UI (Settings → API key); the key lives in
  the browser's localStorage, the frontend has no backend — that is the whole privacy story.
- Deploy TODO: CORS allowlist on the gateway (app.apex-ant.net), key placeholder hint
  "apx_live_…", model catalog served from our /v1/models (openvenice calls
  {base}/models — the gateway must return our list in a Venice-compatible shape —
  VERIFY field mapping, Venice API shape vs OpenAI shape differ!
  Venice /models returns its own schema; a gateway-side adapter may be needed).
- Do NOT deploy to prod before TEE (decree). Staging: app.next.apex-ant.net.
