# Authentication

The client sends either an API key or a bearer token. Set the mode in `FlexbeConfig.authType`. The default is `FlexbeAuthType.API_KEY` (`'apiKey'`).

API key setup for scripts and servers is in [Get started](getting-started.md). This page is the config fields and bearer mode in the browser.

## API key

```typescript
import { FlexbeAuthType, FlexbeClient } from "@flexbe/sdk";

const client = new FlexbeClient({
  apiKey: "your-api-key",
  authType: FlexbeAuthType.API_KEY,
  baseUrl: "https://api.flexbe.com",
  timeout: 30000,
});
```

Every request sends the header `x-api-key`. The key is required in this mode. A missing key throws from the constructor, before the first request.

In Node.js you can omit `apiKey` and `baseUrl` and set them in the environment:

| Variable         | Role                                    |
| ---------------- | --------------------------------------- |
| `FLEXBE_API_KEY` | Key used when `apiKey` is omitted       |
| `FLEXBE_API_URL` | Base URL used when `baseUrl` is omitted |

In the browser, pass both values in the config.

## Bearer token

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

## Unauthorized hook

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
