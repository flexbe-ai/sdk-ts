# site > Redirects

`site.redirects` lists and edits redirects for one site. Paths sit on `/sites/{siteId}/redirects`.

```typescript
const redirects = await site.redirects.getRedirects({ type: "standard" });
```

`RedirectKind` is `'standard'` or `'geo'`. `RedirectTypeCode` is the number `301`, `302`, or `200`.

A `Redirect` is `{ id, type, enabled, fromAllPages, regularFromPage, fromPage, toPage, redirectType, saveQuery, sortIndex, country?, language? }`.

A condition (`country` or `language`) is `{ enabled, exclude, list }`. `list` is an array of strings.

## `getRedirects`

Returns the site redirects.

`GET /sites/{siteId}/redirects`

```typescript
const redirects = await site.redirects.getRedirects({ type: "standard" });
```

**Input**

| Field  | Type                   | Description                         |
| ------ | ---------------------- | ----------------------------------- |
| `type` | `'standard' \| 'geo'`  | Which redirects to return. Optional |

**Response**

| Field  | Type         | Description                         |
| ------ | ------------ | ----------------------------------- |
| `list` | `Redirect[]` | Redirects. Fields in the paragraph above |

## `getRedirect`

Returns one redirect.

`GET /sites/{siteId}/redirects/{redirectId}`

```typescript
const redirect = await site.redirects.getRedirect(redirectId);
```

**Input**

| Field        | Type     | Description   |
| ------------ | -------- | ------------- |
| `redirectId` | `number` | Redirect id   |

**Response** `Redirect`. Fields in the paragraph above.

## `createRedirect`

Creates a redirect.

`POST /sites/{siteId}/redirects`

```typescript
const redirect = await site.redirects.createRedirect({
  type: "standard",
  toPage: "/new",
});
```

**Input**

| Field             | Type                   | Description                                      |
| ----------------- | ---------------------- | ------------------------------------------------ |
| `type`            | `'standard' \| 'geo'`  | Redirect kind. Required                          |
| `toPage`          | `string`               | Destination. Required                            |
| `enabled`         | `boolean`              | Whether it is on. Optional                       |
| `fromAllPages`    | `boolean`              | From every page. Optional                        |
| `regularFromPage` | `boolean`              | `fromPage` is a regular expression. Optional     |
| `fromPage`        | `string`               | Source. Optional                                 |
| `redirectType`    | `301 \| 302 \| 200`    | Status code. Optional                            |
| `saveQuery`       | `boolean`              | Keep the query string. Optional                  |
| `country`         | `{ enabled, exclude, list }` | Country condition. Optional                |
| `language`        | `{ enabled, exclude, list }` | Language condition. Optional               |

**Response** `Redirect`. Fields in the paragraph above.

## `updateRedirect`

Updates a redirect. Every create field is optional on the patch, including `type` and `toPage`.

`PATCH /sites/{siteId}/redirects/{redirectId}`

```typescript
const redirect = await site.redirects.updateRedirect(redirectId, { toPage: "/other" });
```

**Input**

| Field        | Type     | Description                                |
| ------------ | -------- | ------------------------------------------ |
| `redirectId` | `number` | Redirect id                                |
| patch        | object   | Any create fields. All optional            |

**Response** `Redirect`. Fields in the paragraph above.

## `deleteRedirect`

Deletes a redirect.

`DELETE /sites/{siteId}/redirects/{redirectId}`

```typescript
await site.redirects.deleteRedirect(redirectId);
```

**Input**

| Field        | Type     | Description |
| ------------ | -------- | ----------- |
| `redirectId` | `number` | Redirect id |

**Response**

No body.

## `replaceRedirects`

Replaces the whole list of one redirect type. Include every redirect you want to keep. An item without `id` is created. An existing id that you leave out is deleted. Array order becomes `sortIndex`. `type` comes from the path.

`PUT /sites/{siteId}/redirects/{type}`

```typescript
const redirects = await site.redirects.replaceRedirects("standard", [
  { toPage: "/new" },
]);
```

**Input**

| Field   | Type                     | Description                                          |
| ------- | ------------------------ | ---------------------------------------------------- |
| `type`  | `'standard' \| 'geo'`    | Which list to replace                                |
| `items` | `ReplaceRedirectItem[]`  | Redirects that should remain. The body is `{ items }` |

**Response**

| Field  | Type         | Description              |
| ------ | ------------ | ------------------------ |
| `list` | `Redirect[]` | The list after replacement |
