# site > Statistics

`site.stat` reads one A/B test and creates one.

```typescript
const test = await site.stat.createAbTest(pageId);
const again = await site.stat.getAbTest(test.id);
```

`AbTest` is `{ id, pageId, createdAt, aCountView, aCountLead, bCountView, bCountLead }`. Variant ids inside the page JSON are `PageABTest` on [Page data](page-data.md). The counters here are views and leads for those variants.

## `getAbTest`

Returns one A/B test.

`GET /sites/{siteId}/stat-abtests/{testId}`

```typescript
const test = await site.stat.getAbTest(testId);
```

**Input**

| Field    | Type     | Description |
| -------- | -------- | ----------- |
| `testId` | `number` | Test id     |

**Response** `AbTest`. Fields in the paragraph above.

## `createAbTest`

Creates an A/B test for a page and returns it.

`POST /sites/{siteId}/stat-abtests`

```typescript
const test = await site.stat.createAbTest(pageId);
```

**Input**

| Field    | Type     | Description                    |
| -------- | -------- | ------------------------------ |
| `pageId` | `number` | Page id. The body is `{ pageId }` |

**Response** `AbTest`. Fields in the paragraph above.
