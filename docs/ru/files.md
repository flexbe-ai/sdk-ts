# Файлы

`site.files` загружает файлы одного сайта и копирует пути с другого аккаунта. Пути лежат на `/sites/{siteId}/files`.

```typescript
const file = await site.files.upload(bytes, "price.pdf", "application/pdf");
```

`upload` возвращает запись файла. Сохраните этот объект.

`FileAsset` — это `{ id, name, originalName?, ext, url }`.

`UploadBinary` — это `Blob | File | Buffer | ArrayBuffer | Uint8Array`. Файл уходит как multipart-поле `file`.

## `upload`

`POST /sites/{siteId}/files`

```typescript
upload(
    file: UploadBinary,
    filename: string,
    contentType?: string
): Promise<FileAsset>
```

`filename` обязателен. `contentType` по умолчанию `'application/octet-stream'`.

## `uploadFromUrl`

`POST /sites/{siteId}/files/from-url`

```typescript
uploadFromUrl(params: { url: string }): Promise<FileAsset>
```

Тело — JSON.

## `copy`

`POST /sites/{siteId}/files/copy`

```typescript
copy(params: CopyFilesParams): Promise<CopyFilesResponse>
```

| Поле              | Тип        | Примечание                     |
| ----------------- | ---------- | ------------------------------ |
| `sourceAccountId` | `number`   | Аккаунт, где файлы уже лежат   |
| `paths`           | `string[]` | `/files/foo.mp4` или `foo.mp4` |

Возвращает `{ files }` в том же порядке, что и `paths`. Элемент равен `null`, если этот путь не скопировался.

## `remove`

`DELETE /sites/{siteId}/files/{fileId}`

```typescript
remove(fileId: number): Promise<void>
```
