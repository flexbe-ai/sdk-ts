# Get started

Install the SDK and create a client with an API key. The first call is `client.getMe()`: it shows who the key belongs to. Then open a site or an account.

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

## Browser

Use bearer mode in the browser, on a page that already has a Flexbe session. In Node.js, use an API key.

```typescript
const client = new FlexbeClient({
  authType: FlexbeAuthType.BEARER,
  baseUrl: "https://api.flexbe.com",
});
```

An API key is not required in this mode. Set `authType` and let the client take the token from the session.

The client asks the page for an access token with `POST /oauth/token` and the session cookie, then sends that token to `baseUrl` as `Authorization: Bearer`. The token request uses the page origin. API calls use `baseUrl`.

The client refreshes the token before it expires.

`client.revokeToken()` revokes the browser token with `POST /oauth/revoke` on the page origin and then drops it. If that call fails, the local token is still dropped. In API key mode, `revokeToken()` returns without a request.

```typescript
const client = new FlexbeClient({
  apiKey: "your-api-key",
  hooks: {
    onUnauthorized() {
      // The request already failed with 401.
    },
  },
});
```

`hooks.onUnauthorized` runs after a request fails with 401, including when the token refresh for that request fails.

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

`pages`, `leads`, `ecommerce`, `images`, `files`, `domains`, `redirects`, `settings`, `stat`.

`site.get()` is `GET /sites/123`. `site.update({ name, isDraft })` is `PATCH` on the same path. Listing and creating projects is on [Sites](sites.md).

## Open an account

```typescript
const account = client.account(456);
const domains = await account.domains.list();
```

The account object exposes `domains`. Domain methods are on [Domains](domains.md).

## Next

- [Pages](pages.md) to list the pages of a site
- [Requests and errors](requests.md) before you write a `catch`
