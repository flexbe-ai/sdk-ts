# site > Страницы

`site.pages` закрывает карточки страниц, папки и версии. JSON макета внутри версии — в разделе [Данные страницы](page-data.md). HTML-блок собирает `site.buildHtml`, это описано в разделе [Сайты](sites.md).

```typescript
const site = client.getSiteApi(siteId);
const pages = await site.pages.getPages({ limit: 10, offset: 0 });
```

Пути ниже лежат на `/sites/{siteId}`.

`Page` — это карточка: имя, адрес, статус. Макет приходит в `PageVersionDataResponse.data`.

## Карточка страницы

| Поле                | Тип                         | Описание                                                         |
| ------------------- | --------------------------- | ---------------------------------------------------------------- |
| `id`                | `number`                    | Id страницы                                                      |
| `versionId`         | `number \| null`            | Id текущей версии                                                |
| `editorVersionId`   | `number \| null`            | Последняя версия, открытая в редакторе. `null` у старых страниц  |
| `type`              | `PageType`                  | Вид страницы: обычная, глобальная, товар и другие                |
| `status`            | `PageStatus`                | `published`, `drafted`, `removed` или `deleted`                  |
| `name`              | `string`                    | Название                                                         |
| `uri`               | `string \| null`            | Адрес                                                            |
| `language`          | `string`                    | Язык страницы                                                    |
| `folderId`          | `number`                    | Папка                                                            |
| `sortIndex`         | `number`                    | Порядок в списке                                                 |
| `themeId`           | `number`                    | Тема                                                             |
| `updatedAt`         | `string`                    | Когда карточку меняли                                            |
| `deletedAt`         | `string \| null`            | Когда удалили. `null`, если страница на месте                    |
| `screenshot`        | объект или `null`           | Превью                                                           |
| `screenshot.id`     | `number \| null`            | Id картинки превью                                               |
| `screenshot.ext`    | `string`                    | Расширение                                                       |
| `screenshot.url`    | `string \| null`            | Адрес превью                                                     |
| `meta`              | `PageMeta \| null`          | SEO страницы                                                     |
| `meta.title`        | `string \| null`            | Заголовок                                                        |
| `meta.description`  | `string \| null`            | Описание                                                         |
| `meta.keywords`     | `string \| null`            | Ключевые слова                                                   |
| `meta.ogImage`      | `string \| null`            | Картинка Open Graph                                              |
| `meta.ogTitle`      | `string \| null`            | Заголовок Open Graph                                             |
| `meta.ogDescription`| `string \| null`            | Описание Open Graph                                              |
| `meta.noindex`      | `boolean`                   | Закрыть страницу от индексации                                   |
| `meta.schemaMarkup` | объект или `null`           | Разметка schema.org, необязательно                               |

`PageType`: `page`, `file`, `global`, `ai`, `cms`, `ecommerce_product`, `ecommerce_category`.

`PageStatus`: `published`, `drafted`, `removed`, `deleted`.

`PageMeta`: `title`, `description`, `keywords`, `ogImage`, `ogTitle`, `ogDescription`, `noindex` и необязательный `schemaMarkup` (`data`, `updatedAt`, необязательный `genProducts`).

## `getPages`

Возвращает список страниц сайта.

`GET /sites/{siteId}/pages`

```typescript
const pages = await site.pages.getPages({ offset: 0, limit: 20 });
```

**Вход**

| Поле       | Тип                          | Описание                                                      |
| ---------- | ---------------------------- | ------------------------------------------------------------- |
| `offset`   | `number`                     | Сколько элементов пропустить. По умолчанию 0                  |
| `limit`    | `number`                     | Сколько вернуть. По умолчанию 100                             |
| `type`     | `PageType` или массив        | Один тип или несколько. Массив уходит строкой через запятую   |
| `status`   | `PageStatus` или массив      | Один статус или несколько, та же запятая                      |
| `uri`      | `string`                     | Точное совпадение с `'/'` или частичное, например `'%word%'`  |
| `folderId` | `number`                     | Id папки                                                      |
| `themeId`  | `number`                     | Id темы                                                       |

**Ответ**

