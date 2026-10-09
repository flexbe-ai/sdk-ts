# Site → Promotions

The methods are on `site.ecommerce`.

## `Promotion`

A catalog promotion.

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` | Promotion id |
| `type` | `'discount' \| 'promocode'` | Kind of promotion |
| `discountType` | `'money' \| 'percent' \| 'delivery'` | How the discount is calculated |
| `code` | `string \| null` | Code |
| `discountAmount` | `string` | Discount amount |
| `deliveryFree` | `boolean \| null` | Free delivery |
| `activeFrom` | `string` | When it starts to apply |
| `dateFrom` | `string \| null` | Start date |
| `dateTo` | `string \| null` | End date |
| `availableCount` | `number \| null` | How many times it can be used |
| `usageWithAnyDiscount` | `boolean \| null` | Together with other discounts |
| `active` | `boolean` | Enabled |
| `deletedAt` | `string \| null` | When it was deleted |

## `listPromotions`

Returns catalog promotions. Soft-deleted rows are omitted.

`GET /sites/{siteId}/ecommerce/promotions`

```typescript
const promotions = await site.ecommerce.listPromotions();
```

**Input**

No parameters.

**Response**

| Field  | Type          | Description                       |
| ------ | ------------- | --------------------------------- |
| `list` | [`Promotion[]`](#promotion) | Promotions |

## `PromotionWriteParams`

Fields for creating and updating a promotion.

| Field | Type | Description |
| --- | --- | --- |
| `type` | `'discount' \| 'promocode'` | Kind of promotion. Required |
| `discountType` | `'money' \| 'percent' \| 'delivery'` | How the discount is calculated. Required |
| `discountAmount` | `string` | Discount amount. Required |
| `active` | `boolean \| number` | Enabled. Required |
| `code` | `string \| null` | Code. Optional |
| `deliveryFree` | `boolean \| number \| null` | Free delivery. Optional |
| `activeFrom` | `string \| null` | When it starts to apply. Optional |
| `dateFrom` | `string \| null` | Start date. Optional |
| `dateTo` | `string \| null` | End date. Optional |
| `availableCount` | `number \| null` | How many times it can be used. Optional |
| `usageWithAnyDiscount` | `boolean \| number \| null` | Together with other discounts. Optional |

## `createPromotion`

Creates a promotion.

`POST /sites/{siteId}/ecommerce/promotions`

```typescript
const promotion = await site.ecommerce.createPromotion({
  type: "promocode",
  discountType: "percent",
  discountAmount: "10",
  active: true,
  code: "SUMMER",
});
```

**Input** [`PromotionWriteParams`](#promotionwriteparams).

**Response** [`Promotion`](#promotion).

## `updatePromotion`

Updates a promotion.

`PATCH /sites/{siteId}/ecommerce/promotions/{promotionId}`

```typescript
const promotion = await site.ecommerce.updatePromotion(promotionId, {
  type: "promocode",
  discountType: "percent",
  discountAmount: "15",
  active: true,
});
```

**Input**

| Field         | Type     | Description                          |
| ------------- | -------- | ------------------------------------ |
| `promotionId` | `number` | Promotion id |
| body          | [`PromotionWriteParams`](#promotionwriteparams) | |

**Response** [`Promotion`](#promotion).

## `deletePromotion`

Soft-deletes a promotion.

`DELETE /sites/{siteId}/ecommerce/promotions/{promotionId}`

```typescript
await site.ecommerce.deletePromotion(promotionId);
```

**Input**

| Field         | Type     | Description  |
| ------------- | -------- | ------------ |
| `promotionId` | `number` | Promotion id |

## `getPromotionByCode`

Looks up a promotion that is still in the catalog. Pass the code as text, for example `SUMMER`. The client encodes it in the path.

`GET /sites/{siteId}/ecommerce/promotions/code/{code}`

```typescript
const promotion = await site.ecommerce.getPromotionByCode("SUMMER");
```

**Input**

| Field  | Type     | Description    |
| ------ | -------- | -------------- |
| `code` | `string` | Promotion code |

**Response** [`Promotion`](#promotion).
