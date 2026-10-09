# Site → Files

`site.files` uploads files for one site.

```typescript
const file = await site.files.upload(bytes, "price.pdf", "application/pdf");
```

`upload` returns the file record. Keep that object.

## `FileAsset`

An uploaded site file.

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` | File id |
| `name` | `string` | Name |
| `originalName` | `string \| null` | Original name. Optional |
| `ext` | `string` | Extension |
| `url` | `string` | Public path |

## `UploadBinary`

Bytes accepted by an upload.

| Type | Description |
| --- | --- |
| `Blob` | Browser blob |
| `File` | Form file |
| `Buffer` | Node.js buffer |
| `ArrayBuffer` | Raw bytes |
| `Uint8Array` | Bytes as a typed array |

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

**Response** [`FileAsset`](#fileasset).

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

**Response** [`FileAsset`](#fileasset).

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
