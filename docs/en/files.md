# Files

`site.files` uploads files for one site and copies paths from another account. Paths sit on `/sites/{siteId}/files`.

```typescript
const file = await site.files.upload(bytes, "price.pdf", "application/pdf");
```

`upload` returns the file record. Keep that object.

`FileAsset` is `{ id, name, originalName?, ext, url }`.

`UploadBinary` is `Blob | File | Buffer | ArrayBuffer | Uint8Array`. The file is sent as multipart field `file`.

## `upload`

`POST /sites/{siteId}/files`

```typescript
upload(
    file: UploadBinary,
    filename: string,
    contentType?: string
): Promise<FileAsset>
```

`filename` is required. `contentType` defaults to `'application/octet-stream'`.

## `uploadFromUrl`

`POST /sites/{siteId}/files/from-url`

```typescript
uploadFromUrl(params: { url: string }): Promise<FileAsset>
```

The body is JSON.

## `copy`

`POST /sites/{siteId}/files/copy`

```typescript
copy(params: CopyFilesParams): Promise<CopyFilesResponse>
```

| Field             | Type       | Notes                                |
| ----------------- | ---------- | ------------------------------------ |
| `sourceAccountId` | `number`   | Account that already holds the files |
| `paths`           | `string[]` | `/files/foo.mp4` or `foo.mp4`        |

Returns `{ files }`, in the same order as `paths`. An entry is `null` when that path was not copied.

## `remove`

`DELETE /sites/{siteId}/files/{fileId}`

```typescript
remove(fileId: number): Promise<void>
```
