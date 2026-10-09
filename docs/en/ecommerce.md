# site > Ecommerce

`site.ecommerce` is the catalog for one site: products, categories, and promotions. Every path starts at `/sites/{siteId}/ecommerce`.

```typescript
const catalog = site.ecommerce;
const products = await catalog.listProducts({
  limit: 20,
  status: ProductListStatus.VISIBLE,
});
```

Delivery, tax, stock messages, and the shared cart are `site.settings`, on [Settings](settings.md). Applying a promotion to one lead is [Leads](leads.md).

`visible`, `usePriceOld`, `isDefault`, and `notLimited` are `0` or `1`.

## Products

`Product` includes `id`, `name`, `description`, `visible`, `taxable`, `available`, `images`, `categoryIds`, `options`, `variants`, `usePriceOld`, `displayImage`, `price` (`{ min, max }`), `variantsQuantity`, `defaultVariantId`, `settings`, `sortIndex`, `isDemo`, and `deletedAt`.

A variant includes `id`, `productId`, `name` (string array), `optionValues` (`{ optionId, valueId }`), `vendorCode`, `quantity`, `price`, `priceOld`, `images`, `defaultImageId`, `visible`, `isDefault`, `notLimited`, and `deletedAt`.

### `listProducts`

Returns the products of the site.

`GET /sites/{siteId}/ecommerce/products`

```typescript
const products = await site.ecommerce.listProducts({ limit: 20, status: "visible" });
```

**Input**

| Field        | Type                                 | Description                                    |
| ------------ | ------------------------------------ | ---------------------------------------------- |
| `page`       | `number`                             | List page number. Optional                     |
| `limit`      | `number`                             | How many products per page. Optional           |
| `categoryId` | `number`                             | Only products in this category. Optional       |
| `search`     | `string`                             | Search by name. Optional                       |
| `productIds` | `number[]`                           | Sent as one comma-separated string. Optional   |
| `status`     | `'visible' \| 'hidden' \| 'removed'` | Which products to return. Optional             |
| `priceMin`   | `number`                             | Price from. Optional                           |
| `priceMax`   | `number`                             | Price to. Optional                             |

**Response**

| Field               | Type        | Description                      |
| ------------------- | ----------- | -------------------------------- |
| `list`              | `Product[]` | Products. Fields in the paragraph above |
| `pagination.limit`  | `number`    | Page size                        |
| `pagination.offset` | `number`    | Offset                           |
| `pagination.total`  | `number`    | Total rows                       |

### `getProduct`

Returns the product. A deleted product is not returned.

`GET /sites/{siteId}/ecommerce/products/{productId}`

```typescript
const product = await site.ecommerce.getProduct(productId);
```

**Input**

| Field       | Type     | Description |
| ----------- | -------- | ----------- |
| `productId` | `number` | Product id  |

**Response** `Product`. Fields in the paragraph above.

### `createProduct`

Creates a product. Options and variants go in this body.

`POST /sites/{siteId}/ecommerce/products`

```typescript
const product = await site.ecommerce.createProduct({ name: "Mug" });
```

**Input**

