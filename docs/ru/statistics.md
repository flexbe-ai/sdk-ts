# Статистика

`site.stat` читает один A/B-тест и создаёт один.

```typescript
const test = await site.stat.createAbTest(pageId);
const again = await site.stat.getAbTest(test.id);
```

`AbTest` — это `{ id, pageId, createdAt, aCountView, aCountLead, bCountView, bCountLead }`. Id вариантов внутри JSON страницы — это `PageABTest` в разделе [Данные страницы](page-data.md). Счётчики здесь — просмотры и заявки этих вариантов.

## `getAbTest`

`GET /sites/{siteId}/stat-abtests/{testId}`

```typescript
getAbTest(testId: number): Promise<AbTest>
```

## `createAbTest`

`POST /sites/{siteId}/stat-abtests`

```typescript
createAbTest(pageId: number): Promise<AbTest>
```

Тело — `{ pageId }`.
