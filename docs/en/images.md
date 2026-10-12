# Site → Images

`site.images` uploads and reads images for the site.

```typescript
const image = await site.images.upload(bytes, "cover.png", "image/png");
```

### `Image`

An uploaded site image.

| Field         | Type             | Description                   |
| ------------- | ---------------- | ----------------------------- |
| `id`          | `number`         | Image id                      |
| `ext`         | `string`         | Extension                     |
| `name`        | `string`         | File name                     |
| `width`       | `number`         | Width in pixels               |
| `height`      | `number`         | Height in pixels              |
| `proportion`  | `number`         | Aspect ratio, width to height |
| `url`         | `string`         | Public path                   |
| `previewUrl`  | `string \| null` | Preview. Optional             |
| `average`     | `string \| null` | Average color. Optional       |
| `transparent` | `boolean`        | Has transparency. Optional    |
| `animated`    | `boolean`        | Animated. Optional            |
| `border`      | `string \| null` | Border color. Optional        |

---

## `upload`

Uploads an image file and returns the `Image` record.

`POST /sites/{siteId}/images`

```typescript
const image = await site.images.upload(bytes, "cover.png", "image/png");
```

**Input**

| Field         | Type           | Description                                                                              |
| ------------- | -------------- | ---------------------------------------------------------------------------------------- |
| `file`        | `UploadBinary` | `Blob`, `File`, `Buffer`, `ArrayBuffer`, or `Uint8Array`. Sent as multipart field `file` |
| `filename`    | `string`       | File name. Defaults to `image.bin`                                                       |
| `contentType` | `string`       | MIME type. Optional                                                                      |

A value outside `UploadBinary` throws `TypeError` with `Unsupported upload binary type`.

**Response** [`Image`](#image).

## `uploadFromUrl`

Downloads an image from a URL and returns the `Image` record.

`POST /sites/{siteId}/images/from-url`

```typescript
const image = await site.images.uploadFromUrl({
  url: "https://example.com/cover.png",
});
```

**Input**

| Field | Type     | Description                     |
| ----- | -------- | ------------------------------- |
| `url` | `string` | Image address. The body is JSON |

**Response** [`Image`](#image).

## `get`

Returns one image of the site.

`GET /sites/{siteId}/images/{imageId}`

```typescript
const image = await site.images.get(imageId);
```

**Input**

| Field     | Type     | Description |
| --------- | -------- | ----------- |
| `imageId` | `number` | Image id    |

**Response** [`Image`](#image).

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
