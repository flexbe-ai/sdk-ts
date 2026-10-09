# Pages

`site.pages` covers page cards, folders, and versions. The layout JSON inside a version is [Page data](page-data.md). To compile an HTML block, use `site.buildHtml` on [Sites](sites.md).

```typescript
const site = client.getSiteApi(siteId);
const pages = await site.pages.getPages({ limit: 10, offset: 0 });
```

Paths below sit on `/sites/{siteId}`.

A `Page` is the card: name, address, status. The layout arrives as `PageVersionDataResponse.data`.

## Page card

| Field             | Type                                                                        |
| ----------------- | --------------------------------------------------------------------------- |
| `id`              | `number`                                                                    |
| `versionId`       | `number \| null`                                                            |
| `editorVersionId` | `number \| null`. Last version opened in the editor. `null` on legacy pages |
| `type`            | `PageType`                                                                  |
| `status`          | `PageStatus`                                                                |
| `name`            | `string`                                                                    |
| `uri`             | `string \| null`                                                            |
| `language`        | `string`                                                                    |
| `folderId`        | `number`                                                                    |
| `sortIndex`       | `number`                                                                    |
| `themeId`         | `number`                                                                    |
| `updatedAt`       | `string`                                                                    |
| `deletedAt`       | `string \| null`                                                            |
| `screenshot`      | `{ id, ext, url } \| null`                                                  |
| `meta`            | `PageMeta \| null`                                                          |

`PageType`: `page`, `file`, `global`, `ai`, `cms`, `ecommerce_product`, `ecommerce_category`.

`PageStatus`: `published`, `drafted`, `removed`, `deleted`.

`PageMeta`: `title`, `description`, `keywords`, `ogImage`, `ogTitle`, `ogDescription`, `noindex`, and optional `schemaMarkup` (`data`, `updatedAt`, optional `genProducts`).

## `getPages`

`GET /sites/{siteId}/pages`

```typescript
getPages(params?: GetPagesParams): Promise<PageListResponse>
```

Returns `{ list, pagination }` with `pagination` of `{ limit, offset, total }`.

| Field      | Notes                                                                    |
| ---------- | ------------------------------------------------------------------------ |
| `offset`   | Items to skip. Default is 0                                              |
| `limit`    | Default is 100                                                           |
| `type`     | One `PageType` or an array. An array is sent as a comma-separated string |
| `status`   | One `PageStatus` or an array, same comma rule                            |
| `uri`      | Exact match with `'/'`, or a partial match such as `'%word%'`            |
| `folderId` | Folder id                                                                |
| `themeId`  | Theme id                                                                 |

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

`type` may be `PageType.PAGE` or `PageType.GLOBAL`. Omit it, or pass `page`, to clone a template or a source page. Pass `global` to send the layout in the body.

| Field                         | Notes                                    |
| ----------------------------- | ---------------------------------------- |
| `templateId`                  | Template to clone                        |
| `sourcePageId`                | Page to clone                            |
| `name`, `uri`                 | Optional card fields                     |
| `folderId`, `themeId`         | `number \| null`                         |
| `is`, `template_id`           | Layout fields used with `type: 'global'` |
| `blocks`, `modals`, `widgets` | Layout arrays used with `type: 'global'` |

## `createPageFromAi`

`POST /sites/{siteId}/pages/from-ai`

```typescript
createPageFromAi(data: CreatePageFromAiParams): Promise<Page>
```

`CreatePageFromAiParams` is `{ pageUUID: string }`.

## `copyPage`

`POST /sites/{siteId}/pages/{pageId}/copy`

```typescript
copyPage(pageId: number, data: CopyPageParams): Promise<Page>
```

| Field          | Required | Notes                  |
| -------------- | -------- | ---------------------- |
| `name`         | yes      |                        |
| `uri`          | no       |                        |
| `folderId`     | no       | `number \| null`       |
| `targetSiteId` | no       | Copy onto another site |

## `copyPages`

`POST /sites/{siteId}/pages/copy`

```typescript
copyPages(data: CopyPagesParams): Promise<CopyPagesResponse>
```

`CopyPagesParams` is `{ pageIds, folderId?, targetSiteId? }`. The response is `{ pages: Page[] }`.

## `updatePage`

`PUT /sites/{siteId}/pages/{pageId}`

