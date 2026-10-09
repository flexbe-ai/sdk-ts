# site > Pages

`site.pages` covers page cards, folders, and versions. The layout JSON inside a version is [Page data](page-data.md). To compile an HTML block, use `site.buildHtml` on [Sites](sites.md).

```typescript
const site = client.getSiteApi(siteId);
const pages = await site.pages.getPages({ limit: 10, offset: 0 });
```

Paths below sit on `/sites/{siteId}`.

A `Page` is the card: name, address, status. The layout arrives as `PageVersionDataResponse.data`.

## Page card

| Field               | Type               | Description                                                      |
| ------------------- | ------------------ | ---------------------------------------------------------------- |
| `id`                | `number`           | Page id                                                          |
| `versionId`         | `number \| null`   | Id of the current version                                        |
| `editorVersionId`   | `number \| null`   | Last version opened in the editor. `null` on legacy pages        |
| `type`              | `PageType`         | Kind of page: regular, global, product, and the rest             |
| `status`            | `PageStatus`       | `published`, `drafted`, `removed`, or `deleted`                  |
| `name`              | `string`           | Name                                                             |
| `uri`               | `string \| null`   | Address                                                          |
| `language`          | `string`           | Page language                                                    |
| `folderId`          | `number`           | Folder                                                           |
| `sortIndex`         | `number`           | Order in the list                                                |
| `themeId`           | `number`           | Theme                                                            |
| `updatedAt`         | `string`           | When the card was last changed                                   |
| `deletedAt`         | `string \| null`   | When it was deleted. `null` while the page is still there        |
| `screenshot`        | object or `null`   | Preview                                                          |
| `screenshot.id`     | `number \| null`   | Preview image id                                                 |
| `screenshot.ext`    | `string`           | Extension                                                        |
| `screenshot.url`    | `string \| null`   | Preview URL                                                      |
| `meta`              | `PageMeta \| null` | Page SEO                                                         |
| `meta.title`        | `string \| null`   | Title                                                            |
| `meta.description`  | `string \| null`   | Description                                                      |
| `meta.keywords`     | `string \| null`   | Keywords                                                         |
| `meta.ogImage`      | `string \| null`   | Open Graph image                                                 |
| `meta.ogTitle`      | `string \| null`   | Open Graph title                                                 |
| `meta.ogDescription`| `string \| null`   | Open Graph description                                           |
| `meta.noindex`      | `boolean`          | Keep the page out of the index                                   |
| `meta.schemaMarkup` | object or `null`   | schema.org markup, optional                                      |

`PageType`: `page`, `file`, `global`, `ai`, `cms`, `ecommerce_product`, `ecommerce_category`.

`PageStatus`: `published`, `drafted`, `removed`, `deleted`.

`PageMeta`: `title`, `description`, `keywords`, `ogImage`, `ogTitle`, `ogDescription`, `noindex`, and optional `schemaMarkup` (`data`, `updatedAt`, optional `genProducts`).

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
| `list`              | `Page[]` | Pages. Fields in the table above  |
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

**Response** `Page`. Fields in the table above.

## `createPage`

Creates a page. `type` may be `page` or `global`. Omit it, or pass `page`, to clone a template or a source page. Pass `global` to send the layout in the body.

`POST /sites/{siteId}/pages`

```typescript
const page = await site.pages.createPage({ templateId: 12, name: "About" });
```

**Input**

| Field          | Type             | Description                                      |
| -------------- | ---------------- | ------------------------------------------------ |
| `templateId`   | `number`         | Template to clone                                |
| `sourcePageId` | `number`         | Page to clone                                    |
| `name`         | `string`         | Name. Optional                                   |
| `uri`          | `string`         | Address. Optional                                |
| `folderId`     | `number \| null` | Folder                                           |
| `themeId`      | `number \| null` | Theme                                            |
| `is`           | `string`         | Layout entity type. Only with `type: 'global'`   |
| `template_id`  | `string`         | Layout template. Only with `type: 'global'`      |
| `blocks`       | array            | Layout blocks. Only with `type: 'global'`        |
| `modals`       | array            | Layout modals. Only with `type: 'global'`        |
| `widgets`      | array            | Layout widgets. Only with `type: 'global'`       |

**Response** `Page`. Fields in the table above.

## `createPageFromAi`

Creates a page from a finished AI layout.

`POST /sites/{siteId}/pages/from-ai`

