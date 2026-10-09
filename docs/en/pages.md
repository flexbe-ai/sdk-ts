# Site → Pages

This module works with the page list.

```typescript
const site = client.getSiteApi(siteId);
const pages = await site.pages.getPages({ limit: 10, offset: 0 });
```

The layout is not on this object. It arrives as `PageVersionDataResponse.data`.

### `Page`

| Field              | Type                 | Description                                                 |
| ------------------ | -------------------- | ----------------------------------------------------------- |
| `id`               | `number`             | Page id                                                     |
| `versionId`        | `number \| null`     | Id of the current version                                   |
| `editorVersionId`  | `number \| null`     | Last version opened in the editor. `null` on legacy pages   |
| `type`             | `PageType`           | Kind of page. [`PageType`](#pagetype)                                  |
| `status`           | `PageStatus`         | Status. [`PageStatus`](#pagestatus)                                        |
| `name`             | `string`             | Name                                                        |
| `uri`              | `string \| null`     | Address                                                     |
| `language`         | `string`             | Page language                                               |
| `folderId`         | `number`             | Folder                                                      |
| `sortIndex`        | `number`             | Order in the list                                           |
| `themeId`          | `number`             | Theme                                                       |
| `updatedAt`        | `string`             | When the card was last changed                              |
| `deletedAt`        | `string \| null`     | When it was deleted. `null` while the page is still there   |
| `screenshot`       | `Screenshot \| null` | Preview. [`Screenshot`](#screenshot)                                       |
| `meta`             | `PageMeta \| null`   | Page SEO. [`PageMeta`](#pagemeta)                                      |

### `Screenshot`

| Field | Type             | Description      |
| ----- | ---------------- | ---------------- |
| `id`  | `number \| null` | Preview image id |
| `ext` | `string`         | Extension        |
| `url` | `string \| null` | Preview URL      |

### `PageType`

| Value                  | Description       |
| ---------------------- | ----------------- |
| `page`                 | Regular page      |
| `file`                 | File              |
| `global`               | Global page       |
| `ai`                   | AI page           |
| `cms`                  | CMS page          |
| `ecommerce_product`    | Product page      |
| `ecommerce_category`   | Category page     |

### `PageStatus`

| Value       | Description                                      |
| ----------- | ------------------------------------------------ |
| `published` | Published                                        |
| `drafted`   | Draft                                            |
| `removed`   | The user removed the page                        |
| `deleted`   | The user deleted the page from the removed list  |

### `PageMeta`

| Field            | Type                         | Description                    |
| ---------------- | ---------------------------- | ------------------------------ |
| `title`          | `string \| null`             | Title                          |
| `description`    | `string \| null`             | Description                    |
| `keywords`       | `string \| null`             | Keywords                       |
| `ogImage`        | `string \| null`             | Open Graph image               |
| `ogTitle`        | `string \| null`             | Open Graph title               |
| `ogDescription`  | `string \| null`             | Open Graph description         |
| `noindex`        | `boolean`                    | Keep the page out of the index |
| `schemaMarkup`   | `PageSchemaMarkup \| null`   | schema.org markup. Optional    |

### `PageSchemaMarkup`

| Field         | Type             | Description                              |
| ------------- | ---------------- | ---------------------------------------- |
| `data`        | `unknown`        | Markup body                              |
| `updatedAt`   | `string \| null` | When the markup was updated              |
| `genProducts` | `boolean`        | Generate product markup. Optional        |

---

## `getPages`

Returns the pages of the site.

`GET /sites/{siteId}/pages`

```typescript
const pages = await site.pages.getPages({ offset: 0, limit: 20 });
```

**Input**

| Field      | Type                     | Description                                                              |
| ---------- | ------------------------ | ------------------------------------------------------------------------ |
| `offset`   | `number`                 | How many items to skip. Default is 0                                     |
| `limit`    | `number`                 | How many to return. Default is 100                                       |
| `type`     | `PageType` or an array   | One type or several. An array is sent as a comma-separated string        |
| `status`   | `PageStatus` or an array | One status or several, same comma rule                                   |
| `uri`      | `string`                 | Exact match with `'/'`, or a partial match such as `'%word%'`            |
| `folderId` | `number`                 | Folder id                                                                |
| `themeId`  | `number`                 | Theme id                                                                 |

**Response**

| Field               | Type     | Description                       |
| ------------------- | -------- | --------------------------------- |
| `list`              | `Page[]` | [`Page`](#page)  |
| `pagination.limit`  | `number` | Page size                         |
| `pagination.offset` | `number` | Offset                            |
| `pagination.total`  | `number` | Total rows                        |

## `getPage`

Returns one page.

`GET /sites/{siteId}/pages/{pageId}`

```typescript
const page = await site.pages.getPage(pageId);
```

**Input**

| Field    | Type     | Description |
| -------- | -------- | ----------- |
| `pageId` | `number` | Page id     |

**Response** [`Page`](#page).

## `createPage`

Creates a page or a global section.

`POST /sites/{siteId}/pages`

```typescript
const page = await site.pages.createPage({ templateId: 12, name: "About" });
const section = await site.pages.createPage({
  type: "global",
  name: "Header",
  blocks: [],
});
```

**Input when `type` is omitted or `page`**

| Field          | Type             | Description                          |
| -------------- | ---------------- | ------------------------------------ |
| `type`         | `'page'`         | Regular page. Optional               |
| `templateId`   | `number`         | Template to clone. Optional          |
| `sourcePageId` | `number`         | Page to clone. Optional              |
| `name`         | `string`         | Name. Optional                       |
| `uri`          | `string`         | Address. Optional                    |
| `folderId`     | `number \| null` | Folder. Optional                     |

Do not pass `templateId` and `sourcePageId` together. Omit both to create a blank page.

**Input when `type` is `'global'`**

| Field         | Type             | Description                    |
| ------------- | ---------------- | ------------------------------ |
| `type`        | `'global'`       | Global section                 |
| `name`        | `string`         | Name. Optional                 |
| `folderId`    | `number \| null` | Folder. Optional               |
| `themeId`     | `number \| null` | Theme. Optional                |
| `is`          | `string`         | Layout entity type. Optional   |
| `template_id` | `string`         | Layout template. Optional      |
| `blocks`      | array            | Layout blocks. Optional        |
| `modals`      | array            | Layout modals. Optional        |
| `widgets`     | array            | Layout widgets. Optional       |

**Response** [`Page`](#page).

## `copyPage`

Copies one page.

`POST /sites/{siteId}/pages/{pageId}/copy`

```typescript
const copy = await site.pages.copyPage(pageId, { name: "Copy" });
```

**Input**

| Field          | Type             | Description                    |
| -------------- | ---------------- | ------------------------------ |
| `pageId`       | `number`         | Which page to copy             |
| `name`         | `string`         | Name of the copy. Required     |
| `uri`          | `string`         | Address of the copy. Optional  |
| `folderId`     | `number \| null` | Folder. Optional               |
| `targetSiteId` | `number`         | Copy onto another site. Optional |

**Response** [`Page`](#page).

## `copyPages`

Copies several pages.

`POST /sites/{siteId}/pages/copy`

```typescript
const copied = await site.pages.copyPages({ pageIds: [1, 2] });
```

**Input**

| Field          | Type       | Description                    |
| -------------- | ---------- | ------------------------------ |
| `pageIds`      | `number[]` | Which pages to copy            |
| `folderId`     | `number`   | Folder for the copies. Optional |
| `targetSiteId` | `number`   | Copy onto another site. Optional |

**Response**

| Field   | Type     | Description |
| ------- | -------- | ----------- |
| `pages` | `Page[]` | The copies  |

## `updatePage`

Updates the page parameters.

`PUT /sites/{siteId}/pages/{pageId}`

```typescript
const page = await site.pages.updatePage(pageId, { name: "New name" });
```

**Input**

| Field             | Type         | Description                                                                                                                        |
| ----------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `pageId`          | `number`     | Page id                                                                                                                            |
| `status`          | `PageStatus` | New status                                                                                                                         |
| `versionId`       | `number`     | Makes that version current                                                                                                         |
| `editorVersionId` | `number`     | The version open in the editor                                                                                                     |
| `name`            | `string`     | Name, up to 150 characters                                                                                                         |
| `uri`             | `string`     | Address, up to 255 characters. The API normalizes a leading and trailing slash                                                     |
| `language`        | `string`     | Page language                                                                                                                      |
| `folderId`        | `number`     | Folder                                                                                                                             |
| `sortIndex`       | `number`     | Order in the list                                                                                                                  |
| `meta`            | `PageMeta`   | Partial. Title and Open Graph title: 200 characters. Description, keywords, and Open Graph description: 1000 characters            |

**Response** [`Page`](#page).

To change page versions and page data, see [Page versions](page-versions.md) and [Page data](page-data.md).

## `deletePage`

Deletes a page.

`DELETE /sites/{siteId}/pages/{pageId}`

```typescript
await site.pages.deletePage(pageId);
```

**Input**

| Field    | Type     | Description |
| -------- | -------- | ----------- |
| `pageId` | `number` | Page id     |

## `bulkUpdatePages`

Updates several pages. If every item fails, the API responds with 400.

`PATCH /sites/{siteId}/pages`

```typescript
const result = await site.pages.bulkUpdatePages([{ id: pageId, name: "New name" }]);
```

**Input**

The body is the array itself. Each item is the `updatePage` fields plus the page `id`.

**Response**

| Field     | Type                       | Description              |
| --------- | -------------------------- | ------------------------ |
| `updated` | `Page[]`                   | Pages that changed       |
| `errors`  | `{ id, code, message }[]`  | What did not change      |

## `bulkDeletePages`

Deletes several pages. If every id fails, the API responds with 400.

`DELETE /sites/{siteId}/pages`

```typescript
const result = await site.pages.bulkDeletePages([pageId]);
```

**Input**

| Field | Type       | Description                 |
| ----- | ---------- | --------------------------- |
| `ids` | `number[]` | Page ids. The body is `{ ids }` |

**Response**

| Field     | Type                       | Description        |
| --------- | -------------------------- | ------------------ |
| `deleted` | `number[]`                 | Ids that were deleted |
| `errors`  | `{ id, code, message }[]`  | What was not deleted |

## Folders

A folder is `{ id, name, sortIndex }`.

## `getFolders`

Returns the site folders.

`GET /sites/{siteId}/pages-folders`

```typescript
const folders = await site.pages.getFolders();
```

**Input**

No parameters.

**Response**

| Field  | Type           | Description                              |
| ------ | -------------- | ---------------------------------------- |
| `list` | `PageFolder[]` | Folders. A folder has `id`, `name`, `sortIndex` |

## `getFolder`

Returns one folder.

`GET /sites/{siteId}/pages-folders/{id}`

```typescript
const folder = await site.pages.getFolder(folderId);
```

**Input**

| Field | Type     | Description |
| ----- | -------- | ----------- |
| `id`  | `number` | Folder id   |

**Response** `PageFolder`: `id`, `name`, `sortIndex`.

## `createFolder`

Creates a folder.

`POST /sites/{siteId}/pages-folders`

```typescript
const folder = await site.pages.createFolder({ name: "Services" });
```

**Input**

| Field       | Type     | Description                                |
| ----------- | -------- | ------------------------------------------ |
| `name`      | `string` | Name, at most 50 characters. Required      |
| `sortIndex` | `number` | Order, at least 0. Optional                |

**Response** `PageFolder`: `id`, `name`, `sortIndex`.

## `updateFolder`

Updates a folder. `name` and `sortIndex` are both optional.

`PATCH /sites/{siteId}/pages-folders/{id}`

```typescript
const folder = await site.pages.updateFolder(folderId, { name: "New name" });
```

**Input**

| Field       | Type     | Description          |
| ----------- | -------- | -------------------- |
| `id`        | `number` | Folder id            |
| `name`      | `string` | Name. Optional       |
| `sortIndex` | `number` | Order. Optional      |

**Response** `PageFolder`: `id`, `name`, `sortIndex`.

## `deleteFolder`

Deletes the folder and the items in it.

`DELETE /sites/{siteId}/pages-folders/{id}`

```typescript
await site.pages.deleteFolder(folderId);
```

**Input**

| Field | Type     | Description |
| ----- | -------- | ----------- |
| `id`  | `number` | Folder id   |

## `bulkUpdateFolders`

Updates several folders. If every folder fails, the API responds with 400.

`PATCH /sites/{siteId}/pages-folders`

```typescript
const result = await site.pages.bulkUpdateFolders([{ id: folderId, name: "New name" }]);
```

**Input**

The body is the array itself. Each item is `{ id, name?, sortIndex? }`.

**Response**

| Field     | Type                      | Description            |
| --------- | ------------------------- | ---------------------- |
| `updated` | `PageFolder[]`            | Folders that changed   |
| `errors`  | `{ id, code, message }[]` | What did not change    |

## Next

| Section | Description |
| ------- | ----------- |
| [Page versions](page-versions.md) | Read and save versions |
| [Page data](page-data.md) | Layout JSON |