```typescript
updatePage(pageId: number, data: UpdatePageParams): Promise<Page>
```

| Field             | Limit                                                                                                                              |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `status`          | `PageStatus`                                                                                                                       |
| `versionId`       | Makes that version current                                                                                                         |
| `editorVersionId` | Pins the editor pointer without publishing                                                                                         |
| `name`            | 150 characters                                                                                                                     |
| `uri`             | 255 characters. The API normalizes a leading and trailing slash                                                                    |
| `language`        |                                                                                                                                    |
| `folderId`        |                                                                                                                                    |
| `sortIndex`       |                                                                                                                                    |
| `meta`            | Partial `PageMeta`. Title and Open Graph title: 200 characters. Description, keywords, and Open Graph description: 1000 characters |

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

The body is the array itself. Each item is `UpdatePageParams` plus `id` (the page id). Returns `{ updated: Page[], errors: FlexbeBulkError[] }`. If every item fails, the API responds with 400.

## `bulkDeletePages`

`DELETE /sites/{siteId}/pages`

```typescript
bulkDeletePages(ids: number[]): Promise<BulkDeleteResponse>
```

The body is `{ ids }`. Returns `{ deleted: number[], errors }`. Each error is `{ id, code, message }`. If every id fails, the API responds with 400.

## Folders

A folder is `{ id, name, sortIndex }`. `getFolders` returns `{ list }`.

| Method              | HTTP                         | Signature                                                              |
| ------------------- | ---------------------------- | ---------------------------------------------------------------------- |
| `getFolders`        | `GET /pages-folders`         | `(): Promise<PageFolderListResponse>`                                  |
| `getFolder`         | `GET /pages-folders/{id}`    | `(id: number): Promise<PageFolder>`                                    |
| `createFolder`      | `POST /pages-folders`        | `(data: CreateFolderParams): Promise<PageFolder>`                      |
| `updateFolder`      | `PATCH /pages-folders/{id}`  | `(id: number, data: UpdateFolderParams): Promise<PageFolder>`          |
| `deleteFolder`      | `DELETE /pages-folders/{id}` | `(id: number): Promise<void>`                                          |
| `bulkUpdateFolders` | `PATCH /pages-folders`       | `(updates: BulkUpdateFolderItem[]): Promise<BulkUpdateFolderResponse>` |

`CreateFolderParams` requires `name` (at most 50 characters) and takes an optional `sortIndex` of at least 0. `UpdateFolderParams` makes both optional.

`deleteFolder` also deletes the items in that folder.

`bulkUpdateFolders` sends the array as the body. Each item is `{ id, name?, sortIndex? }`. Returns `{ updated, errors }` where an error is `{ id, code, message }`. If every folder fails, the API responds with 400.

## Versions

### `getVersions`

`GET /sites/{siteId}/pages/{pageId}/versions`

```typescript
getVersions(pageId: number): Promise<PageVersionListResponse>
```

Returns `{ list: PageVersionItem[] }`. An item is `{ id, createdAt, isDraft }`. `isDraft` means the version has never been published.

### `getVersion`

`GET /sites/{siteId}/pages/{pageId}/versions/{versionId}`

```typescript
getVersion(
    pageId: number,
    versionId: number | 'published' | 'editor'
): Promise<PageVersionDataResponse>
```

`'published'` is the public version. `'editor'` is `editorVersionId`, or the published version when that pointer is missing.

The response is the version item plus `data: PageDataStructure` and an optional `abtests` array. The `data` shape is [Page data](page-data.md).

### `getPublishedVersion`

```typescript
getPublishedVersion(pageId: number): Promise<PageVersionDataResponse>
```

Calls `getVersion(pageId, 'published')`.

### `createVersion`

`POST /sites/{siteId}/pages/{pageId}/versions`

```typescript
createVersion(pageId: number, data: CreatePageVersionParams): Promise<PageVersionDataResponse>
```

| Field               | Notes                                                 |
| ------------------- | ----------------------------------------------------- |
| `data`              | Required `PageDataStructure`                          |
| `assets.images`     | `number[]`                                            |
| `assets.files`      | `string[]`                                            |
| `assets.screenshot` | `number \| null`                                      |
| `publish`           | Optional. When omitted, the API publishes the version |
