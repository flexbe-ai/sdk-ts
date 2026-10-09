# Statistics

`site.stat` reads one A/B test and creates one.

```typescript
const test = await site.stat.createAbTest(pageId);
const again = await site.stat.getAbTest(test.id);
```

`AbTest` is `{ id, pageId, createdAt, aCountView, aCountLead, bCountView, bCountLead }`. Variant ids inside the page JSON are `PageABTest` on [Page data](page-data.md). The counters here are views and leads for those variants.

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

The body is `{ pageId }`.
