# Site → Redirects

`site.redirects` lists and edits redirects for the site.

```typescript
const redirects = await site.redirects.getRedirects({ type: "standard" });
```

### `RedirectKind`

| Value      | Description            |
| ---------- | ---------------------- |
| `standard` | Ordinary redirect      |
| `geo`      | By country or language |

### `RedirectTypeCode`

| Value | Description |
| ----- | ----------- |
| `301` | Permanent   |
| `302` | Temporary   |
| `200` | Transparent |

### `RedirectCondition`

A country or language condition.

| Field     | Type       | Description                  |
| --------- | ---------- | ---------------------------- |
| `enabled` | `boolean`  | The condition is on          |
| `exclude` | `boolean`  | Exclude the values in `list` |
| `list`    | `string[]` | Countries or languages       |

### `Redirect`

A site redirect.

| Field             | Type                                      | Description                        |
| ----------------- | ----------------------------------------- | ---------------------------------- |
| `id`              | `number`                                  | Redirect id                        |
| `type`            | [`RedirectKind`](#redirectkind)           | Kind                               |
| `enabled`         | `boolean`                                 | On                                 |
| `fromAllPages`    | `boolean`                                 | From every page                    |
| `regularFromPage` | `boolean`                                 | `fromPage` is a regular expression |
| `fromPage`        | `string`                                  | Source                             |
| `toPage`          | `string`                                  | Destination                        |
| `redirectType`    | [`RedirectTypeCode`](#redirecttypecode)   | Status code                        |
| `saveQuery`       | `boolean`                                 | Keep the query string              |
| `sortIndex`       | `number`                                  | Order                              |
| `country`         | [`RedirectCondition`](#redirectcondition) | Country condition. Optional        |
| `language`        | [`RedirectCondition`](#redirectcondition) | Language condition. Optional       |

---

## `getRedirects`

Returns the site redirects.

`GET /sites/{siteId}/redirects`

```typescript
const redirects = await site.redirects.getRedirects({ type: "standard" });
```

**Input**

| Field  | Type                  | Description                         |
| ------ | --------------------- | ----------------------------------- |
| `type` | `'standard' \| 'geo'` | Which redirects to return. Optional |

**Response**

| Field  | Type                      | Description |
| ------ | ------------------------- | ----------- |
| `list` | [`Redirect[]`](#redirect) | Redirects   |

## `getRedirect`

Returns one redirect.

`GET /sites/{siteId}/redirects/{redirectId}`

```typescript
const redirect = await site.redirects.getRedirect(redirectId);
```

**Input**

| Field        | Type     | Description |
| ------------ | -------- | ----------- |
| `redirectId` | `number` | Redirect id |

**Response** [`Redirect`](#redirect).

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

| Field             | Type                                      | Description                                  |
| ----------------- | ----------------------------------------- | -------------------------------------------- |
| `type`            | `'standard' \| 'geo'`                     | Redirect kind. Required                      |
| `toPage`          | `string`                                  | Destination. Required                        |
| `enabled`         | `boolean`                                 | Whether it is on. Optional                   |
| `fromAllPages`    | `boolean`                                 | From every page. Optional                    |
| `regularFromPage` | `boolean`                                 | `fromPage` is a regular expression. Optional |
| `fromPage`        | `string`                                  | Source. Optional                             |
| `redirectType`    | `301 \| 302 \| 200`                       | Status code. Optional                        |
| `saveQuery`       | `boolean`                                 | Keep the query string. Optional              |
| `country`         | [`RedirectCondition`](#redirectcondition) | Country condition. Optional                  |
| `language`        | [`RedirectCondition`](#redirectcondition) | Language condition. Optional                 |

**Response** [`Redirect`](#redirect).

## `updateRedirect`

Updates a redirect. Every create field is optional on the patch, including `type` and `toPage`.

`PATCH /sites/{siteId}/redirects/{redirectId}`

```typescript
const redirect = await site.redirects.updateRedirect(redirectId, {
  toPage: "/other",
});
```

**Input**

| Field        | Type     | Description                     |
| ------------ | -------- | ------------------------------- |
| `redirectId` | `number` | Redirect id                     |
| patch        | object   | Any create fields. All optional |

**Response** [`Redirect`](#redirect).

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

## `replaceRedirects`

Replaces the whole list of one redirect type. Include every redirect you want to keep. An item without `id` is created. An existing id that you leave out is deleted. Array order becomes `sortIndex`. `type` comes from the path.

`PUT /sites/{siteId}/redirects/{type}`

```typescript
const redirects = await site.redirects.replaceRedirects("standard", [
  { toPage: "/new" },
]);
```

**Input**

| Field   | Type                    | Description                  |
| ------- | ----------------------- | ---------------------------- |
| `type`  | `'standard' \| 'geo'`   | Which list to replace        |
| `items` | `ReplaceRedirectItem[]` | Redirects that should remain |

**Response**

| Field  | Type                      | Description                |
| ------ | ------------------------- | -------------------------- |
| `list` | [`Redirect[]`](#redirect) | The list after replacement |
