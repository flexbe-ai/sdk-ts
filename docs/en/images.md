# Images

`site.images` uploads and reads images for one site. Paths sit on `/sites/{siteId}/images`.

```typescript
const image = await site.images.upload(bytes, "cover.png", "image/png");
```

`Image` is `{ id, ext, name, width, height, proportion, url, previewUrl?, average?, transparent?, animated?, border? }`. `transparent` and `animated` are booleans. The image stored inside a page version is `ImageObj`, on [Page data](page-data.md).

## `upload`

`POST /sites/{siteId}/images`

```typescript
upload(
    file: UploadBinary,
    filename?: string,
    contentType?: string
): Promise<Image>
```

`filename` defaults to `'image.bin'`. `contentType` is optional.

`UploadBinary` is `Blob | File | Buffer | ArrayBuffer | Uint8Array`. The file is sent as multipart field `file`. A value outside that union throws `TypeError` with `Unsupported upload binary type`.

## `uploadFromUrl`

`POST /sites/{siteId}/images/from-url`

```typescript
uploadFromUrl(params: UploadFromUrlParams): Promise<Image>
```

`UploadFromUrlParams` is `{ url: string }`. The body is JSON.

## `claim`

`POST /sites/{siteId}/images/claim`

```typescript
claim(params: ClaimImagesParams): Promise<void>
```

`ClaimImagesParams` is `{ imageIds: number[] }`. Attaches image ids that already exist, including images from another account.

## `get`

`GET /sites/{siteId}/images/{imageId}`

```typescript
get(imageId: number): Promise<Image>
```

## `remove`

`DELETE /sites/{siteId}/images/{imageId}`

```typescript
remove(imageId: number): Promise<void>
```
