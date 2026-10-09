# Redirects

`site.redirects` lists and edits redirects for one site. Paths sit on `/sites/{siteId}/redirects`.

```typescript
const redirects = await site.redirects.getRedirects({ type: "standard" });
```

`RedirectKind` is `'standard'` or `'geo'`. `RedirectTypeCode` is the number `301`, `302`, or `200`.

A `Redirect` is `{ id, type, enabled, fromAllPages, regularFromPage, fromPage, toPage, redirectType, saveQuery, sortIndex, country?, language? }`.

A condition (`country` or `language`) is `{ enabled, exclude, list }`. `list` is an array of strings.

## `getRedirects`

`GET /sites/{siteId}/redirects`

```typescript
getRedirects(params?: GetRedirectsParams): Promise<RedirectListResponse>
```

`type` is optional. Returns `{ list }`.

## `getRedirect`

`GET /sites/{siteId}/redirects/{redirectId}`

```typescript
getRedirect(redirectId: number): Promise<Redirect>
```

## `createRedirect`

`POST /sites/{siteId}/redirects`

```typescript
createRedirect(body: CreateRedirectParams): Promise<Redirect>
```

`type` and `toPage` are required. The rest are optional: `enabled`, `fromAllPages`, `regularFromPage`, `fromPage`, `redirectType`, `saveQuery`, `country`, `language`.

## `updateRedirect`

`PATCH /sites/{siteId}/redirects/{redirectId}`

```typescript
updateRedirect(redirectId: number, patch: UpdateRedirectParams): Promise<Redirect>
```

Every create field is optional on the patch, including `type` and `toPage`.

## `deleteRedirect`

`DELETE /sites/{siteId}/redirects/{redirectId}`

```typescript
deleteRedirect(redirectId: number): Promise<void>
```

## `replaceRedirects`

`PUT /sites/{siteId}/redirects/{type}`

```typescript
replaceRedirects(type: RedirectKind, items: ReplaceRedirectItem[]): Promise<RedirectListResponse>
```

Sends `{ items }` and replaces the whole list of that type. Include every redirect you want to keep.

An item without `id` is created. An existing id that you leave out is deleted. Array order becomes `sortIndex`. Item fields match create. `type` comes from the path.
