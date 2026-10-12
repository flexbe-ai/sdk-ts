# Сайт → Изображения

`site.images` загружает и читает изображения сайта.

```typescript
const image = await site.images.upload(bytes, "cover.png", "image/png");
```

### `Image`

Загруженная картинка сайта.

| Поле          | Тип              | Описание                            |
| ------------- | ---------------- | ----------------------------------- |
| `id`          | `number`         | Id картинки                         |
| `ext`         | `string`         | Расширение                          |
| `name`        | `string`         | Имя файла                           |
| `width`       | `number`         | Ширина в пикселях                   |
| `height`      | `number`         | Высота в пикселях                   |
| `proportion`  | `number`         | Соотношение сторон, ширина к высоте |
| `url`         | `string`         | Публичный путь                      |
| `previewUrl`  | `string \| null` | Превью. Необязательно               |
| `average`     | `string \| null` | Средний цвет. Необязательно         |
| `transparent` | `boolean`        | Есть прозрачность. Необязательно    |
| `animated`    | `boolean`        | Анимация. Необязательно             |
| `border`      | `string \| null` | Цвет рамки. Необязательно           |

---

## `upload`

Загружает файл картинки и возвращает запись `Image`.

`POST /sites/{siteId}/images`

```typescript
const image = await site.images.upload(bytes, "cover.png", "image/png");
```

**Вход**

| Поле          | Тип            | Описание                                                                                   |
| ------------- | -------------- | ------------------------------------------------------------------------------------------ |
| `file`        | `UploadBinary` | `Blob`, `File`, `Buffer`, `ArrayBuffer` или `Uint8Array`. Уходит как multipart-поле `file` |
| `filename`    | `string`       | Имя файла. По умолчанию `image.bin`                                                        |
| `contentType` | `string`       | MIME-тип. Необязательно                                                                    |

Значение вне `UploadBinary` бросает `TypeError` с текстом `Unsupported upload binary type`.

**Ответ** [`Image`](#image).

## `uploadFromUrl`

Скачивает картинку по URL и возвращает запись `Image`.

`POST /sites/{siteId}/images/from-url`

```typescript
const image = await site.images.uploadFromUrl({
  url: "https://example.com/cover.png",
});
```

**Вход**

| Поле  | Тип      | Описание                    |
| ----- | -------- | --------------------------- |
| `url` | `string` | Адрес картинки. Тело — JSON |

**Ответ** [`Image`](#image).

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

**Ответ** [`Image`](#image).

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
