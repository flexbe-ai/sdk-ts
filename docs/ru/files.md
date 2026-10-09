# site > Файлы

`site.files` загружает файлы одного сайта и копирует пути с другого аккаунта. Пути лежат на `/sites/{siteId}/files`.

```typescript
const file = await site.files.upload(bytes, "price.pdf", "application/pdf");
```

`upload` возвращает запись файла. Сохраните этот объект.

`FileAsset` — это `{ id, name, originalName?, ext, url }`.

`UploadBinary` — это `Blob | File | Buffer | ArrayBuffer | Uint8Array`. Файл уходит как multipart-поле `file`.

## `upload`

Загружает файл и возвращает запись `FileAsset`. Сохраните этот объект.

`POST /sites/{siteId}/files`

```typescript
const file = await site.files.upload(bytes, "price.pdf", "application/pdf");
```

**Вход**

| Поле          | Тип            | Описание                                              |
| ------------- | -------------- | ----------------------------------------------------- |
| `file`        | `UploadBinary` | Байты файла. Уходят как multipart-поле `file`         |
| `filename`    | `string`       | Имя файла. Обязательно                                |
| `contentType` | `string`       | MIME-тип. По умолчанию `application/octet-stream`     |

**Ответ** `FileAsset`. Поля в абзаце выше.

## `uploadFromUrl`

Скачивает файл по URL и возвращает запись `FileAsset`.

`POST /sites/{siteId}/files/from-url`

```typescript
const file = await site.files.uploadFromUrl({ url: "https://example.com/price.pdf" });
```

**Вход**

| Поле  | Тип      | Описание |
| ----- | -------- | -------- |
| `url` | `string` | Адрес файла. Тело — JSON |

**Ответ** `FileAsset`. Поля в абзаце выше.

## `copy`

Копирует файлы с другого аккаунта на этот сайт.

`POST /sites/{siteId}/files/copy`

```typescript
const copied = await site.files.copy({
  sourceAccountId: 10,
  paths: ["/files/price.pdf"],
});
```

**Вход**

| Поле              | Тип        | Описание                   |
| ----------------- | ---------- | -------------------------- |
| `sourceAccountId` | `number`   | Аккаунт, где файлы уже лежат |
| `paths`           | `string[]` | `/files/foo.mp4` или `foo.mp4` |

**Ответ**

| Поле     | Тип                     | Описание                                              |
| -------- | ----------------------- | ----------------------------------------------------- |
| `files`  | `(FileAsset \| null)[]` | В том же порядке, что `paths`. `null`, если путь не скопировался |

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

**Ответ**

Тела нет.