| Field                       | Type               | Description                                      |
| --------------------------- | ------------------ | ------------------------------------------------ |
| `name`                      | `string`           | Name. Required                                   |
| `description`               | `string`           | Description. Optional                            |
| `visible`                   | `number`           | `0` or `1`. Optional                             |
| `taxable`                   | `boolean`          | Tax applies. Optional                            |
| `images`                    | array              | Images. Optional                                 |
| `categoryIds`               | `number[]`         | Categories. Optional                             |
| `usePriceOld`               | `number`           | `0` or `1`. Optional                             |
| `displayImage`              | `string`           | Which image to show. Optional                    |
| `settings`                  | object             | Product settings. Optional                       |
| `options`                   | array              | Options. Optional                                |
| `options[].id`              | `number \| string` | Option id, when it already exists. Optional      |
| `options[].name`            | `string`           | Option name                                      |
| `options[].data`            | object             | Extra data. Optional                             |
| `options[].values`          | array              | Option values                                    |
| `options[].values[].id`     | `number \| string` | Value id. Optional                               |
| `options[].values[].name`   | `string`           | Value name                                       |
| `options[].values[].data`   | value              | Extra value data. Optional                       |
| `variants`                  | array              | Variants. Optional                               |
| `variants[].id`             | `number \| string` | Variant id. Optional                             |
| `variants[].optionValues`   | array              | `{ optionId, valueId }`, number or string        |
| `variants[].vendorCode`     | `string`           | SKU. Optional                                    |
| `variants[].quantity`       | `number \| null`   | Stock. Optional                                  |
| `variants[].price`          | `number \| null`   | Price. Optional                                  |
| `variants[].priceOld`       | `number \| null`   | Previous price. Optional                         |
| `variants[].images`         | array              | Variant images. Optional                         |
| `variants[].defaultImageId` | `string \| null`   | Default image. Optional                          |
| `variants[].visible`        | `number`           | `0` or `1`. Optional                             |
| `variants[].isDefault`      | `number`           | `0` or `1`. Optional                             |
| `variants[].notLimited`     | `number`           | `0` or `1`. Optional                             |

**Response** `Product`. Fields in the paragraph above.

### `updateProduct`

Updates a product. Same body as create, and `name` is required. A product from another site is left as it is.

`PATCH /sites/{siteId}/ecommerce/products/{productId}`

```typescript
const product = await site.ecommerce.updateProduct(productId, { name: "New name" });
```

**Input**

| Field       | Type     | Description                          |
| ----------- | -------- | ------------------------------------ |
| `productId` | `number` | Product id                           |
| body        | object   | The same fields as `createProduct`   |

**Response** `Product`. Fields in the paragraph above.

### `upsertProducts`

Creates and updates products in one batch. The body is `{ items }`. The API accepts up to 50 items. An item without `id` is created. An item with an `id` on this site is updated. One failed item does not stop the others.

`POST /sites/{siteId}/ecommerce/products/batch`

```typescript
const result = await site.ecommerce.upsertProducts([{ name: "Mug" }, { id: productId, name: "New name" }]);
```

**Input**

| Field   | Type                 | Description                                                                 |
| ------- | -------------------- | --------------------------------------------------------------------------- |
| `items` | `ProductUpsertItem[]`| Up to 50 items. Fields as in `createProduct`, plus an optional `id`         |

**Response**

| Field              | Type      | Description                    |
| ------------------ | --------- | ------------------------------ |
| `created`          | array     | What was created               |
| `created[].index`  | `number`  | Index of the input item        |
| `created[].product`| `Product` | Created product                |
| `updated`          | array     | What was updated               |
| `updated[].index`  | `number`  | Index of the input item        |
| `updated[].product`| `Product` | Updated product                |
| `errors`           | array     | What failed                    |
| `errors[].index`   | `number`  | Index of the input item        |
| `errors[].message` | `string`  | Error text                     |

### `bulkProducts`

Hides, shows, removes, restores, or purges products. A product from another site is left as it is.

`POST /sites/{siteId}/ecommerce/products/bulk`

```typescript
const result = await site.ecommerce.bulkProducts({ action: "hide", ids: [productId] });
```

**Input**

| Field    | Type                                                   | Description |
| -------- | ------------------------------------------------------ | ----------- |
| `action` | `'hide' \| 'show' \| 'remove' \| 'restore' \| 'purge'` | What to do  |
| `ids`    | `number[]`                                             | Product ids |

**Response**

| Field              | Type     | Description     |
| ------------------ | -------- | --------------- |
| `results`          | array    | One row per id  |
| `results[].id`     | `number` | Product id      |
| `results[].result` | `true`   | The call worked |

### `moveProduct`

Changes a product's order. Pass `categoryId` to reorder inside that category. Omit it to reorder the site list.

`PUT /sites/{siteId}/ecommerce/products/{productId}/position`

```typescript
const moved = await site.ecommerce.moveProduct(productId, { afterId: 10 });
```

**Input**

| Field        | Type     | Description                         |
| ------------ | -------- | ----------------------------------- |
| `productId`  | `number` | Product id                          |
| `categoryId` | `number` | Inside this category. Optional      |
| `beforeId`   | `number` | Place before this id. Optional      |
| `afterId`    | `number` | Place after this id. Optional       |

