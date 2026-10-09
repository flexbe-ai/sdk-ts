# Страницы

`site.pages` закрывает карточки страниц, папки и версии. JSON макета внутри версии — в разделе [Данные страницы](page-data.md). HTML-блок собирает `site.buildHtml`, это описано в разделе [Сайты](sites.md).

```typescript
const site = client.getSiteApi(siteId);
const pages = await site.pages.getPages({ limit: 10, offset: 0 });
```

Пути ниже лежат на `/sites/{siteId}`.

`Page` — это карточка: имя, адрес, статус. Макет приходит в `PageVersionDataResponse.data`.

## Карточка страницы

| Поле              | Тип                                                                               |
| ----------------- | --------------------------------------------------------------------------------- |
| `id`              | `number`                                                                          |
| `versionId`       | `number \| null`                                                                  |
| `editorVersionId` | `number \| null`. Последняя версия, открытая в редакторе. `null` у старых страниц |
| `type`            | `PageType`                                                                        |
| `status`          | `PageStatus`                                                                      |
| `name`            | `string`                                                                          |
| `uri`             | `string \| null`                                                                  |
| `language`        | `string`                                                                          |
| `folderId`        | `number`                                                                          |
| `sortIndex`       | `number`                                                                          |
| `themeId`         | `number`                                                                          |
| `updatedAt`       | `string`                                                                          |
| `deletedAt`       | `string \| null`                                                                  |
| `screenshot`      | `{ id, ext, url } \| null`                                                        |
| `meta`            | `PageMeta \| null`                                                                |

`PageType`: `page`, `file`, `global`, `ai`, `cms`, `ecommerce_product`, `ecommerce_category`.

`PageStatus`: `published`, `drafted`, `removed`, `deleted`.

`PageMeta`: `title`, `description`, `keywords`, `ogImage`, `ogTitle`, `ogDescription`, `noindex` и необязательный `schemaMarkup` (`data`, `updatedAt`, необязательный `genProducts`).

## `getPages`

`GET /sites/{siteId}/pages`

```typescript
getPages(params?: GetPagesParams): Promise<PageListResponse>
```

Возвращает `{ list, pagination }`, где `pagination` — `{ limit, offset, total }`.

| Поле       | Примечание                                                      |
| ---------- | --------------------------------------------------------------- |
| `offset`   | Сколько элементов пропустить. По умолчанию 0                    |
| `limit`    | По умолчанию 100                                                |
| `type`     | Один `PageType` или массив. Массив уходит строкой через запятую |
| `status`   | Один `PageStatus` или массив, та же запятая                     |
| `uri`      | Точное совпадение с `'/'` или частичное, например `'%word%'`    |
| `folderId` | Id папки                                                        |
| `themeId`  | Id темы                                                         |

## `getPage`

`GET /sites/{siteId}/pages/{pageId}`

```typescript
getPage(pageId: number): Promise<Page>
```

## `createPage`

`POST /sites/{siteId}/pages`

```typescript
createPage(data: CreatePageParams): Promise<Page>
```

`type` может быть `PageType.PAGE` или `PageType.GLOBAL`. Не передавайте его или передайте `page`, чтобы склонировать шаблон или исходную страницу. Передайте `global`, чтобы отправить макет в теле.

| Поле                          | Примечание                          |
| ----------------------------- | ----------------------------------- |
| `templateId`                  | Шаблон для клона                    |
| `sourcePageId`                | Страница для клона                  |
| `name`, `uri`                 | Необязательные поля карточки        |
| `folderId`, `themeId`         | `number \| null`                    |
| `is`, `template_id`           | Поля макета при `type: 'global'`    |
| `blocks`, `modals`, `widgets` | Массивы макета при `type: 'global'` |

## `createPageFromAi`

`POST /sites/{siteId}/pages/from-ai`

```typescript
createPageFromAi(data: CreatePageFromAiParams): Promise<Page>
```

`CreatePageFromAiParams` — это `{ pageUUID: string }`.

## `copyPage`

`POST /sites/{siteId}/pages/{pageId}/copy`

```typescript
copyPage(pageId: number, data: CopyPageParams): Promise<Page>
```

| Поле           | Обязательно | Примечание           |
| -------------- | ----------- | -------------------- |
| `name`         | да          |                      |
| `uri`          | нет         |                      |
| `folderId`     | нет         | `number \| null`     |
| `targetSiteId` | нет         | Копия на другой сайт |

## `copyPages`

`POST /sites/{siteId}/pages/copy`

```typescript
copyPages(data: CopyPagesParams): Promise<CopyPagesResponse>
```

`CopyPagesParams` — это `{ pageIds, folderId?, targetSiteId? }`. Ответ — `{ pages: Page[] }`.

## `updatePage`

`PUT /sites/{siteId}/pages/{pageId}`

