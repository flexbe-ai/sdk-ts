# Get started

## Install

```bash
npm install @flexbe/sdk
```

## Create a client

```typescript
import { FlexbeAuthType, FlexbeClient } from "@flexbe/sdk";

const client = new FlexbeClient({
  apiKey: "your-api-key",
  baseUrl: "https://api.flexbe.com",
  authType: FlexbeAuthType.API_KEY,
});
```

`apiKey` and `baseUrl` default to `FLEXBE_API_KEY` and `FLEXBE_API_URL`. If `FLEXBE_API_URL` is unset, the base URL is `https://api.flexbe.com`. The default timeout is `30000` milliseconds. The default auth mode is an API key.

## Check the key

Run this call to check the connection. It shows what the key can access.

```typescript
const me = await client.getMe();
```

`GET /auth/me` returns `AuthMe`:

| `authType` | `scope`     | Ids on the object                                 |
| ---------- | ----------- | ------------------------------------------------- |
| `'apiKey'` | `'site'`    | `siteId`, `accountId` (`accountId` may be `null`) |
| `'apiKey'` | `'account'` | `accountId`                                       |

A site-scoped key already has the site id you pass to `getSiteApi`. An account-scoped key has the id you pass to `account`.

## Site

```typescript
const site = client.getSiteApi(123);
```

`123` is the site id.

| Field        | Description                                        |
| ------------ | -------------------------------------------------- |
| `pages`      | [Pages](pages.md)                                  |
| `leads`      | [Leads](leads.md)                                  |
| `ecommerce`  | [Ecommerce](ecommerce.md): products and categories |
| `promotions` | [Promotions](promotions.md)                        |
| `images`     | [Images](images.md)                                |
| `files`      | [Files](files.md)                                  |
| `domains`    | [Domains](domains.md) of the site                  |
| `redirects`  | [Redirects](redirects.md)                          |
| `settings`   | [Settings](settings.md)                            |
| `stat`       | [Statistics](statistics.md)                        |

## Account

```typescript
const account = client.account(456);
```

`456` is the account id.

| Field     | Description                          |
| --------- | ------------------------------------ |
| `domains` | [Domains](domains.md) of the account |

## Errors

Status codes, the timeout, and the same paths as plain HTTP are in [Requests and errors](requests.md).