**Response**

| Field    | Type   | Description    |
| -------- | ------ | -------------- |
| `result` | `true` | Order changed  |

### `bindProductCategories`

Binds products to categories. A missing product or category is skipped.

`POST /sites/{siteId}/ecommerce/products/categories/bind`

```typescript
const result = await site.ecommerce.bindProductCategories({
  productIds: [productId],
  categoryIds: [categoryId],
});
```

**Input**

| Field         | Type       | Description  |
| ------------- | ---------- | ------------ |
| `productIds`  | `number[]` | Product ids  |
| `categoryIds` | `number[]` | Category ids |

**Response** the same `results` as `bulkProducts`.

### `unbindProductCategories`

Unbinds products from categories. Same body as bind.

`POST /sites/{siteId}/ecommerce/products/categories/unbind`

```typescript
const result = await site.ecommerce.unbindProductCategories({
  productIds: [productId],
  categoryIds: [categoryId],
});
```

**Input** the same as `bindProductCategories`.

**Response** the same `results` as `bulkProducts`.

### `queryVariants`

Looks up variants by id. The body is `{ ids }`. Ids from another site are left out of the result.

`POST /sites/{siteId}/ecommerce/variants/query`

```typescript
const found = await site.ecommerce.queryVariants([variantId]);
```

**Input**

| Field | Type       | Description  |
| ----- | ---------- | ------------ |
| `ids` | `number[]` | Variant ids  |

**Response** `VariantLookup[]`

| Field                  | Type     | Description                              |
| ---------------------- | -------- | ---------------------------------------- |
| `product`              | object   | Product slice                            |
| `product.id`           | `number` | Product id                               |
| `product.name`         | `string` | Name                                     |
| `product.options`      | array    | Options                                  |
| `product.images`       | array    | Images                                   |
| `product.displayImage` | `string` | Which image to show                      |
| `variant`              | object   | Variant. Fields in the paragraph above   |

## Categories

`Category` is `{ id, name, sortIndex, visible, isDemo, productCount }`. A list response also has `total`, `productCount`, and `removedProductCount` for the whole catalog.

### `listCategories`

Returns categories. Hidden ones are included unless you pass `includeHidden: false`.

`GET /sites/{siteId}/ecommerce/categories`

```typescript
const categories = await site.ecommerce.listCategories();
```

**Input**

| Field           | Type      | Description                              |
| --------------- | --------- | ---------------------------------------- |
| `includeHidden` | `boolean` | `false` drops the hidden ones. Optional  |

**Response**

| Field                 | Type         | Description                      |
| --------------------- | ------------ | -------------------------------- |
| `list`                | `Category[]` | Categories. Fields in the paragraph above |
| `total`               | `number`     | How many categories the catalog has |
| `productCount`        | `number`     | Products in the catalog          |
| `removedProductCount` | `number`     | Removed products in the catalog  |

### `createCategory`

Creates a category. Omit `visible` and the category is created visible (`1`).

`POST /sites/{siteId}/ecommerce/categories`

```typescript
const category = await site.ecommerce.createCategory({ name: "Tableware" });
```

**Input**

| Field     | Type     | Description              |
| --------- | -------- | ------------------------ |
| `name`    | `string` | Name. Required           |
| `visible` | `number` | `0` or `1`. Optional     |

**Response** `Category`. Fields in the paragraph above.

### `updateCategory`

Updates a category. A category from another site is left as it is.

`PATCH /sites/{siteId}/ecommerce/categories/{categoryId}`

```typescript
const category = await site.ecommerce.updateCategory(categoryId, { name: "New name" });
```

**Input**

| Field        | Type     | Description           |
| ------------ | -------- | --------------------- |
| `categoryId` | `number` | Category id           |
| `name`       | `string` | Name. Optional        |
| `visible`    | `number` | `0` or `1`. Optional  |

**Response** `Category`. Fields in the paragraph above.

### `sortCategories`

Reorders categories. `afterId` places the category after that id. Omit `afterId` to move it to the start.