| Поле                | Тип      | Описание                    |
| ------------------- | -------- | --------------------------- |
| `list`              | `Page[]` | Страницы. Поля в таблице выше |
| `pagination.limit`  | `number` | Размер страницы             |
| `pagination.offset` | `number` | Смещение                    |
| `pagination.total`  | `number` | Всего записей               |

## `getPage`

Возвращает одну страницу.

`GET /sites/{siteId}/pages/{pageId}`

```typescript
const page = await site.pages.getPage(pageId);
```

**Вход**

| Поле     | Тип      | Описание    |
| -------- | -------- | ----------- |
| `pageId` | `number` | Id страницы |

**Ответ** `Page`. Поля в таблице выше.

## `createPage`

Создаёт страницу. `type` может быть `page` или `global`. Не передавайте его или передайте `page`, чтобы склонировать шаблон или исходную страницу. Передайте `global`, чтобы отправить макет в теле.

`POST /sites/{siteId}/pages`

```typescript
const page = await site.pages.createPage({ templateId: 12, name: "О нас" });
```

**Вход**

| Поле           | Тип              | Описание                                      |
| -------------- | ---------------- | --------------------------------------------- |
| `templateId`   | `number`         | Шаблон для клона                              |
| `sourcePageId` | `number`         | Страница для клона                            |
| `name`         | `string`         | Название. Необязательно                       |
| `uri`          | `string`         | Адрес. Необязательно                          |
| `folderId`     | `number \| null` | Папка                                         |
| `themeId`      | `number \| null` | Тема                                          |
| `is`           | `string`         | Тип сущности макета. Только при `type: 'global'` |
| `template_id`  | `string`         | Шаблон макета. Только при `type: 'global'`    |
| `blocks`       | массив           | Блоки макета. Только при `type: 'global'`     |
| `modals`       | массив           | Модалки макета. Только при `type: 'global'`   |
| `widgets`      | массив           | Виджеты макета. Только при `type: 'global'`   |

**Ответ** `Page`. Поля в таблице выше.

## `createPageFromAi`

Создаёт страницу из уже готового AI-макета.

`POST /sites/{siteId}/pages/from-ai`

```typescript
const page = await site.pages.createPageFromAi({ pageUUID: "…" });
```

**Вход**

| Поле       | Тип      | Описание          |
| ---------- | -------- | ----------------- |
| `pageUUID` | `string` | Id готового макета |

**Ответ** `Page`. Поля в таблице выше.

## `copyPage`

Копирует одну страницу.

`POST /sites/{siteId}/pages/{pageId}/copy`

```typescript
const copy = await site.pages.copyPage(pageId, { name: "Копия" });
```

**Вход**

| Поле           | Тип              | Описание                         |
| -------------- | ---------------- | -------------------------------- |
| `pageId`       | `number`         | Какую страницу копировать        |
| `name`         | `string`         | Название копии. Обязательно      |
| `uri`          | `string`         | Адрес копии. Необязательно       |
| `folderId`     | `number \| null` | Папка. Необязательно             |
| `targetSiteId` | `number`         | Копия на другой сайт. Необязательно |

**Ответ** `Page`. Поля в таблице выше.

## `copyPages`

Копирует несколько страниц.

`POST /sites/{siteId}/pages/copy`

```typescript
const copied = await site.pages.copyPages({ pageIds: [1, 2] });
```

**Вход**

| Поле           | Тип        | Описание                         |
| -------------- | ---------- | -------------------------------- |
| `pageIds`      | `number[]` | Какие страницы копировать        |
| `folderId`     | `number`   | Папка для копий. Необязательно   |
| `targetSiteId` | `number`   | Копии на другой сайт. Необязательно |

**Ответ**

| Поле     | Тип      | Описание |
| -------- | -------- | -------- |
| `pages`  | `Page[]` | Копии    |

## `updatePage`

Меняет страницу.

`PUT /sites/{siteId}/pages/{pageId}`

```typescript
const page = await site.pages.updatePage(pageId, { name: "Новое имя" });
```

**Вход**

