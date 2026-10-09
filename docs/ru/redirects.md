# site > Редиректы

`site.redirects` показывает и меняет редиректы одного сайта. Пути лежат на `/sites/{siteId}/redirects`.

```typescript
const redirects = await site.redirects.getRedirects({ type: "standard" });
```

`RedirectKind` — это `'standard'` или `'geo'`. `RedirectTypeCode` — число `301`, `302` или `200`.

`Redirect` — это `{ id, type, enabled, fromAllPages, regularFromPage, fromPage, toPage, redirectType, saveQuery, sortIndex, country?, language? }`.

Условие (`country` или `language`) — это `{ enabled, exclude, list }`. `list` — массив строк.

## `getRedirects`

Возвращает редиректы сайта.

`GET /sites/{siteId}/redirects`

```typescript
const redirects = await site.redirects.getRedirects({ type: "standard" });
```

**Вход**

| Поле   | Тип                      | Описание                                      |
| ------ | ------------------------ | --------------------------------------------- |
| `type` | `'standard' \| 'geo'`    | Какие редиректы вернуть. Необязательно        |

**Ответ**

| Поле   | Тип          | Описание                    |
| ------ | ------------ | --------------------------- |
| `list` | `Redirect[]` | Редиректы. Поля в абзаце выше |

## `getRedirect`

Возвращает один редирект.

`GET /sites/{siteId}/redirects/{redirectId}`

```typescript
const redirect = await site.redirects.getRedirect(redirectId);
```

**Вход**

| Поле         | Тип      | Описание    |
| ------------ | -------- | ----------- |
| `redirectId` | `number` | Id редиректа |

**Ответ** `Redirect`. Поля в абзаце выше.

## `createRedirect`

Создаёт редирект.

`POST /sites/{siteId}/redirects`

```typescript
const redirect = await site.redirects.createRedirect({
  type: "standard",
  toPage: "/new",
});
```

**Вход**

| Поле              | Тип                    | Описание                                      |
| ----------------- | ---------------------- | --------------------------------------------- |
| `type`            | `'standard' \| 'geo'`  | Вид редиректа. Обязательно                    |
| `toPage`          | `string`               | Куда вести. Обязательно                       |
| `enabled`         | `boolean`              | Включён. Необязательно                        |
| `fromAllPages`    | `boolean`              | Со всех страниц. Необязательно                |
| `regularFromPage` | `boolean`              | `fromPage` — регулярное выражение. Необязательно |
| `fromPage`        | `string`               | Откуда. Необязательно                         |
| `redirectType`    | `301 \| 302 \| 200`    | Код. Необязательно                            |
| `saveQuery`       | `boolean`              | Сохранять query. Необязательно                |
| `country`         | `{ enabled, exclude, list }` | Условие по стране. Необязательно        |
| `language`        | `{ enabled, exclude, list }` | Условие по языку. Необязательно         |

**Ответ** `Redirect`. Поля в абзаце выше.

## `updateRedirect`

Меняет редирект. В патче необязательно любое поле создания, включая `type` и `toPage`.

`PATCH /sites/{siteId}/redirects/{redirectId}`

```typescript
const redirect = await site.redirects.updateRedirect(redirectId, { toPage: "/other" });
```

**Вход**

| Поле         | Тип      | Описание                                      |
| ------------ | -------- | --------------------------------------------- |
| `redirectId` | `number` | Id редиректа                                  |
| патч         | объект   | Любые поля создания, все необязательны        |

**Ответ** `Redirect`. Поля в абзаце выше.

## `deleteRedirect`

Удаляет редирект.

`DELETE /sites/{siteId}/redirects/{redirectId}`

```typescript
await site.redirects.deleteRedirect(redirectId);
```

**Вход**

| Поле         | Тип      | Описание     |
| ------------ | -------- | ------------ |
| `redirectId` | `number` | Id редиректа |

**Ответ**

Тела нет.

## `replaceRedirects`

Заменяет весь список редиректов одного типа. Передайте каждый редирект, который нужно оставить. Элемент без `id` создаётся. Существующий id, который вы не передали, удаляется. Порядок массива становится `sortIndex`. `type` берётся из пути.

`PUT /sites/{siteId}/redirects/{type}`

```typescript
const redirects = await site.redirects.replaceRedirects("standard", [
  { toPage: "/new" },
]);
```

**Вход**

| Поле    | Тип                      | Описание                                      |
| ------- | ------------------------ | --------------------------------------------- |
| `type`  | `'standard' \| 'geo'`    | Какой список заменить                         |
| `items` | `ReplaceRedirectItem[]`  | Редиректы, которые должны остаться. Тело — `{ items }` |

**Ответ**

| Поле   | Тип          | Описание                         |
| ------ | ------------ | -------------------------------- |
| `list` | `Redirect[]` | Список после замены              |
