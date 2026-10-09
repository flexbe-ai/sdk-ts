# site > Files

`site.files` uploads files for one site and copies paths from another account. Paths sit on `/sites/{siteId}/files`.

```typescript
const file = await site.files.upload(bytes, "price.pdf", "application/pdf");
```

`upload` returns the file record. Keep that object.

`FileAsset` is `{ id, name, originalName?, ext, url }`.

`UploadBinary` is `Blob | File | Buffer | ArrayBuffer | Uint8Array`. The file is sent as multipart field `file`.

## `upload`

Uploads a file and returns the `FileAsset` record. Keep that object.

`POST /sites/{siteId}/files`

```typescript
const file = await site.files.upload(bytes, "price.pdf", "application/pdf");
```

**Input**

| Field         | Type           | Description                                          |
| ------------- | -------------- | ---------------------------------------------------- |
| `file`        | `UploadBinary` | File bytes. Sent as multipart field `file`           |
| `filename`    | `string`       | File name. Required                                  |
| `contentType` | `string`       | MIME type. Defaults to `application/octet-stream`    |

**Response** `FileAsset`. Fields in the paragraph above.

## `uploadFromUrl`

Downloads a file from a URL and returns the `FileAsset` record.

`POST /sites/{siteId}/files/from-url`

```typescript
const file = await site.files.uploadFromUrl({ url: "https://example.com/price.pdf" });
```

**Input**

| Field | Type     | Description                   |
| ----- | -------- | ----------------------------- |
| `url` | `string` | File address. The body is JSON |

**Response** `FileAsset`. Fields in the paragraph above.

## `copy`

Copies files from another account onto this site.

`POST /sites/{siteId}/files/copy`

```typescript
const copied = await site.files.copy({
  sourceAccountId: 10,
  paths: ["/files/price.pdf"],
});
```

**Input**

| Field             | Type       | Description                          |
| ----------------- | ---------- | ------------------------------------ |
| `sourceAccountId` | `number`   | Account that already holds the files |
| `paths`           | `string[]` | `/files/foo.mp4` or `foo.mp4`        |

**Response**

| Field   | Type                    | Description                                                    |
| ------- | ----------------------- | -------------------------------------------------------------- |
| `files` | `(FileAsset \| null)[]` | Same order as `paths`. `null` when that path was not copied    |

## `remove`

Deletes a site file.

`DELETE /sites/{siteId}/files/{fileId}`

```typescript
await site.files.remove(fileId);
```

**Input**

| Field    | Type     | Description |
| -------- | -------- | ----------- |
| `fileId` | `number` | File id     |

**Response**

No body.
