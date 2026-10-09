# Аутентификация

Клиент отправляет либо API-ключ, либо bearer-токен. Режим задаётся в `FlexbeConfig.authType`. По умолчанию `FlexbeAuthType.API_KEY` (`'apiKey'`).

Ключ для скриптов и серверов описан в разделе [С чего начать](getting-started.md). Здесь — поля конфига и bearer в браузере.

## API-ключ

```typescript
import { FlexbeAuthType, FlexbeClient } from "@flexbe/sdk";

const client = new FlexbeClient({
  apiKey: "your-api-key",
  authType: FlexbeAuthType.API_KEY,
  baseUrl: "https://api.flexbe.com",
  timeout: 30000,
});
```

Каждый запрос уходит с заголовком `x-api-key`. В этом режиме ключ обязателен. Если его нет, конструктор бросит ошибку до первого запроса.

В Node.js `apiKey` и `baseUrl` можно не передавать и задать их в окружении:

| Переменная       | Роль                                   |
| ---------------- | -------------------------------------- |
| `FLEXBE_API_KEY` | Ключ, если `apiKey` не передан         |
| `FLEXBE_API_URL` | Базовый URL, если `baseUrl` не передан |

В браузере оба значения передайте в конфиге.

## Bearer-токен

Bearer нужен в браузере, на странице, где уже есть сессия Flexbe. В Node.js используйте API-ключ.

```typescript
const client = new FlexbeClient({
  authType: FlexbeAuthType.BEARER,
  baseUrl: "https://api.flexbe.com",
});
```

API-ключ в этом режиме не нужен. Задайте `authType`, токен клиент возьмёт из сессии сам.

Клиент запрашивает токен у страницы: `POST /oauth/token` и cookie сессии. Дальше отправляет его на `baseUrl` как `Authorization: Bearer`. Запрос токена идёт на origin страницы. Вызовы API идут на `baseUrl`.

Клиент обновляет токен до того, как он истечёт.

`client.revokeToken()` отзывает токен браузера через `POST /oauth/revoke` на origin страницы и затем забывает его. Если этот вызов не удался, локальный токен всё равно сбрасывается. В режиме API-ключа `revokeToken()` возвращается без запроса.

## Хук 401

```typescript
const client = new FlexbeClient({
  apiKey: "your-api-key",
  hooks: {
    onUnauthorized() {
      // Запрос уже завершился с 401.
    },
  },
});
```

`hooks.onUnauthorized` вызывается после ответа 401, в том числе когда обновление токена для этого запроса не удалось.
