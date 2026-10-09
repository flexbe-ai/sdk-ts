# Сайты

Сайт — это проект. `client.sites` показывает и создаёт проекты. `client.getSiteApi(siteId)` открывает один проект и даёт его ресурсы. Как создать клиент — в разделе [С чего начать](getting-started.md).

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

| Поле        | Тип       | Как уходит                               |
| ----------- | --------- | ---------------------------------------- |
| `offset`    | `number`  | query `offset`                           |
| `limit`     | `number`  | query `limit`                            |
| `accountId` | `number`  | query `accountId`                        |
| `isDraft`   | `boolean` | query `isDraft` (`"true"` или `"false"`) |

Возвращает `{ list: Site[], pagination }`. `pagination` — это `{ limit, offset, total }`.

### `create`

`POST /sites`

```typescript
create(params?: CreateSiteParams): Promise<Site>
```

Создаёт пустой проект на аккаунте вызывающего. `name` и `isDraft` необязательны. Если аккаунт уже упёрся в лимит тарифа, API отвечает 409.

### `getApi`

```typescript
getApi(siteId: number): SiteApi
```

Возвращает новый `SiteApi`. Сетевого запроса нет. `client.getSiteApi` — это этот метод.

## `Site`

| Поле           | Тип                                                   |
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

`UpdateSiteParams` — это `{ name?: string; isDraft?: boolean }`.

### `buildHtml`

`POST /sites/{siteId}/html/build`

Собирает один HTML-блок.

```typescript
buildHtml(body: BuildHtmlParams): Promise<BuildHtmlResult>
```

| Поле              | Тип                               |
| ----------------- | --------------------------------- |
| `sources.html`    | `string`, необязательно           |
| `sources.js`      | `string`, необязательно           |
| `sources.css`     | `string`, необязательно           |
| `sources.modules` | `PageCodeModule[]`, необязательно |
| `scopeCss`        | `boolean`, необязательно          |
| `external`        | `string[]`, необязательно         |

`PageCodeModule` — это `{ id, path, content }`, все три строки.

Результат — `{ html, js, css, utilities, errors, warnings }`. `utilities` — строка. `errors` и `warnings` — `{ text: string }[]`.

Сохранённый код элемента в версии страницы — это `PageCode`, у него тоже может быть `utilities`. Форма описана в разделе [Данные страницы](page-data.md).

## Аккаунт

```typescript
const account = client.account(accountId);
```

`account.domains` — список доменов аккаунта. См. [Домены](domains.md).
