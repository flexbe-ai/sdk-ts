# Site → Page versions

The module for working with page saves and versions.

## `getVersions`

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

| Field              | Type      | Description                          |
| ------------------ | --------- | ------------------------------------ |
| `list`             | array     | Versions                             |
| `list[].id`        | `number`  | Version id                           |
| `list[].createdAt` | `string`  | When it was created                  |
| `list[].isDraft`   | `boolean` | The version has never been published |

## `getVersion`

Returns one version together with the layout.

`GET /sites/{siteId}/pages/{pageId}/versions/{versionId}`

```typescript
const version = await site.pages.getVersion(pageId, "published");
```

**Input**

| Field       | Type          | Description                                                        |
| ----------- | ------------- | ------------------------------------------------------------------ |
| `pageId`    | `number`      | Page id                                                            |
| `versionId` | `number`      | Version id                                                         |
| `versionId` | `'published'` | The published version                                              |
| `versionId` | `'editor'`    | The version open in the editor. If there is none, the published version |

**Response**

| Field       | Type                | Description                                |
| ----------- | ------------------- | ------------------------------------------ |
| `id`        | `number`            | Version id                                 |
| `createdAt` | `string`            | When it was created                        |
| `isDraft`   | `boolean`           | The version has never been published       |
| `data`      | `PageDataStructure` | Layout. Shape in [Page data](page-data.md) |
| `abtests`   | array               | A/B tests of the version. Optional         |

## `createVersion`

Creates a page version.

`POST /sites/{siteId}/pages/{pageId}/versions`

```typescript
const version = await site.pages.createVersion(pageId, { data: layout });
```

**Input**

| Field               | Type                | Description                                          |
| ------------------- | ------------------- | ---------------------------------------------------- |
| `pageId`            | `number`            | Page id                                              |
| `data`              | `PageDataStructure` | Layout JSON. Required                                |
| `assets.images`     | `number[]`          | Image ids used by the version                        |
| `assets.files`      | `string[]`          | File paths used by the version                       |
| `assets.screenshot` | `number \| null`    | Version preview id                                   |
| `publish`           | `boolean`           | Publish immediately. When omitted, the API publishes |

**Response** the same as `getVersion`.