`PUT /sites/{siteId}/ecommerce/categories/sort`

```typescript
const categories = await site.ecommerce.sortCategories({ categoryId, afterId: 3 });
```

**Input**

| Field        | Type     | Description                    |
| ------------ | -------- | ------------------------------ |
| `categoryId` | `number` | Which category to move. Required |
| `afterId`    | `number` | Place after this id. Optional  |

**Response** `Category[]` in the new order.

### `deleteCategory`

Deletes a category. `deleteProducts: true` also soft-deletes products in the category. The flag is a query parameter.

`DELETE /sites/{siteId}/ecommerce/categories/{categoryId}`

```typescript
const deleted = await site.ecommerce.deleteCategory(categoryId, { deleteProducts: true });
```

**Input**

| Field            | Type      | Description                                |
| ---------------- | --------- | ------------------------------------------ |
| `categoryId`     | `number`  | Category id                                |
| `deleteProducts` | `boolean` | Soft-delete products in the category. Optional |

**Response**

| Field    | Type   | Description        |
| -------- | ------ | ------------------ |
| `result` | `true` | Category deleted   |

## Promotions

`Promotion` is the catalog row: `id`, `type` (`discount` | `promocode`), `discountType` (`money` | `percent` | `delivery`), `code`, `discountAmount` (string), `deliveryFree`, `activeFrom`, `dateFrom`, `dateTo`, `availableCount`, `usageWithAnyDiscount`, `active`, `deletedAt`.

`PromotionWriteParams` requires `type`, `discountType`, `discountAmount`, and `active` (`boolean` or `number`). Optional: `code`, `deliveryFree` (`boolean`, `number`, or `null`), `activeFrom`, `dateFrom`, `dateTo`, `availableCount`, `usageWithAnyDiscount`.

### `listPromotions`

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
| `list` | `Promotion[]` | Promotions. Fields in the paragraph above |

### `createPromotion`

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

**Input**

| Field                  | Type                                 | Description                         |
| ---------------------- | ------------------------------------ | ----------------------------------- |
| `type`                 | `'discount' \| 'promocode'`          | Promotion kind. Required            |
| `discountType`         | `'money' \| 'percent' \| 'delivery'` | How the discount is counted. Required |
| `discountAmount`       | `string`                             | Discount size. Required             |
| `active`               | `boolean \| number`                  | Whether it is on. Required          |
| `code`                 | `string \| null`                     | Code. Optional                      |
| `deliveryFree`         | `boolean \| number \| null`          | Free shipping. Optional             |
| `activeFrom`           | `string \| null`                     | When it starts to apply. Optional   |
| `dateFrom`             | `string \| null`                     | Start date. Optional                |
| `dateTo`               | `string \| null`                     | End date. Optional                  |
| `availableCount`       | `number \| null`                     | How many times it can be used. Optional |
| `usageWithAnyDiscount` | `boolean \| number \| null`          | Together with other discounts. Optional |

**Response** `Promotion`. Fields in the paragraph above.

### `updatePromotion`

Updates a promotion. A promotion from another site is left as it is.

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
| `promotionId` | `number` | Promotion id                         |
| body          | object   | The same fields as `createPromotion` |

**Response** `Promotion`. Fields in the paragraph above.

### `deletePromotion`

Soft-deletes a promotion.

`DELETE /sites/{siteId}/ecommerce/promotions/{promotionId}`

```typescript
await site.ecommerce.deletePromotion(promotionId);
```

**Input**

| Field         | Type     | Description  |
| ------------- | -------- | ------------ |
| `promotionId` | `number` | Promotion id |

**Response**

No body.

### `getPromotionByCode`

Looks up a promotion that is still in the catalog. Pass the code as text, for example `SUMMER`. The client encodes it in the path.

`GET /sites/{siteId}/ecommerce/promotions/code/{code}`

```typescript
const promotion = await site.ecommerce.getPromotionByCode("SUMMER");
```

**Input**

| Field  | Type     | Description    |
| ------ | -------- | -------------- |
| `code` | `string` | Promotion code |

**Response** `Promotion`. Fields in the paragraph above.
