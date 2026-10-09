# site > Изображения

`site.images` загружает и читает изображения одного сайта. Пути лежат на `/sites/{siteId}/images`.

```typescript
const image = await site.images.upload(bytes, "cover.png", "image/png");
```

`Image` — это `{ id, ext, name, width, height, proportion, url, previewUrl?, average?, transparent?, animated?, border? }`. `transparent` и `animated` — булевы значения. Картинка внутри версии страницы — это `ImageObj`, она описана в разделе [Данные страницы](page-data.md).

## `upload`

Загружает файл картинки и возвращает запись `Image`.

`POST /sites/{siteId}/images`

```typescript
const image = await site.images.upload(bytes, "cover.png", "image/png");
```

**Вход**

| Поле          | Тип            | Описание                                                                 |
| ------------- | -------------- | ------------------------------------------------------------------------ |
| `file`        | `UploadBinary` | `Blob`, `File`, `Buffer`, `ArrayBuffer` или `Uint8Array`. Уходит как multipart-поле `file` |
| `filename`    | `string`       | Имя файла. По умолчанию `image.bin`                                      |
| `contentType` | `string`       | MIME-тип. Необязательно                                                  |

Значение вне `UploadBinary` бросает `TypeError` с текстом `Unsupported upload binary type`.

**Ответ** `Image`. Поля в абзаце выше.

## `uploadFromUrl`

Скачивает картинку по URL и возвращает запись `Image`.

`POST /sites/{siteId}/images/from-url`

```typescript
const image = await site.images.uploadFromUrl({ url: "https://example.com/cover.png" });
```

**Вход**

| Поле  | Тип      | Описание |
| ----- | -------- | -------- |
| `url` | `string` | Адрес картинки. Тело — JSON |

**Ответ** `Image`. Поля в абзаце выше.

## `claim`

Привязывает к сайту id картинок, которые уже есть, в том числе картинки другого аккаунта.

`POST /sites/{siteId}/images/claim`

```typescript
await site.images.claim({ imageIds: [1, 2] });
```

**Вход**

| Поле       | Тип        | Описание        |
| ---------- | ---------- | --------------- |
| `imageIds` | `number[]` | Id картинок     |

**Ответ**

Тела нет.

## `get`

Возвращает одну картинку сайта.

`GET /sites/{siteId}/images/{imageId}`

```typescript
const image = await site.images.get(imageId);
```

**Вход**

| Поле      | Тип      | Описание    |
| --------- | -------- | ----------- |
| `imageId` | `number` | Id картинки |

**Ответ** `Image`. Поля в абзаце выше.

## `remove`

Удаляет картинку сайта.

`DELETE /sites/{siteId}/images/{imageId}`

```typescript
await site.images.remove(imageId);
```

**Вход**

| Поле      | Тип      | Описание    |
| --------- | -------- | ----------- |
| `imageId` | `number` | Id картинки |

**Ответ**

Тела нет.
