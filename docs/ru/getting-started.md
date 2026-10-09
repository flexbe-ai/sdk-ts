# С чего начать

Установите SDK, создайте клиент с API-ключом и откройте сайт или аккаунт. Когда это заработает, `site.pages.getPages()` вернёт `{ list, pagination }`.

Нужен Node.js 20 или новее, либо браузер с `fetch`.

## Установка

```bash
npm install @flexbe/sdk
```

## Клиент

```typescript
import { FlexbeClient } from "@flexbe/sdk";

const client = new FlexbeClient({
  apiKey: "your-api-key",
});
```

В Node.js `apiKey` и `baseUrl` можно не передавать. Конструктор прочитает `FLEXBE_API_KEY` и `FLEXBE_API_URL`. Базовый URL по умолчанию — `https://api.flexbe.com`. Таймаут по умолчанию — `30000` миллисекунд. Режим аутентификации по умолчанию — API-ключ.

В браузере передайте `apiKey` и `baseUrl` в конфиге.

Если выбран режим API-ключа, а ключа нет, конструктор бросит ошибку до первого запроса.

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

`pages`, `leads`, `ecommerce`, `images`, `files`, `domains`, `redirects`, `settings`, `sandbox`, `stat`.

`site.get()` — это `GET /sites/123`. `site.update({ name, isDraft })` — `PATCH` по тому же пути. Список и создание проектов — в разделе [Сайты](sites.md).

## Открыть аккаунт

```typescript
const account = client.account(456);
const domains = await account.domains.list();
```

У аккаунта есть `domains`. Методы доменов — в разделе [Домены](domains.md).

## Дальше

- [Аутентификация](authentication.md), если вы в браузере и сессия Flexbe уже есть
- [Страницы](pages.md) — вызов списка из примера выше
- [Запросы и ошибки](requests.md) — перед тем как писать `catch`
