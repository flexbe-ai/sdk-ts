# Изображения

`site.images` загружает и читает изображения одного сайта. Пути лежат на `/sites/{siteId}/images`.

```typescript
const image = await site.images.upload(bytes, "cover.png", "image/png");
```

`Image` — это `{ id, ext, name, width, height, proportion, url, previewUrl?, average?, transparent?, animated?, border? }`. `transparent` и `animated` — булевы значения. Картинка внутри версии страницы — это `ImageObj`, она описана в разделе [Данные страницы](page-data.md).

## `upload`

`POST /sites/{siteId}/images`

```typescript
upload(
    file: UploadBinary,
    filename?: string,
    contentType?: string
): Promise<Image>
```

`filename` по умолчанию `'image.bin'`. `contentType` необязателен.

`UploadBinary` — это `Blob | File | Buffer | ArrayBuffer | Uint8Array`. Файл уходит как multipart-поле `file`. Значение вне этого объединения бросает `TypeError` с текстом `Unsupported upload binary type`.

## `uploadFromUrl`

`POST /sites/{siteId}/images/from-url`

```typescript
uploadFromUrl(params: UploadFromUrlParams): Promise<Image>
```

`UploadFromUrlParams` — это `{ url: string }`. Тело — JSON.

## `claim`

`POST /sites/{siteId}/images/claim`

```typescript
claim(params: ClaimImagesParams): Promise<void>
```

`ClaimImagesParams` — это `{ imageIds: number[] }`. Привязывает id картинок, которые уже есть, в том числе картинки другого аккаунта.

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