| Поле              | Тип          | Описание                                                                                                                        |
| ----------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `pageId`          | `number`     | Id страницы                                                                                                                     |
| `status`          | `PageStatus` | Новый статус                                                                                                                    |
| `versionId`       | `number`     | Делает эту версию текущей                                                                                                       |
| `editorVersionId` | `number`     | Ставит указатель редактора и не публикует                                                                                       |
| `name`            | `string`     | Название, до 150 символов                                                                                                       |
| `uri`             | `string`     | Адрес, до 255 символов. API нормализует слэш в начале и в конце                                                                 |
| `language`        | `string`     | Язык страницы                                                                                                                   |
| `folderId`        | `number`     | Папка                                                                                                                           |
| `sortIndex`       | `number`     | Порядок в списке                                                                                                                |
| `meta`            | `PageMeta`   | Частичный. Заголовок и Open Graph title: 200 символов. Описание, keywords и Open Graph description: 1000 символов                |

**Ответ** `Page`. Поля в таблице выше.

## `deletePage`

Удаляет страницу.

`DELETE /sites/{siteId}/pages/{pageId}`

```typescript
await site.pages.deletePage(pageId);
```

**Вход**

| Поле     | Тип      | Описание    |
| -------- | -------- | ----------- |
| `pageId` | `number` | Id страницы |

**Ответ**

Тела нет.

## `bulkUpdatePages`

Меняет несколько страниц. Если не прошёл ни один элемент, API отвечает 400.

`PATCH /sites/{siteId}/pages`

```typescript
const result = await site.pages.bulkUpdatePages([{ id: pageId, name: "Новое имя" }]);
```

**Вход**

Тело — сам массив. Каждый элемент — поля `updatePage` плюс `id` страницы.

**Ответ**

| Поле      | Тип                  | Описание                    |
| --------- | -------------------- | --------------------------- |
| `updated` | `Page[]`             | Страницы, которые изменились |
| `errors`  | `{ id, code, message }[]` | Что не изменилось      |

## `bulkDeletePages`

Удаляет несколько страниц. Если не удалился ни один id, API отвечает 400.

`DELETE /sites/{siteId}/pages`

```typescript
const result = await site.pages.bulkDeletePages([pageId]);
```

**Вход**

| Поле  | Тип        | Описание          |
| ----- | ---------- | ----------------- |
| `ids` | `number[]` | Id страниц. Тело — `{ ids }` |

**Ответ**

| Поле      | Тип                  | Описание              |
| --------- | -------------------- | --------------------- |
| `deleted` | `number[]`           | Id, которые удалились |
| `errors`  | `{ id, code, message }[]` | Что не удалилось |

## Папки

Папка — `{ id, name, sortIndex }`.

### `getFolders`

Возвращает папки сайта.

`GET /sites/{siteId}/pages-folders`

```typescript
const folders = await site.pages.getFolders();
```

**Вход**

Параметров нет.

**Ответ**

| Поле   | Тип            | Описание |
| ------ | -------------- | -------- |
| `list` | `PageFolder[]` | Папки. У папки `id`, `name`, `sortIndex` |

### `getFolder`

Возвращает одну папку.

`GET /sites/{siteId}/pages-folders/{id}`

```typescript
const folder = await site.pages.getFolder(folderId);
```

**Вход**

| Поле | Тип      | Описание |
| ---- | -------- | -------- |
| `id` | `number` | Id папки |

**Ответ** `PageFolder`: `id`, `name`, `sortIndex`.

### `createFolder`

Создаёт папку.

`POST /sites/{siteId}/pages-folders`

```typescript
const folder = await site.pages.createFolder({ name: "Услуги" });
```

**Вход**

| Поле        | Тип      | Описание                              |
| ----------- | -------- | ------------------------------------- |
| `name`      | `string` | Название, не длиннее 50 символов. Обязательно |
| `sortIndex` | `number` | Порядок, от 0. Необязательно          |

**Ответ** `PageFolder`: `id`, `name`, `sortIndex`.

### `updateFolder`

Меняет папку. `name` и `sortIndex` оба необязательны.

`PATCH /sites/{siteId}/pages-folders/{id}`

```typescript
const folder = await site.pages.updateFolder(folderId, { name: "Новое имя" });
```

**Вход**

| Поле        | Тип      | Описание                     |
| ----------- | -------- | ---------------------------- |
| `id`        | `number` | Id папки                     |
| `name`      | `string` | Название. Необязательно      |
| `sortIndex` | `number` | Порядок. Необязательно       |

