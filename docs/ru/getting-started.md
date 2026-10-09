# С чего начать

Установите SDK и создайте клиент с API-ключом. Первый запрос — `client.getMe()`: он показывает, чей это ключ. Дальше откройте сайт или аккаунт.

## Установка

```bash
npm install @flexbe/sdk
```

## Клиент

```typescript
import { FlexbeAuthType, FlexbeClient } from "@flexbe/sdk";

const client = new FlexbeClient({
  apiKey: "your-api-key",
  baseUrl: "https://api.flexbe.com",
  authType: FlexbeAuthType.API_KEY,
});
```

`apiKey` и `baseUrl` по умолчанию берутся из `FLEXBE_API_KEY` и `FLEXBE_API_URL`. Если `FLEXBE_API_URL` не задана, базовый URL — `https://api.flexbe.com`. Таймаут по умолчанию — `30000` миллисекунд. Режим аутентификации по умолчанию — API-ключ.

## Браузер

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

## Чей это ключ

```typescript
const me = await client.getMe();
```

`GET /auth/me` возвращает `AuthMe`:

| `authType`  | `scope`     | Id в объекте                                          |
| ----------- | ----------- | ----------------------------------------------------- |
| `'session'` | —           | `userId`                                              |
| `'apiKey'`  | `'site'`    | `siteId`, `accountId` (`accountId` может быть `null`) |
| `'apiKey'`  | `'account'` | `accountId`                                           |

У ключа сайта уже есть id, который вы передаёте в `getSiteApi`. У ключа аккаунта — id для `account`.

## Открыть сайт

```typescript
const site = client.getSiteApi(123);
const current = await site.get();
```

`getSiteApi(siteId)` — это `client.sites.getApi(siteId)`. У объекта сайта есть:

`pages`, `leads`, `ecommerce`, `images`, `files`, `domains`, `redirects`, `settings`, `stat`.

`site.get()` — это `GET /sites/123`. `site.update({ name, isDraft })` — `PATCH` по тому же пути. Список и создание проектов — в разделе [Сайты](sites.md).

## Открыть аккаунт

```typescript
const account = client.account(456);
const domains = await account.domains.list();
```

У аккаунта есть `domains`. Методы доменов — в разделе [Домены](domains.md).

## Дальше

- [Страницы](pages.md) — список страниц сайта
- [Запросы и ошибки](requests.md) — перед тем как писать `catch`
