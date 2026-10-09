# Sites

A site is a project. `client.sites` lists and creates projects. `client.getSiteApi(siteId)` opens one project and exposes its resources. Creating the client is in [Get started](getting-started.md).

```typescript
const client = new FlexbeClient({ apiKey: "your-api-key" });
const sites = await client.sites.list();
const site = client.getSiteApi(sites.list[0].id);
```

## `Sites`

### `list`

`GET /sites`

```typescript
list(params?: GetSitesParams): Promise<SiteListResponse>
```

| Field       | Type      | Sent as                                 |
| ----------- | --------- | --------------------------------------- |
| `offset`    | `number`  | query `offset`                          |
| `limit`     | `number`  | query `limit`                           |
| `accountId` | `number`  | query `accountId`                       |
| `isDraft`   | `boolean` | query `isDraft` (`"true"` or `"false"`) |

Returns `{ list: Site[], pagination }`. `pagination` is `{ limit, offset, total }`.

### `create`

`POST /sites`

```typescript
create(params?: CreateSiteParams): Promise<Site>
```

Creates an empty project on the caller's account. `name` and `isDraft` are optional. If the account is already at its plan limit, the API responds with 409.

### `getApi`

```typescript
getApi(siteId: number): SiteApi
```

Returns a new `SiteApi`. This call does not hit the network. `client.getSiteApi` is this method.

## `Site`

| Field          | Type                                                  |
| -------------- | ----------------------------------------------------- |
| `id`           | `number`                                              |
| `accountId`    | `number`                                              |
| `name`         | `string \| null`                                      |
| `isDraft`      | `boolean`                                             |
| `createdAt`    | `string`                                              |
| `role`         | `'owner' \| 'admin' \| 'editor' \| 'manager' \| null` |
| `access`       | `'owner' \| 'share'`                                  |
| `domainUrl`    | `string \| null`                                      |
| `domainTitle`  | `string \| null`                                      |
| `domainIsTech` | `boolean \| null`                                     |

## `SiteApi`

### `get`

`GET /sites/{siteId}`

```typescript
get(): Promise<Site>
```

### `update`

`PATCH /sites/{siteId}`

```typescript
update(patch: UpdateSiteParams): Promise<Site>
```

`UpdateSiteParams` is `{ name?: string; isDraft?: boolean }`.

### `buildHtml`

`POST /sites/{siteId}/html/build`

Compiles one HTML block.

```typescript
buildHtml(body: BuildHtmlParams): Promise<BuildHtmlResult>
```

| Field             | Type                         |
| ----------------- | ---------------------------- |
| `sources.html`    | `string`, optional           |
| `sources.js`      | `string`, optional           |
| `sources.css`     | `string`, optional           |
| `sources.modules` | `PageCodeModule[]`, optional |
| `scopeCss`        | `boolean`, optional          |
| `external`        | `string[]`, optional         |

`PageCodeModule` is `{ id, path, content }`, all strings.

The result is `{ html, js, css, utilities, errors, warnings }`. `utilities` is a string. `errors` and `warnings` are `{ text: string }[]`.

Saved element code on a page version is `PageCode`, which can also carry `utilities`. That shape is in [Page data](page-data.md).

## Account

```typescript
const account = client.account(accountId);
```

`account.domains` is the account domain list. See [Domains](domains.md).
