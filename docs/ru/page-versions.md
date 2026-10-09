# Сайт → Версии страниц

Модуль для работы с сохранениями и версиями страниц.

## `getVersions`

Возвращает версии страницы.

`GET /sites/{siteId}/pages/{pageId}/versions`

```typescript
const versions = await site.pages.getVersions(pageId);
```

**Вход**

| Поле     | Тип      | Описание    |
| -------- | -------- | ----------- |
| `pageId` | `number` | Id страницы |

**Ответ**

| Поле               | Тип       | Описание                          |
| ------------------ | --------- | --------------------------------- |
| `list`             | массив    | Версии                            |
| `list[].id`        | `number`  | Id версии                         |
| `list[].createdAt` | `string`  | Когда создана                     |
| `list[].isDraft`   | `boolean` | Версию ещё ни разу не публиковали |

## `getVersion`

Возвращает одну версию вместе с макетом.

`GET /sites/{siteId}/pages/{pageId}/versions/{versionId}`

```typescript
const version = await site.pages.getVersion(pageId, "published");
```

**Вход**

| Поле        | Тип           | Описание                                                              |
| ----------- | ------------- | --------------------------------------------------------------------- |
| `pageId`    | `number`      | Id страницы                                                           |
| `versionId` | `number`      | Id версии                                                             |
| `versionId` | `'published'` | Публичная версия                                                      |
| `versionId` | `'editor'`    | Версия, открытая в редакторе. Если такой нет, берётся публичная       |

**Ответ**

| Поле        | Тип                 | Описание                                                |
| ----------- | ------------------- | ------------------------------------------------------- |
| `id`        | `number`            | Id версии                                               |
| `createdAt` | `string`            | Когда создана                                           |
| `isDraft`   | `boolean`           | Версию ещё ни разу не публиковали                       |
| `data`      | `PageDataStructure` | Макет. Форма в разделе [Данные страницы](page-data.md)  |
| `abtests`   | массив              | A/B-тесты версии. Необязательно                         |

## `createVersion`

Создаёт версию страницы.

`POST /sites/{siteId}/pages/{pageId}/versions`

```typescript
const version = await site.pages.createVersion(pageId, { data: layout });
```

**Вход**

| Поле                | Тип                 | Описание                                           |
| ------------------- | ------------------- | -------------------------------------------------- |
| `pageId`            | `number`            | Id страницы                                        |
| `data`              | `PageDataStructure` | JSON макета. Обязательно                           |
| `assets.images`     | `number[]`          | Id картинок, которые использует версия             |
| `assets.files`      | `string[]`          | Пути файлов версии                                 |
| `assets.screenshot` | `number \| null`    | Id превью версии                                   |
| `publish`           | `boolean`           | Опубликовать сразу. Если не передан, API публикует |

**Ответ** тот же, что у `getVersion`.