**Ответ** `PageFolder`: `id`, `name`, `sortIndex`.

### `deleteFolder`

Удаляет папку и её содержимое.

`DELETE /sites/{siteId}/pages-folders/{id}`

```typescript
await site.pages.deleteFolder(folderId);
```

**Вход**

| Поле | Тип      | Описание |
| ---- | -------- | -------- |
| `id` | `number` | Id папки |

**Ответ**

Тела нет.

### `bulkUpdateFolders`

Меняет несколько папок. Если не прошла ни одна, API отвечает 400.

`PATCH /sites/{siteId}/pages-folders`

```typescript
const result = await site.pages.bulkUpdateFolders([{ id: folderId, name: "Новое имя" }]);
```

**Вход**

Тело — сам массив. Каждый элемент — `{ id, name?, sortIndex? }`.

**Ответ**

| Поле      | Тип                  | Описание                 |
| --------- | -------------------- | ------------------------ |
| `updated` | `PageFolder[]`       | Папки, которые изменились |
| `errors`  | `{ id, code, message }[]` | Что не изменилось   |

## Версии

### `getVersions`

Возвращает версии страницы.

`GET /sites/{siteId}/pages/{pageId}/versions`

```typescript
const versions = await site.pages.getVersions(pageId);
```

**Вход**

| Поле     | Тип      | Описание    |
| -------- | -------- | ----------- |
| `pageId` | `number` | Id страницы |

**Ответ**

| Поле            | Тип       | Описание                                              |
| --------------- | --------- | ----------------------------------------------------- |
| `list`          | массив    | Версии                                                |
| `list[].id`     | `number`  | Id версии                                             |
| `list[].createdAt` | `string` | Когда создана                                      |
| `list[].isDraft`| `boolean` | Версию ещё ни разу не публиковали                     |

### `getVersion`

Возвращает одну версию вместе с макетом. `'published'` — публичная версия. `'editor'` — это `editorVersionId`, а если указателя нет, публичная версия.

`GET /sites/{siteId}/pages/{pageId}/versions/{versionId}`

```typescript
const version = await site.pages.getVersion(pageId, "published");
```

**Вход**

| Поле        | Тип                              | Описание                          |
| ----------- | -------------------------------- | --------------------------------- |
| `pageId`    | `number`                         | Id страницы                       |
| `versionId` | `number \| 'published' \| 'editor'` | Id версии или одно из двух слов |

**Ответ**

| Поле      | Тип                 | Описание                                              |
| --------- | ------------------- | ----------------------------------------------------- |
| `id`      | `number`            | Id версии                                             |
| `createdAt` | `string`          | Когда создана                                         |
| `isDraft` | `boolean`           | Версию ещё ни разу не публиковали                     |
| `data`    | `PageDataStructure` | Макет. Форма в разделе [Данные страницы](page-data.md) |
| `abtests` | массив              | A/B-тесты версии. Необязательно                       |

### `getPublishedVersion`

Возвращает публичную версию. Это `getVersion(pageId, 'published')`.

```typescript
const version = await site.pages.getPublishedVersion(pageId);
```

**Вход**

| Поле     | Тип      | Описание    |
| -------- | -------- | ----------- |
| `pageId` | `number` | Id страницы |

**Ответ** тот же, что у `getVersion`.

### `createVersion`

Создаёт версию страницы. Если `publish` не передан, API публикует версию.

`POST /sites/{siteId}/pages/{pageId}/versions`

```typescript
const version = await site.pages.createVersion(pageId, { data: layout });
```

**Вход**

| Поле                | Тип                 | Описание                                              |
| ------------------- | ------------------- | ----------------------------------------------------- |
| `pageId`            | `number`            | Id страницы                                           |
| `data`              | `PageDataStructure` | JSON макета. Обязательно                              |
| `assets.images`     | `number[]`          | Id картинок, которые использует версия                |
| `assets.files`      | `string[]`          | Пути файлов версии                                    |
| `assets.screenshot` | `number \| null`    | Id превью версии                                      |
| `publish`           | `boolean`           | Опубликовать сразу. Если не передан, API публикует    |

**Ответ** тот же, что у `getVersion`.
