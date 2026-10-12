# Сайт → Страницы

Модуль для работы со списком страниц.

```typescript
const site = client.getSiteApi(siteId);
const pages = await site.pages.getPages({ limit: 10, offset: 0 });
```

Макет в этом объекте не лежит. Он приходит в `PageVersionDataResponse.data`.

### `Page`

| Поле               | Тип                  | Описание                                                        |
| ------------------ | -------------------- | --------------------------------------------------------------- |
| `id`               | `number`             | Id страницы                                                     |
| `versionId`        | `number \| null`     | Id текущей версии                                               |
| `editorVersionId`  | `number \| null`     | Последняя версия, открытая в редакторе. `null` у старых страниц |
| `type`             | `PageType`           | Вид страницы. [`PageType`](#pagetype)                                     |
| `status`           | `PageStatus`         | Статус. [`PageStatus`](#pagestatus)                                           |
| `name`             | `string`             | Название                                                        |
| `uri`              | `string \| null`     | Адрес                                                           |
| `language`         | `string`             | Язык страницы                                                   |
| `folderId`         | `number`             | Папка                                                           |
| `sortIndex`        | `number`             | Порядок в списке                                                |
| `themeId`          | `number`             | Тема                                                            |
| `updatedAt`        | `string`             | Когда карточку меняли                                           |
| `deletedAt`        | `string \| null`     | Когда удалили. `null`, если страница на месте                   |
| `screenshot`       | `Screenshot \| null` | Превью. [`Screenshot`](#screenshot)                                               |
| `meta`             | `PageMeta \| null`   | SEO страницы. [`PageMeta`](#pagemeta)                                         |

### `Screenshot`

| Поле  | Тип              | Описание          |
| ----- | ---------------- | ----------------- |
| `id`  | `number \| null` | Id картинки превью |
| `ext` | `string`         | Расширение        |
| `url` | `string \| null` | Адрес превью      |

### `PageType`

| Значение               | Описание            |
| ---------------------- | ------------------- |
| `page`                 | Обычная страница    |
| `file`                 | Файл                |
| `global`               | Глобальная страница |
| `ai`                   | Страница AI         |
| `cms`                  | Страница CMS        |
| `ecommerce_product`    | Страница товара     |
| `ecommerce_category`   | Страница категории  |

### `PageStatus`

| Значение    | Описание                                      |
| ----------- | --------------------------------------------- |
| `published` | Опубликована                                  |
| `drafted`   | Черновик                                      |
| `removed`   | Пользователь убрал страницу                   |
| `deleted`   | Пользователь удалил страницу из удалённых     |

### `PageMeta`

| Поле             | Тип                            | Описание                         |
| ---------------- | ------------------------------ | -------------------------------- |
| `title`          | `string \| null`               | Заголовок                        |
| `description`    | `string \| null`               | Описание                         |
| `keywords`       | `string \| null`               | Ключевые слова                   |
| `ogImage`        | `string \| null`               | Картинка Open Graph              |
| `ogTitle`        | `string \| null`               | Заголовок Open Graph             |
| `ogDescription`  | `string \| null`               | Описание Open Graph              |
| `noindex`        | `boolean`                      | Закрыть страницу от индексации   |
| `schemaMarkup`   | `PageSchemaMarkup \| null`     | Разметка schema.org. Необязательно |

### `PageSchemaMarkup`

| Поле          | Тип              | Описание                                      |
| ------------- | ---------------- | --------------------------------------------- |
| `data`        | `unknown`        | Тело разметки                                 |
| `updatedAt`   | `string \| null` | Когда разметку обновляли                      |
| `genProducts` | `boolean`        | Генерировать разметку товаров. Необязательно  |

---

## `getPages`

Возвращает список страниц сайта.

`GET /sites/{siteId}/pages`

```typescript
const pages = await site.pages.getPages({ offset: 0, limit: 20 });
```

**Вход**

| Поле       | Тип                          | Описание                                                      |
| ---------- | ---------------------------- | ------------------------------------------------------------- |
| `offset`   | `number`                     | Сколько элементов пропустить. По умолчанию 0                  |
| `limit`    | `number`                     | Сколько вернуть. По умолчанию 100                             |
| `type`     | `PageType` или массив        | Один тип или несколько. Массив уходит строкой через запятую   |
| `status`   | `PageStatus` или массив      | Один статус или несколько, та же запятая                      |
| `uri`      | `string`                     | Точное совпадение с `'/'` или частичное, например `'%word%'`  |
| `folderId` | `number`                     | Id папки                                                      |
| `themeId`  | `number`                     | Id темы                                                       |

**Ответ**

| Поле                | Тип      | Описание                    |
| ------------------- | -------- | --------------------------- |
| `list`              | `Page[]` | [`Page`](#page) |
| `pagination.limit`  | `number` | Размер страницы             |
| `pagination.offset` | `number` | Смещение                    |
| `pagination.total`  | `number` | Всего записей               |

## `getPage`

Возвращает одну страницу.

`GET /sites/{siteId}/pages/{pageId}`

```typescript
const page = await site.pages.getPage(pageId);
```

**Вход**

| Поле     | Тип      | Описание    |
| -------- | -------- | ----------- |
| `pageId` | `number` | Id страницы |

**Ответ** [`Page`](#page).

## `createPage`

Создаёт страницу или глобальную секцию.

`POST /sites/{siteId}/pages`

```typescript
const page = await site.pages.createPage({ templateId: 12, name: "О нас" });
const section = await site.pages.createPage({
  type: "global",
  name: "Шапка",
  blocks: [],
});
```

**Вход, `type` не передан или `page`**

| Поле           | Тип              | Описание                                              |
| -------------- | ---------------- | ----------------------------------------------------- |
| `type`         | `'page'`         | Обычная страница. Необязательно                       |
| `templateId`   | `number`         | Шаблон для клона. Необязательно                       |
| `sourcePageId` | `number`         | Страница для клона. Необязательно                     |
| `name`         | `string`         | Название. Необязательно                               |
| `uri`          | `string`         | Адрес. Необязательно                                  |
| `folderId`     | `number \| null` | Папка. Необязательно                                  |

`templateId` и `sourcePageId` вместе не передаются. Если нет обоих, создаётся пустая страница.

**Вход, `type: 'global'`**

| Поле          | Тип              | Описание                         |
| ------------- | ---------------- | -------------------------------- |
| `type`        | `'global'`       | Глобальная секция                |
| `name`        | `string`         | Название. Необязательно          |
| `folderId`    | `number \| null` | Папка. Необязательно             |
| `themeId`     | `number \| null` | Тема. Необязательно              |
| `is`          | `string`         | Тип сущности макета. Необязательно |
| `template_id` | `string`         | Шаблон макета. Необязательно     |
| `blocks`      | массив           | Блоки макета. Необязательно      |
| `modals`      | массив           | Модалки макета. Необязательно    |
| `widgets`     | массив           | Виджеты макета. Необязательно    |

**Ответ** [`Page`](#page).

## `copyPage`

Копирует одну страницу.

`POST /sites/{siteId}/pages/{pageId}/copy`

```typescript
const copy = await site.pages.copyPage(pageId, { name: "Копия" });
```

**Вход**

| Поле           | Тип              | Описание                         |
| -------------- | ---------------- | -------------------------------- |
| `pageId`       | `number`         | Какую страницу копировать        |
| `name`         | `string`         | Название копии. Обязательно      |
| `uri`          | `string`         | Адрес копии. Необязательно       |
| `folderId`     | `number \| null` | Папка. Необязательно             |
| `targetSiteId` | `number`         | Копия на другой сайт. Необязательно |

**Ответ** [`Page`](#page).

## `copyPages`

Копирует несколько страниц.

`POST /sites/{siteId}/pages/copy`

```typescript
const copied = await site.pages.copyPages({ pageIds: [1, 2] });
```

**Вход**

| Поле           | Тип        | Описание                         |
| -------------- | ---------- | -------------------------------- |
| `pageIds`      | `number[]` | Какие страницы копировать        |
| `folderId`     | `number`   | Папка для копий. Необязательно   |
| `targetSiteId` | `number`   | Копии на другой сайт. Необязательно |

**Ответ**

| Поле     | Тип      | Описание |
| -------- | -------- | -------- |
| `pages`  | `Page[]` | Копии    |

## `updatePage`

Меняет параметры страницы.

`PUT /sites/{siteId}/pages/{pageId}`

```typescript
const page = await site.pages.updatePage(pageId, { name: "Новое имя" });
```

**Вход**

| Поле              | Тип          | Описание                                                                                                                        |
| ----------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `pageId`          | `number`     | Id страницы                                                                                                                     |
| `status`          | `PageStatus` | Новый статус                                                                                                                    |
| `versionId`       | `number`     | Делает эту версию текущей                                                                                                       |
| `editorVersionId` | `number`     | Версия, открытая в редакторе                                                                                                    |
| `name`            | `string`     | Название, до 150 символов                                                                                                       |
| `uri`             | `string`     | Адрес, до 255 символов. API нормализует слэш в начале и в конце                                                                 |
| `language`        | `string`     | Язык страницы                                                                                                                   |
| `folderId`        | `number`     | Папка                                                                                                                           |
| `sortIndex`       | `number`     | Порядок в списке                                                                                                                |
| `meta`            | `PageMeta`   | Частичный. Заголовок и Open Graph title: 200 символов. Описание, keywords и Open Graph description: 1000 символов                |

**Ответ** [`Page`](#page).

Чтобы менять версии и данные страницы, смотрите [Версии страниц](page-versions.md) и [Данные страницы](page-data.md).

## `deletePage`

Удаляет страницу.

`DELETE /sites/{siteId}/pages/{pageId}`

```typescript
await site.pages.deletePage(pageId);
```

**Вход**

| Поле     | Тип      | Описание    |
| -------- | -------- | ----------- |
| `pageId` | `number` | Id страницы |

## `bulkUpdatePages`

Меняет несколько страниц. Если не прошёл ни один элемент, API отвечает 400.

`PATCH /sites/{siteId}/pages`

```typescript
const result = await site.pages.bulkUpdatePages([{ id: pageId, name: "Новое имя" }]);
```

**Вход**

Тело — сам массив. Каждый элемент — поля `updatePage` плюс `id` страницы.

**Ответ**

| Поле      | Тип                  | Описание                    |
| --------- | -------------------- | --------------------------- |
| `updated` | `Page[]`             | Страницы, которые изменились |
| `errors`  | `{ id, code, message }[]` | Что не изменилось      |

## `bulkDeletePages`

Удаляет несколько страниц. Если не удалился ни один id, API отвечает 400.

`DELETE /sites/{siteId}/pages`

```typescript
const result = await site.pages.bulkDeletePages([pageId]);
```

**Вход**

| Поле  | Тип        | Описание          |
| ----- | ---------- | ----------------- |
| `ids` | `number[]` | Id страниц. Тело — `{ ids }` |

**Ответ**

| Поле      | Тип                  | Описание              |
| --------- | -------------------- | --------------------- |
| `deleted` | `number[]`           | Id, которые удалились |
| `errors`  | `{ id, code, message }[]` | Что не удалилось |

## Папки

Папка — `{ id, name, sortIndex }`.

## `getFolders`

Возвращает папки сайта.

`GET /sites/{siteId}/pages-folders`

```typescript
const folders = await site.pages.getFolders();
```

**Вход**

Параметров нет.

**Ответ**

| Поле   | Тип            | Описание |
| ------ | -------------- | -------- |
| `list` | `PageFolder[]` | Папки. У папки `id`, `name`, `sortIndex` |

## `getFolder`

Возвращает одну папку.

`GET /sites/{siteId}/pages-folders/{id}`

```typescript
const folder = await site.pages.getFolder(folderId);
```

**Вход**

| Поле | Тип      | Описание |
| ---- | -------- | -------- |
| `id` | `number` | Id папки |

**Ответ** `PageFolder`: `id`, `name`, `sortIndex`.

## `createFolder`

Создаёт папку.

`POST /sites/{siteId}/pages-folders`

```typescript
const folder = await site.pages.createFolder({ name: "Услуги" });
```

**Вход**

| Поле        | Тип      | Описание                              |
| ----------- | -------- | ------------------------------------- |
| `name`      | `string` | Название, не длиннее 50 символов. Обязательно |
| `sortIndex` | `number` | Порядок, от 0. Необязательно          |

**Ответ** `PageFolder`: `id`, `name`, `sortIndex`.

## `updateFolder`

Меняет папку. `name` и `sortIndex` оба необязательны.

`PATCH /sites/{siteId}/pages-folders/{id}`

```typescript
const folder = await site.pages.updateFolder(folderId, { name: "Новое имя" });
```

**Вход**

| Поле        | Тип      | Описание                     |
| ----------- | -------- | ---------------------------- |
| `id`        | `number` | Id папки                     |
| `name`      | `string` | Название. Необязательно      |
| `sortIndex` | `number` | Порядок. Необязательно       |

**Ответ** `PageFolder`: `id`, `name`, `sortIndex`.

## `deleteFolder`

Удаляет папку и её содержимое.

`DELETE /sites/{siteId}/pages-folders/{id}`

```typescript
await site.pages.deleteFolder(folderId);
```

**Вход**

| Поле | Тип      | Описание |
| ---- | -------- | -------- |
| `id` | `number` | Id папки |

## `bulkUpdateFolders`

Меняет несколько папок. Если не прошла ни одна, API отвечает 400.

`PATCH /sites/{siteId}/pages-folders`

```typescript
const result = await site.pages.bulkUpdateFolders([{ id: folderId, name: "Новое имя" }]);
```

**Вход**

Тело — сам массив. Каждый элемент — `{ id, name?, sortIndex? }`.

**Ответ**

| Поле      | Тип                  | Описание                 |
| --------- | -------------------- | ------------------------ |
| `updated` | `PageFolder[]`       | Папки, которые изменились |
| `errors`  | `{ id, code, message }[]` | Что не изменилось   |

## Что дальше

| Раздел | Описание |
| ------ | -------- |
| [Версии страниц](page-versions.md) | Читать и сохранять версии |
| [Данные страницы](page-data.md) | JSON макета |
