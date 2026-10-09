# Client → Sites

A site is a project. `client.sites` lists and creates projects. `client.getSiteApi(siteId)` is the class for working with one project. Creating the client is in [Get started](README.md).

```typescript
const client = new FlexbeClient({ apiKey: "your-api-key" });
const sites = await client.sites.list();
const site = client.getSiteApi(sites.list[0].id);
```

### `Site`

A project.

| Field          | Type                                                  | Description                            |
| -------------- | ----------------------------------------------------- | -------------------------------------- |
| `id`           | `number`                                              | Project id                             |
| `accountId`    | `number`                                              | Owner account                          |
| `name`         | `string \| null`                                      | Name                                   |
| `isDraft`      | `boolean`                                             | Draft                                  |
| `createdAt`    | `string`                                              | When it was created                    |
| `role`         | `'owner' \| 'admin' \| 'editor' \| 'manager' \| null` | Current user's role on the site        |
| `access`       | `'owner' \| 'share'`                                  | Your site, or access through a share   |
| `domainUrl`    | `string \| null`                                      | Primary domain URL                     |
| `domainTitle`  | `string \| null`                                      | Primary domain name for display        |
| `domainIsTech` | `boolean \| null`                                     | The primary domain is a technical host |

---

## `list`

Returns the projects this key can see.

`GET /sites`

```typescript
const sites = await client.sites.list({ offset: 0, limit: 20 });
```

**Input**

| Field       | Type      | Description                                                |
| ----------- | --------- | ---------------------------------------------------------- |
| `offset`    | `number`  | How many projects to skip. Optional                        |
| `limit`     | `number`  | How many projects to return. Optional                      |
| `accountId` | `number`  | Only projects of this account. Optional                    |
| `isDraft`   | `boolean` | Draft or not. The query is `"true"` or `"false"`. Optional |

**Response**

| Field               | Type     | Description     |
| ------------------- | -------- | --------------- |
| `list`              | `Site[]` | [`Site`](#site) |
| `pagination.limit`  | `number` | Page size       |
| `pagination.offset` | `number` | Offset          |
| `pagination.total`  | `number` | Total rows      |

## `create`

Creates an empty project on the caller's account. If the account is already at its plan limit, the API responds with 409.

`POST /sites`

```typescript
const created = await client.sites.create({ name: "Shop", isDraft: true });
```

**Input**

| Field     | Type      | Description                 |
| --------- | --------- | --------------------------- |
| `name`    | `string`  | Name. Optional              |
| `isDraft` | `boolean` | Create as a draft. Optional |

**Response** [`Site`](#site).

## `getApi`

Returns the `site` object for one project. This call does not hit the network. `client.getSiteApi(siteId)` is the same method.

```typescript
const site = client.sites.getApi(siteId);
```

**Input**

| Field    | Type     | Description |
| -------- | -------- | ----------- |
| `siteId` | `number` | Project id  |

**Response** `SiteApi`. The object that holds the site resources: pages, domains, leads, and the other sections.

## Site

## `get`

Returns this project.

`GET /sites/{siteId}`

```typescript
const project = await site.get();
```

**Input**

No parameters.

**Response** [`Site`](#site).

## `update`

Changes the name or the draft flag.

`PATCH /sites/{siteId}`

```typescript
const project = await site.update({ name: "New name" });
```

**Input**

| Field     | Type      | Description     |
| --------- | --------- | --------------- |
| `name`    | `string`  | Name. Optional  |
| `isDraft` | `boolean` | Draft. Optional |

**Response** [`Site`](#site).

## `buildHtml`

Compiles one HTML block.

`POST /sites/{siteId}/html/build`

```typescript
const built = await site.buildHtml({
  sources: { html: "<div></div>", css: "div { color: red }" },
});
```

**Input**

| Field             | Type               | Description                                   |
| ----------------- | ------------------ | --------------------------------------------- |
| `sources.html`    | `string`           | Block HTML. Optional                          |
| `sources.js`      | `string`           | Script. Optional                              |
| `sources.css`     | `string`           | Styles. Optional                              |
| `sources.modules` | `PageCodeModule[]` | Modules `{ id, path, content }`. Optional     |
| `scopeCss`        | `boolean`          | Wrap CSS in `:scope`. On by default           |
| `external`        | `string[]`         | Modules to leave external instead of bundling |

`PageCodeModule` is `{ id, path, content }`, all strings.

**Response**

| Field       | Type                 | Description     |
| ----------- | -------------------- | --------------- |
| `html`      | `string`             | Compiled HTML   |
| `js`        | `string`             | Compiled script |
| `css`       | `string`             | Compiled styles |
| `utilities` | `string`             | Utility CSS     |
| `errors`    | `{ text: string }[]` | Build errors    |
| `warnings`  | `{ text: string }[]` | Build warnings  |

Saved element code on a page version is `PageCode`, which can also carry `utilities`. That shape is in [Page data](page-data.md).

## Account

```typescript
const account = client.account(accountId);
```

| Field     | Description                          |
| --------- | ------------------------------------ |
| `domains` | [Domains](domains.md) of the account |