```typescript
updatePage(pageId: number, data: UpdatePageParams): Promise<Page>
```

| Поле              | Лимит                                                                                                                        |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `status`          | `PageStatus`                                                                                                                 |
| `versionId`       | Делает эту версию текущей                                                                                                    |
| `editorVersionId` | Ставит указатель редактора и не публикует                                                                                    |
| `name`            | 150 символов                                                                                                                 |
| `uri`             | 255 символов. API нормализует слэш в начале и в конце                                                                        |
| `language`        |                                                                                                                              |
| `folderId`        |                                                                                                                              |
| `sortIndex`       |                                                                                                                              |
| `meta`            | Частичный `PageMeta`. Заголовок и Open Graph title: 200 символов. Описание, keywords и Open Graph description: 1000 символов |

## `deletePage`

`DELETE /sites/{siteId}/pages/{pageId}`

```typescript
deletePage(pageId: number): Promise<void>
```

## `bulkUpdatePages`

`PATCH /sites/{siteId}/pages`

```typescript
bulkUpdatePages(updates: BulkUpdatePageItem[]): Promise<BulkUpdateResponse>
```

Тело — сам массив. Каждый элемент — `UpdatePageParams` плюс `id` (id страницы). Возвращает `{ updated: Page[], errors: FlexbeBulkError[] }`. Если не прошёл ни один элемент, API отвечает 400.

## `bulkDeletePages`

`DELETE /sites/{siteId}/pages`

```typescript
bulkDeletePages(ids: number[]): Promise<BulkDeleteResponse>
```

Тело — `{ ids }`. Возвращает `{ deleted: number[], errors }`. Каждая ошибка — `{ id, code, message }`. Если не удалился ни один id, API отвечает 400.

## Папки

Папка — это `{ id, name, sortIndex }`. `getFolders` возвращает `{ list }`.

| Метод               | HTTP                         | Сигнатура                                                              |
| ------------------- | ---------------------------- | ---------------------------------------------------------------------- |
| `getFolders`        | `GET /pages-folders`         | `(): Promise<PageFolderListResponse>`                                  |
| `getFolder`         | `GET /pages-folders/{id}`    | `(id: number): Promise<PageFolder>`                                    |
| `createFolder`      | `POST /pages-folders`        | `(data: CreateFolderParams): Promise<PageFolder>`                      |
| `updateFolder`      | `PATCH /pages-folders/{id}`  | `(id: number, data: UpdateFolderParams): Promise<PageFolder>`          |
| `deleteFolder`      | `DELETE /pages-folders/{id}` | `(id: number): Promise<void>`                                          |
| `bulkUpdateFolders` | `PATCH /pages-folders`       | `(updates: BulkUpdateFolderItem[]): Promise<BulkUpdateFolderResponse>` |

`CreateFolderParams` требует `name` (не длиннее 50 символов) и принимает необязательный `sortIndex` от 0. В `UpdateFolderParams` оба поля необязательны.

`deleteFolder` удаляет и содержимое папки.

`bulkUpdateFolders` отправляет массив как тело. Каждый элемент — `{ id, name?, sortIndex? }`. Возвращает `{ updated, errors }`, ошибка — `{ id, code, message }`. Если не прошла ни одна папка, API отвечает 400.

## Версии

### `getVersions`

`GET /sites/{siteId}/pages/{pageId}/versions`

```typescript
getVersions(pageId: number): Promise<PageVersionListResponse>
```

Возвращает `{ list: PageVersionItem[] }`. Элемент — `{ id, createdAt, isDraft }`. `isDraft` значит, что версию ещё ни разу не публиковали.

### `getVersion`

`GET /sites/{siteId}/pages/{pageId}/versions/{versionId}`

```typescript
getVersion(
    pageId: number,
    versionId: number | 'published' | 'editor'
): Promise<PageVersionDataResponse>
```

`'published'` — публичная версия. `'editor'` — это `editorVersionId`, а если указателя нет, публичная версия.

Ответ — элемент версии плюс `data: PageDataStructure` и необязательный массив `abtests`. Форма `data` — в разделе [Данные страницы](page-data.md).

### `getPublishedVersion`

```typescript
getPublishedVersion(pageId: number): Promise<PageVersionDataResponse>
```

Вызывает `getVersion(pageId, 'published')`.

### `createVersion`

`POST /sites/{siteId}/pages/{pageId}/versions`

```typescript
createVersion(pageId: number, data: CreatePageVersionParams): Promise<PageVersionDataResponse>
```

| Поле                | Примечание                                           |
| ------------------- | ---------------------------------------------------- |
| `data`              | Обязательный `PageDataStructure`                     |
| `assets.images`     | `number[]`                                           |
| `assets.files`      | `string[]`                                           |
| `assets.screenshot` | `number \| null`                                     |
| `publish`           | Необязательно. Если не передан, API публикует версию |
