# Ecommerce

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

`GET /sites/{siteId}/ecommerce/products`

```typescript
listProducts(params?: ListProductsParams): Promise<ProductListResponse>
```

Returns `{ list, pagination }` with `{ limit, offset, total }`.

| Field                  | Notes                                          |
| ---------------------- | ---------------------------------------------- |
| `page`, `limit`        | Sent as those query keys                       |
| `categoryId`           |                                                |
| `search`               |                                                |
| `productIds`           | `number[]`, sent as one comma-separated string |
| `status`               | `visible`, `hidden`, or `removed`              |
| `priceMin`, `priceMax` |                                                |

### `getProduct`

`GET /sites/{siteId}/ecommerce/products/{productId}`

```typescript
getProduct(productId: number): Promise<Product>
```

Returns the product. A deleted product is not returned.

### `createProduct`

`POST /sites/{siteId}/ecommerce/products`

```typescript
createProduct(data: ProductWriteParams): Promise<Product>
```

`name` is required. Optional fields: `description`, `visible`, `taxable`, `images`, `categoryIds`, `usePriceOld`, `displayImage`, `settings`, `options`, `variants`. Options and variants go in this body.

An option is `{ id?, name, data?, values }`. A value is `{ id?, name, data? }`. A variant may set `id`, `optionValues` (`optionId` and `valueId` as number or string), `vendorCode`, `quantity`, `price`, `priceOld`, `images`, `defaultImageId`, `visible`, `isDefault`, and `notLimited`.

### `updateProduct`

`PATCH /sites/{siteId}/ecommerce/products/{productId}`

```typescript
updateProduct(productId: number, data: ProductWriteParams): Promise<Product>
```

Same body as create. `name` is required. A product from another site is left as it is.

### `upsertProducts`

`POST /sites/{siteId}/ecommerce/products/batch`

```typescript
upsertProducts(items: ProductUpsertItem[]): Promise<ProductUpsertResult>
```

Sends `{ items }`. The API accepts up to 50 items. An item without `id` is created. An item with an `id` on this site is updated. One failed item does not stop the others.

The result is `{ created, updated, errors }`. A hit is `{ index, product }`. An error is `{ index, message }`.

### `bulkProducts`

`POST /sites/{siteId}/ecommerce/products/bulk`

```typescript
bulkProducts(data: BulkProductsParams): Promise<BulkProductsResult>
```

`action` is `hide`, `show`, `remove`, `restore`, or `purge`. `ids` is `number[]`. Returns `{ results: { id, result: true }[] }`. A product from another site is left as it is.

### `moveProduct`

`PUT /sites/{siteId}/ecommerce/products/{productId}/position`

```typescript
moveProduct(productId: number, data: MoveProductParams): Promise<MoveProductResult>
```

`MoveProductParams` is `{ categoryId?, beforeId?, afterId? }`. Pass `categoryId` to reorder inside that category. Omit it to reorder the site list. Returns `{ result: true }`.

### `bindProductCategories`

`POST /sites/{siteId}/ecommerce/products/categories/bind`

```typescript
bindProductCategories(data: ChangeProductCategoriesParams): Promise<BulkProductsResult>
```

`ChangeProductCategoriesParams` is `{ productIds, categoryIds }`. A missing product or category is skipped.

### `unbindProductCategories`

`POST /sites/{siteId}/ecommerce/products/categories/unbind`

```typescript
unbindProductCategories(data: ChangeProductCategoriesParams): Promise<BulkProductsResult>
```

Same body as bind.

### `queryVariants`

`POST /sites/{siteId}/ecommerce/variants/query`

```typescript
queryVariants(ids: number[]): Promise<VariantLookup[]>
```

Sends `{ ids }`. Each hit is `{ product, variant }`. The product slice is `{ id, name, options, images, displayImage }`. Ids from another site are left out of the result.

## Categories

`Category` is `{ id, name, sortIndex, visible, isDemo, productCount }`. A list response also has `total`, `productCount`, and `removedProductCount` for the whole catalog.

### `listCategories`

`GET /sites/{siteId}/ecommerce/categories`

```typescript
listCategories(params?: ListCategoriesParams): Promise<CategoryListResponse>
```

Hidden categories are included unless you pass `includeHidden: false`.

### `createCategory`

`POST /sites/{siteId}/ecommerce/categories`

```typescript
createCategory(data: CreateCategoryParams): Promise<Category>
```

`name` is required. `visible` is an optional `0` or `1`. Omit it and the category is created visible (`1`).

### `updateCategory`

`PATCH /sites/{siteId}/ecommerce/categories/{categoryId}`

```typescript
updateCategory(categoryId: number, data: UpdateCategoryParams): Promise<Category>
```

`name` and `visible` are both optional. A category from another site is left as it is.

### `sortCategories`

`PUT /sites/{siteId}/ecommerce/categories/sort`

```typescript
sortCategories(data: SortCategoriesParams): Promise<Category[]>
```

`categoryId` is required. `afterId` places the category after that id. Omit `afterId` to move it to the start. Returns the categories in their new order.

### `deleteCategory`

`DELETE /sites/{siteId}/ecommerce/categories/{categoryId}`

```typescript
deleteCategory(categoryId: number, params?: DeleteCategoryParams): Promise<DeleteCategoryResult>
```

`deleteProducts: true` also soft-deletes products in the category. The flag is a query parameter. Returns `{ result: true }`.

## Promotions

`Promotion` is the catalog row: `id`, `type` (`discount` | `promocode`), `discountType` (`money` | `percent` | `delivery`), `code`, `discountAmount` (string), `deliveryFree`, `activeFrom`, `dateFrom`, `dateTo`, `availableCount`, `usageWithAnyDiscount`, `active`, `deletedAt`.

`PromotionWriteParams` requires `type`, `discountType`, `discountAmount`, and `active` (`boolean` or `number`). Optional: `code`, `deliveryFree` (`boolean`, `number`, or `null`), `activeFrom`, `dateFrom`, `dateTo`, `availableCount`, `usageWithAnyDiscount`.

### `listPromotions`

`GET /sites/{siteId}/ecommerce/promotions`

```typescript
listPromotions(): Promise<PromotionListResponse>
```

Returns `{ list }`. Soft-deleted rows are omitted.

### `createPromotion`

`POST /sites/{siteId}/ecommerce/promotions`

```typescript
createPromotion(data: PromotionWriteParams): Promise<Promotion>
```

### `updatePromotion`

`PATCH /sites/{siteId}/ecommerce/promotions/{promotionId}`

```typescript
updatePromotion(promotionId: number, data: PromotionWriteParams): Promise<Promotion>
```

A promotion from another site is left as it is.

### `deletePromotion`

`DELETE /sites/{siteId}/ecommerce/promotions/{promotionId}`

```typescript
deletePromotion(promotionId: number): Promise<void>
```

Soft-delete.

### `getPromotionByCode`

`GET /sites/{siteId}/ecommerce/promotions/code/{code}`

```typescript
getPromotionByCode(code: string): Promise<Promotion>
```

Looks up a promotion that is still in the catalog. Pass the code as text, for example `SUMMER`. The client encodes it in the path.
