# Редиректы

`site.redirects` показывает и меняет редиректы одного сайта. Пути лежат на `/sites/{siteId}/redirects`.

```typescript
const redirects = await site.redirects.getRedirects({ type: "standard" });
```

`RedirectKind` — это `'standard'` или `'geo'`. `RedirectTypeCode` — число `301`, `302` или `200`.

`Redirect` — это `{ id, type, enabled, fromAllPages, regularFromPage, fromPage, toPage, redirectType, saveQuery, sortIndex, country?, language? }`.

Условие (`country` или `language`) — это `{ enabled, exclude, list }`. `list` — массив строк.

## `getRedirects`

`GET /sites/{siteId}/redirects`

```typescript
getRedirects(params?: GetRedirectsParams): Promise<RedirectListResponse>
```

`type` необязателен. Возвращает `{ list }`.

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

Обязательны `type` и `toPage`. Остальное необязательно: `enabled`, `fromAllPages`, `regularFromPage`, `fromPage`, `redirectType`, `saveQuery`, `country`, `language`.

## `updateRedirect`

`PATCH /sites/{siteId}/redirects/{redirectId}`

```typescript
updateRedirect(redirectId: number, patch: UpdateRedirectParams): Promise<Redirect>
```

В патче необязательно любое поле создания, включая `type` и `toPage`.

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

Отправляет `{ items }` и заменяет весь список этого типа. Передайте каждый редирект, который нужно оставить.

Элемент без `id` создаётся. Существующий id, который вы не передали, удаляется. Порядок массива становится `sortIndex`. Поля элемента те же, что у создания. `type` берётся из пути.
