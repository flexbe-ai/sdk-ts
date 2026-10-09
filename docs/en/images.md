# site > Images

`site.images` uploads and reads images for one site. Paths sit on `/sites/{siteId}/images`.

```typescript
const image = await site.images.upload(bytes, "cover.png", "image/png");
```

`Image` is `{ id, ext, name, width, height, proportion, url, previewUrl?, average?, transparent?, animated?, border? }`. `transparent` and `animated` are booleans. The image stored inside a page version is `ImageObj`, on [Page data](page-data.md).

## `upload`

Uploads an image file and returns the `Image` record.

`POST /sites/{siteId}/images`

```typescript
const image = await site.images.upload(bytes, "cover.png", "image/png");
```

**Input**

| Field         | Type           | Description                                                                 |
| ------------- | -------------- | --------------------------------------------------------------------------- |
| `file`        | `UploadBinary` | `Blob`, `File`, `Buffer`, `ArrayBuffer`, or `Uint8Array`. Sent as multipart field `file` |
| `filename`    | `string`       | File name. Defaults to `image.bin`                                          |
| `contentType` | `string`       | MIME type. Optional                                                         |

A value outside `UploadBinary` throws `TypeError` with `Unsupported upload binary type`.

**Response** `Image`. Fields in the paragraph above.

## `uploadFromUrl`

Downloads an image from a URL and returns the `Image` record.

`POST /sites/{siteId}/images/from-url`

```typescript
const image = await site.images.uploadFromUrl({ url: "https://example.com/cover.png" });
```

**Input**

| Field | Type     | Description                    |
| ----- | -------- | ------------------------------ |
| `url` | `string` | Image address. The body is JSON |

**Response** `Image`. Fields in the paragraph above.

## `claim`

Attaches image ids that already exist, including images from another account.

`POST /sites/{siteId}/images/claim`

```typescript
await site.images.claim({ imageIds: [1, 2] });
```

**Input**

| Field      | Type       | Description |
| ---------- | ---------- | ----------- |
| `imageIds` | `number[]` | Image ids   |

**Response**

No body.

## `get`

Returns one site image.

`GET /sites/{siteId}/images/{imageId}`

```typescript
const image = await site.images.get(imageId);
```

**Input**

| Field     | Type     | Description |
| --------- | -------- | ----------- |
| `imageId` | `number` | Image id    |

**Response** `Image`. Fields in the paragraph above.

## `remove`

Deletes a site image.

`DELETE /sites/{siteId}/images/{imageId}`

```typescript
await site.images.remove(imageId);
```

**Input**

| Field     | Type     | Description |
| --------- | -------- | ----------- |
| `imageId` | `number` | Image id    |

**Response**

No body.
