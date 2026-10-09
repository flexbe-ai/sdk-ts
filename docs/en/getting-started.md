# Get started

Install the SDK, create a client with an API key, and open a site or an account. When this works, `site.pages.getPages()` returns `{ list, pagination }`.

You need Node.js 20 or newer, or a browser with `fetch`.

## Install

```bash
npm install @flexbe/sdk
```

## Create a client

```typescript
import { FlexbeClient } from "@flexbe/sdk";

const client = new FlexbeClient({
  apiKey: "your-api-key",
});
```

In Node.js you can omit `apiKey` and `baseUrl`. The constructor then reads `FLEXBE_API_KEY` and `FLEXBE_API_URL`. The default base URL is `https://api.flexbe.com`. The default timeout is `30000` milliseconds. The default auth mode is an API key.

In the browser, pass `apiKey` and `baseUrl` in the config.

If the mode is an API key and the key is missing, the constructor throws before any request.

## See who the key belongs to

```typescript
const me = await client.getMe();
```

`GET /auth/me` returns `AuthMe`:

| `authType`  | `scope`     | Ids on the object                                 |
| ----------- | ----------- | ------------------------------------------------- |
| `'session'` | —           | `userId`                                          |
| `'apiKey'`  | `'site'`    | `siteId`, `accountId` (`accountId` may be `null`) |
| `'apiKey'`  | `'account'` | `accountId`                                       |

A site-scoped key already has the site id you pass to `getSiteApi`. An account-scoped key has the id you pass to `account`.

## Open a site

```typescript
const site = client.getSiteApi(123);
const current = await site.get();
```

`getSiteApi(siteId)` is `client.sites.getApi(siteId)`. The site object holds:

`pages`, `leads`, `ecommerce`, `images`, `files`, `domains`, `redirects`, `settings`, `sandbox`, `stat`.

`site.get()` is `GET /sites/123`. `site.update({ name, isDraft })` is `PATCH` on the same path. Listing and creating projects is on [Sites](sites.md).

## Open an account

```typescript
const account = client.account(456);
const domains = await account.domains.list();
```

The account object exposes `domains`. Domain methods are on [Domains](domains.md).

## Next

- [Authentication](authentication.md) when you are in the browser and already have a Flexbe session
- [Pages](pages.md) for the list call above
- [Requests and errors](requests.md) before you write a `catch`
