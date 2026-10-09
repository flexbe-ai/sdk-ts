# Сайт → Статистика

`site.stat` — модуль для получения статистики проекта.

```typescript
const test = await site.stat.createAbTest(pageId);
const again = await site.stat.getAbTest(test.id);
```

## `AbTest`

A/B-тест страницы.

| Поле | Тип | Описание |
| --- | --- | --- |
| `id` | `number` | Id теста |
| `pageId` | `number` | Id страницы |
| `createdAt` | `string` | Когда создали |
| `aCountView` | `number` | Просмотры варианта A |
| `aCountLead` | `number` | Заявки варианта A |
| `bCountView` | `number` | Просмотры варианта B |
| `bCountLead` | `number` | Заявки варианта B |

## `getAbTest`

Возвращает один A/B-тест.

`GET /sites/{siteId}/stat-abtests/{testId}`

```typescript
const test = await site.stat.getAbTest(testId);
```

**Вход**

| Поле     | Тип      | Описание |
| -------- | -------- | -------- |
| `testId` | `number` | Id теста |

**Ответ** [`AbTest`](#abtest).

## `createAbTest`

Создаёт A/B-тест для страницы и возвращает его.

`POST /sites/{siteId}/stat-abtests`

```typescript
const test = await site.stat.createAbTest(pageId);
```

**Вход**

| Поле     | Тип      | Описание   |
| -------- | -------- | ---------- |
| `pageId` | `number` | Id страницы |

**Ответ** [`AbTest`](#abtest).
