# С чего начать

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

## Проверка ключа

Чтобы проверить подключение, выполните этот запрос. Он покажет, к чему у ключа есть доступ.

```typescript
const me = await client.getMe();
```

`GET /auth/me` возвращает `AuthMe`:

| `authType` | `scope`     | Id в объекте                                          |
| ---------- | ----------- | ----------------------------------------------------- |
| `'apiKey'` | `'site'`    | `siteId`, `accountId` (`accountId` может быть `null`) |
| `'apiKey'` | `'account'` | `accountId`                                           |

У ключа сайта уже есть id, который вы передаёте в `getSiteApi`. У ключа аккаунта — id для `account`.

## Открыть сайт

```typescript
const site = client.getSiteApi(123);
```

`getSiteApi(siteId)` — это `client.sites.getApi(siteId)`.

| Поле         | Описание                                          |
| ------------ | ------------------------------------------------- |
| `pages`      | [Страницы](pages.md)                              |
| `leads`      | [Заявки](leads.md)                                |
| `ecommerce`  | [Магазин](ecommerce.md): товары, категории и акции |
| `images`     | [Изображения](images.md)                          |
| `files`      | [Файлы](files.md)                                 |
| `domains`    | [Домены](domains.md) этого сайта                  |
| `redirects`  | [Редиректы](redirects.md)                         |
| `settings`   | [Настройки](settings.md)                          |
| `stat`       | [Статистика](statistics.md): A/B-тесты            |

## Открыть аккаунт

```typescript
const account = client.account(456);
```

| Поле      | Описание                         |
| --------- | -------------------------------- |
| `domains` | [Домены](domains.md) аккаунта    |
