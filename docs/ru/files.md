# Сайт → Файлы

`site.files` загружает файлы сайта.

```typescript
const file = await site.files.upload(bytes, "price.pdf", "application/pdf");
```

`upload` возвращает запись файла. Сохраните этот объект.

### `FileAsset`

Загруженный файл сайта.

| Поле           | Тип              | Описание                    |
| -------------- | ---------------- | --------------------------- |
| `id`           | `number`         | Id файла                    |
| `name`         | `string`         | Имя                         |
| `originalName` | `string \| null` | Исходное имя. Необязательно |
| `ext`          | `string`         | Расширение                  |
| `url`          | `string`         | Публичный путь              |

### `UploadBinary`

Байты, которые принимает загрузка.

| Тип           | Описание             |
| ------------- | -------------------- |
| `Blob`        | Браузерный blob      |
| `File`        | Файл из формы        |
| `Buffer`      | Буфер Node.js        |
| `ArrayBuffer` | Сырые байты          |
| `Uint8Array`  | Байты в виде массива |

---

## `upload`

Загружает файл и возвращает запись `FileAsset`. Сохраните этот объект.

`POST /sites/{siteId}/files`

```typescript
const file = await site.files.upload(bytes, "price.pdf", "application/pdf");
```

**Вход**

| Поле          | Тип            | Описание                                          |
| ------------- | -------------- | ------------------------------------------------- |
| `file`        | `UploadBinary` | Байты файла. Уходят как multipart-поле `file`     |
| `filename`    | `string`       | Имя файла. Обязательно                            |
| `contentType` | `string`       | MIME-тип. По умолчанию `application/octet-stream` |

**Ответ** [`FileAsset`](#fileasset).

## `uploadFromUrl`

Скачивает файл по URL и возвращает запись `FileAsset`.

`POST /sites/{siteId}/files/from-url`

```typescript
const file = await site.files.uploadFromUrl({
  url: "https://example.com/price.pdf",
});
```

**Вход**

| Поле  | Тип      | Описание                 |
| ----- | -------- | ------------------------ |
| `url` | `string` | Адрес файла. Тело — JSON |

**Ответ** [`FileAsset`](#fileasset).

## `remove`

Удаляет файл сайта.

`DELETE /sites/{siteId}/files/{fileId}`

```typescript
await site.files.remove(fileId);
```

**Вход**

| Поле     | Тип      | Описание |
| -------- | -------- | -------- |
| `fileId` | `number` | Id файла |