```typescript
const page = await site.pages.createPageFromAi({ pageUUID: "…" });
```

**Input**

| Field      | Type     | Description        |
| ---------- | -------- | ------------------ |
| `pageUUID` | `string` | Id of the finished layout |

**Response** `Page`. Fields in the table above.

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

**Response** `Page`. Fields in the table above.

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

Updates a page.

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
| `editorVersionId` | `number`     | Pins the editor pointer without publishing                                                                                         |
| `name`            | `string`     | Name, up to 150 characters                                                                                                         |
| `uri`             | `string`     | Address, up to 255 characters. The API normalizes a leading and trailing slash                                                     |
| `language`        | `string`     | Page language                                                                                                                      |
| `folderId`        | `number`     | Folder                                                                                                                             |
| `sortIndex`       | `number`     | Order in the list                                                                                                                  |
| `meta`            | `PageMeta`   | Partial. Title and Open Graph title: 200 characters. Description, keywords, and Open Graph description: 1000 characters            |

**Response** `Page`. Fields in the table above.

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

**Response**

No body.

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

### `getFolders`

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

### `getFolder`

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

### `createFolder`

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

### `updateFolder`

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

### `deleteFolder`

Deletes the folder and the items in it.

`DELETE /sites/{siteId}/pages-folders/{id}`

```typescript
await site.pages.deleteFolder(folderId);
```

**Input**

| Field | Type     | Description |
| ----- | -------- | ----------- |
| `id`  | `number` | Folder id   |

**Response**

No body.

### `bulkUpdateFolders`

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

## Versions

### `getVersions`

Returns the versions of a page.

`GET /sites/{siteId}/pages/{pageId}/versions`

```typescript
const versions = await site.pages.getVersions(pageId);
```

**Input**

| Field    | Type     | Description |
| -------- | -------- | ----------- |
| `pageId` | `number` | Page id     |

**Response**

| Field              | Type      | Description                              |
| ------------------ | --------- | ---------------------------------------- |
| `list`             | array     | Versions                                 |
| `list[].id`        | `number`  | Version id                               |
| `list[].createdAt` | `string`  | When it was created                      |
| `list[].isDraft`   | `boolean` | The version has never been published     |

### `getVersion`

Returns one version together with the layout. `'published'` is the public version. `'editor'` is `editorVersionId`, or the published version when that pointer is missing.

`GET /sites/{siteId}/pages/{pageId}/versions/{versionId}`

```typescript
const version = await site.pages.getVersion(pageId, "published");
```

**Input**

| Field       | Type                                | Description                    |
| ----------- | ----------------------------------- | ------------------------------ |
| `pageId`    | `number`                            | Page id                        |
| `versionId` | `number \| 'published' \| 'editor'` | Version id, or one of those two words |

**Response**

| Field       | Type                | Description                                      |
| ----------- | ------------------- | ------------------------------------------------ |
| `id`        | `number`            | Version id                                       |
| `createdAt` | `string`            | When it was created                              |
| `isDraft`   | `boolean`           | The version has never been published             |
| `data`      | `PageDataStructure` | Layout. Shape in [Page data](page-data.md)       |
| `abtests`   | array               | A/B tests of the version. Optional               |

### `getPublishedVersion`

Returns the published version. This is `getVersion(pageId, 'published')`.

```typescript
const version = await site.pages.getPublishedVersion(pageId);
```

**Input**

| Field    | Type     | Description |
| -------- | -------- | ----------- |
| `pageId` | `number` | Page id     |

**Response** the same as `getVersion`.

### `createVersion`

Creates a page version. When `publish` is omitted, the API publishes the version.

`POST /sites/{siteId}/pages/{pageId}/versions`

```typescript
const version = await site.pages.createVersion(pageId, { data: layout });
```

**Input**

| Field               | Type                | Description                                              |
| ------------------- | ------------------- | -------------------------------------------------------- |
| `pageId`            | `number`            | Page id                                                  |
| `data`              | `PageDataStructure` | Layout JSON. Required                                    |
| `assets.images`     | `number[]`          | Image ids used by the version                            |
| `assets.files`      | `string[]`          | File paths used by the version                           |
| `assets.screenshot` | `number \| null`    | Version preview id                                       |
| `publish`           | `boolean`           | Publish immediately. When omitted, the API publishes     |

**Response** the same as `getVersion`.
