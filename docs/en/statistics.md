# Site → Statistics

`site.stat` is the module for project statistics.

```typescript
const test = await site.stat.createAbTest(pageId);
const again = await site.stat.getAbTest(test.id);
```

### `AbTest`

An A/B test of a page.

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` | Test id |
| `pageId` | `number` | Page id |
| `createdAt` | `string` | When it was created |
| `aCountView` | `number` | Views of variant A |
| `aCountLead` | `number` | Leads of variant A |
| `bCountView` | `number` | Views of variant B |
| `bCountLead` | `number` | Leads of variant B |

---

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

**Response** [`AbTest`](#abtest).

## `createAbTest`

Creates an A/B test for a page and returns it.

`POST /sites/{siteId}/stat-abtests`

```typescript
const test = await site.stat.createAbTest(pageId);
```

**Input**

| Field    | Type     | Description                    |
| -------- | -------- | ------------------------------ |
| `pageId` | `number` | Page id |

**Response** [`AbTest`](#abtest).
