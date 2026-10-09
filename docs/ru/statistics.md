# site > Статистика

`site.stat` читает один A/B-тест и создаёт один.

```typescript
const test = await site.stat.createAbTest(pageId);
const again = await site.stat.getAbTest(test.id);
```

`AbTest` — это `{ id, pageId, createdAt, aCountView, aCountLead, bCountView, bCountLead }`. Id вариантов внутри JSON страницы — это `PageABTest` в разделе [Данные страницы](page-data.md). Счётчики здесь — просмотры и заявки этих вариантов.

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

**Ответ** `AbTest`. Поля в абзаце выше.

## `createAbTest`

Создаёт A/B-тест для страницы и возвращает его.

`POST /sites/{siteId}/stat-abtests`

```typescript
const test = await site.stat.createAbTest(pageId);
```

**Вход**

| Поле     | Тип      | Описание   |
| -------- | -------- | ---------- |
| `pageId` | `number` | Id страницы. Тело — `{ pageId }` |

**Ответ** `AbTest`. Поля в абзаце выше.
