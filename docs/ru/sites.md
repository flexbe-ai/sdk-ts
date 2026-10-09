# Клиент → Сайты

Сайт — это проект. `client.sites` показывает и создаёт проекты. `client.getSiteApi(siteId)` — класс для работы с одним проектом. Как создать клиент — в разделе [С чего начать](README.md).

```typescript
const client = new FlexbeClient({ apiKey: "your-api-key" });
const sites = await client.sites.list();
const site = client.getSiteApi(sites.list[0].id);
```

### `Site`

Проект.

| Поле           | Тип                                                   | Описание                            |
| -------------- | ----------------------------------------------------- | ----------------------------------- |
| `id`           | `number`                                              | Id проекта                          |
| `accountId`    | `number`                                              | Аккаунт владельца                   |
| `name`         | `string \| null`                                      | Название                            |
| `isDraft`      | `boolean`                                             | Черновик                            |
| `createdAt`    | `string`                                              | Когда создан                        |
| `role`         | `'owner' \| 'admin' \| 'editor' \| 'manager' \| null` | Роль текущего пользователя на сайте |
| `access`       | `'owner' \| 'share'`                                  | Свой сайт или доступ по шарингу     |
| `domainUrl`    | `string \| null`                                      | URL основного домена                |
| `domainTitle`  | `string \| null`                                      | Имя основного домена для показа     |
| `domainIsTech` | `boolean \| null`                                     | Основной домен технический          |

---

## `list`

Возвращает проекты, доступные этому ключу.

`GET /sites`

```typescript
const sites = await client.sites.list({ offset: 0, limit: 20 });
```

**Вход**

| Поле        | Тип       | Описание                                                        |
| ----------- | --------- | --------------------------------------------------------------- |
| `offset`    | `number`  | Сколько проектов пропустить. Необязательно                      |
| `limit`     | `number`  | Сколько проектов вернуть. Необязательно                         |
| `accountId` | `number`  | Только проекты этого аккаунта. Необязательно                    |
| `isDraft`   | `boolean` | Черновик или нет. В query `"true"` или `"false"`. Необязательно |

**Ответ**

| Поле                | Тип      | Описание        |
| ------------------- | -------- | --------------- |
| `list`              | `Site[]` | [`Site`](#site) |
| `pagination.limit`  | `number` | Размер страницы |
| `pagination.offset` | `number` | Смещение        |
| `pagination.total`  | `number` | Всего записей   |

## `create`

Создаёт пустой проект на аккаунте вызывающего. Если аккаунт уже упёрся в лимит тарифа, API отвечает 409.

`POST /sites`

```typescript
const created = await client.sites.create({ name: "Магазин", isDraft: true });
```

**Вход**

| Поле      | Тип       | Описание                          |
| --------- | --------- | --------------------------------- |
| `name`    | `string`  | Название. Необязательно           |
| `isDraft` | `boolean` | Создать черновиком. Необязательно |

**Ответ** [`Site`](#site).

## `getApi`

Возвращает объект `site` для одного проекта. Сетевого запроса нет. `client.getSiteApi(siteId)` — то же самое.

```typescript
const site = client.sites.getApi(siteId);
```

**Вход**

| Поле     | Тип      | Описание   |
| -------- | -------- | ---------- |
| `siteId` | `number` | Id проекта |

**Ответ** `SiteApi`. Объект с ресурсами сайта: страницы, домены, заявки и остальные разделы.

## Сайт

## `get`

Возвращает этот проект.

`GET /sites/{siteId}`

```typescript
const project = await site.get();
```

**Вход**

Параметров нет.

**Ответ** [`Site`](#site).

## `update`

Меняет название или признак черновика.

`PATCH /sites/{siteId}`

```typescript
const project = await site.update({ name: "Новое имя" });
```

**Вход**

| Поле      | Тип       | Описание                |
| --------- | --------- | ----------------------- |
| `name`    | `string`  | Название. Необязательно |
| `isDraft` | `boolean` | Черновик. Необязательно |

**Ответ** [`Site`](#site).

## `buildHtml`

Собирает один HTML-блок.

`POST /sites/{siteId}/html/build`

```typescript
const built = await site.buildHtml({
  sources: { html: "<div></div>", css: "div { color: red }" },
});
```

**Вход**

| Поле              | Тип                      | Описание                                                               |
| ----------------- | ------------------------ | ---------------------------------------------------------------------- |
| `sources.html`    | `string`                 | HTML блока. Необязательно                                              |
| `sources.js`      | `string`                 | Скрипт. Необязательно                                                  |
| `sources.css`     | `string`                 | Стили. Необязательно                                                   |
| `sources.modules` | `PageCodeModule[]`       | Модули `{ id, path, content }`. Необязательно                          |
| `scopeCss`        | `boolean`                | Обернуть CSS в `:scope`. По умолчанию да                               |
| `dependencies`    | `Record<string, string>` | Имя пакета и версия. Необязательно. Подменяет встроенные пины          |
| `external`        | `string[]`               | Принимается и не используется. Голый импорт пакета возвращается чанком |

`PageCodeModule` — это `{ id, path, content }`, все три строки.

**Ответ**

| Поле        | Тип                                     | Описание                                    |
| ----------- | --------------------------------------- | ------------------------------------------- |
| `html`      | `string`                                | Собранный HTML                              |
| `js`        | `string`                                | Собранный скрипт острова                    |
| `css`       | `string`                                | Собранные стили                             |
| `utilities` | `string`                                | Служебный CSS                               |
| `chunks`    | `{ specifier: string, code: string }[]` | По одному собранному файлу на модуль пакета |
| `errors`    | `{ text: string }[]`                    | Ошибки сборки                               |
| `warnings`  | `{ text: string }[]`                    | Предупреждения                              |

Голый импорт вроде `react` или `left-pad` не попадает в `js`. Сборка скачивает пакет с CDN и возвращает каждый его файл отдельным чанком. `js` импортирует чанк по `specifier`. Это путь CDN без query, поэтому встроенный пин React даёт `react@19.3.0/jsx-runtime`.

`dependencies` подменяет пин у названных пакетов. `{ react: "18.2.0" }` скачивает React 18.2.0. Пакет, которого в `dependencies` нет, остаётся на встроенном пине: `react`, `react-dom` и `react-is` — `19.3.0`, `preact` — `10.29.8`, `lodash` и `lodash-es` — `4.18.1`.

Файлы из `sources.modules` остаются внутри `js`. Импорт `https://` и путь сайта (`/img`, `/_s`, `/files`) остаются как написаны, сборка их не скачивает.

Та же карта `dependencies` может лежать на острове, в `data.data.dependencies`. Сборка страницы читает её оттуда. `buildHtml` принимает карту в теле запроса.

Сохранённый код элемента в версии страницы — это `PageCode`, у него тоже может быть `utilities`. Чанки в `PageCode` пока не пишутся. Форма описана в разделе [Данные страницы](page-data.md).

## Аккаунт

```typescript
const account = client.account(accountId);
```

| Поле      | Описание                      |
| --------- | ----------------------------- |
| `domains` | [Домены](domains.md) аккаунта |
