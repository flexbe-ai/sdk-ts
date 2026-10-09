# Сайт → Редиректы

`site.redirects` показывает и меняет редиректы одного сайта.

```typescript
const redirects = await site.redirects.getRedirects({ type: "standard" });
```

## `RedirectKind`

| Значение | Описание |
| --- | --- |
| `standard` | Обычный редирект |
| `geo` | По стране или языку |

## `RedirectTypeCode`

| Значение | Описание |
| --- | --- |
| `301` | Постоянный |
| `302` | Временный |
| `200` | Прозрачный |

## `RedirectCondition`

Условие по стране или языку.

| Поле | Тип | Описание |
| --- | --- | --- |
| `enabled` | `boolean` | Условие включено |
| `exclude` | `boolean` | Исключить значения из `list` |
| `list` | `string[]` | Страны или языки |

## `Redirect`

Редирект сайта.

| Поле | Тип | Описание |
| --- | --- | --- |
| `id` | `number` | Id редиректа |
| `type` | [`RedirectKind`](#redirectkind) | Вид |
| `enabled` | `boolean` | Включён |
| `fromAllPages` | `boolean` | Со всех страниц |
| `regularFromPage` | `boolean` | `fromPage` — регулярное выражение |
| `fromPage` | `string` | Откуда |
| `toPage` | `string` | Куда |
| `redirectType` | [`RedirectTypeCode`](#redirecttypecode) | Код |
| `saveQuery` | `boolean` | Сохранять query |
| `sortIndex` | `number` | Порядок |
| `country` | [`RedirectCondition`](#redirectcondition) | Условие по стране. Необязательно |
| `language` | [`RedirectCondition`](#redirectcondition) | Условие по языку. Необязательно |

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
| `list` | [`Redirect[]`](#redirect) | Редиректы |

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

**Ответ** [`Redirect`](#redirect).

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
| `country`         | [`RedirectCondition`](#redirectcondition) | Условие по стране. Необязательно |
| `language`        | [`RedirectCondition`](#redirectcondition) | Условие по языку. Необязательно |

**Ответ** [`Redirect`](#redirect).

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

**Ответ** [`Redirect`](#redirect).

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
| `items` | `ReplaceRedirectItem[]`  | Редиректы, которые должны остаться |

**Ответ**

| Поле   | Тип          | Описание                         |
| ------ | ------------ | -------------------------------- |
| `list` | [`Redirect[]`](#redirect) | Список после замены |
