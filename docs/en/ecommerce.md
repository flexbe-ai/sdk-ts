# Site → Ecommerce

`site.ecommerce` is the catalog for one site: products and categories.

```typescript
const catalog = site.ecommerce;
const products = await catalog.listProducts({
  limit: 20,
  status: ProductListStatus.VISIBLE,
});
```

## Products

### `Product`

A product card.

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` | Product id |
| `name` | `string` | Name |
| `description` | `string` | Description |
| `visible` | `boolean` | Shown |
| `taxable` | `boolean` | Tax applies |
| `available` | `boolean` | Can be bought |
| `images` | array | Images |
| `categoryIds` | `number[]` | Categories |
| `options` | [`ProductOption[]`](#productoption) | Options |
| `variants` | [`ProductVariant[]`](#productvariant) | Variants |
| `usePriceOld` | `boolean` | Show the previous price |
| `displayImage` | `string` | Which image to show |
| `price` | [`ProductPrice`](#productprice) | Price range |
| `variantsQuantity` | `number` | Sum of positive stock |
| `defaultVariantId` | `number` | Default variant id. `0` when there is none |
| `settings` | object | Product settings |
| `sortIndex` | `number` | Order |
| `isDemo` | `boolean` | Demo product |
| `deletedAt` | `string \| null` | When it was deleted |

### `ProductOption`

A product option.

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` | Option id |
| `name` | `string` | Name |
| `sortIndex` | `number` | Order |
| `values` | [`ProductOptionValue[]`](#productoptionvalue) | Values |
| `data` | object or `null` | Extra data |

### `ProductOptionValue`

An option value.

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` | Value id |
| `name` | `string` | Name |
| `data` | value | Extra data |
| `sortIndex` | `number` | Order |

### `ProductVariant`

A product variant.

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` | Variant id |
| `productId` | `number` | Product id |
| `name` | `string[]` | Option value names |
| `optionValues` | [`VariantOptionValueRef[]`](#variantoptionvalueref) | Links to option values |
| `vendorCode` | `string` | SKU |
| `quantity` | `number \| null` | Stock |
| `price` | `number \| null` | Price |
| `priceOld` | `number \| null` | Previous price |
| `images` | array | Images |
| `defaultImageId` | `string \| null` | Default image |
| `visible` | `boolean` | Shown |
| `isDefault` | `boolean` | Default variant |
| `notLimited` | `boolean` | Stock is not limited |
| `deletedAt` | `string \| null` | When it was deleted |

### `VariantOptionValueRef`

A link from a variant to an option value.

| Field | Type | Description |
| --- | --- | --- |
| `optionId` | `number` | Option id |
| `valueId` | `number` | Value id |

### `ProductOptionInput`

An option in the request body.

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number \| string` | Option id, when it already exists. Optional |
| `name` | `string` | Name |
| `data` | object or `null` | Extra data. Optional |
| `values` | [`ProductOptionValueInput[]`](#productoptionvalueinput) | Values |

### `ProductOptionValueInput`

An option value in the request body.

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number \| string` | Value id. Optional |
| `name` | `string` | Name |
| `data` | value | Extra data. Optional |

### `ProductVariantInput`

A variant in the request body.

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number \| string` | Variant id. Optional |
| `optionValues` | [`optionValues`](#optionvalues)[] | Optional |
| `vendorCode` | `string` | SKU. Optional |
| `quantity` | `number \| null` | Stock. Optional |
| `price` | `number \| null` | Price. Optional |
| `priceOld` | `number \| null` | Previous price. Optional |
| `images` | array | Images. Optional |
| `defaultImageId` | `string \| null` | Default image. Optional |
| `visible` | `boolean` | Shown. Optional |
| `isDefault` | `boolean` | Default variant. Optional |
| `notLimited` | `boolean` | Stock is not limited. Optional |

### `optionValues`

An option and value pair in the variant body.

| Field | Type | Description |
| --- | --- | --- |
| `optionId` | `number \| string` | Option id |
| `valueId` | `number \| string` | Value id |

### `ProductPrice`

Price range of the variants.

| Field | Type | Description |
| --- | --- | --- |
| `min` | `number \| null` | Lowest price |
| `max` | `number \| null` | Highest price |

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
| `list`              | [`Product[]`](#product) | Products |
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

**Response** [`Product`](#product).

### `ProductWriteParams`

Fields for creating and updating a product.

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | Name. Required |
| `description` | `string` | Description. Optional |
| `visible` | `boolean` | Shown. Optional |
| `taxable` | `boolean` | Tax applies. Optional |
| `images` | array | Images. Optional |
| `categoryIds` | `number[]` | Categories. Optional |
| `usePriceOld` | `boolean` | Show the previous price. Optional |
| `displayImage` | `string` | Which image to show. Optional |
| `settings` | object | Product settings. Optional |
| `options` | [`ProductOptionInput[]`](#productoptioninput) | Options. Optional |
| `variants` | [`ProductVariantInput[]`](#productvariantinput) | Variants. Optional |

### `createProduct`

Creates a product.

`POST /sites/{siteId}/ecommerce/products`

```typescript
const product = await site.ecommerce.createProduct({ name: "Mug" });
```

**Input** [`ProductWriteParams`](#productwriteparams).

**Response** [`Product`](#product).

### `updateProduct`

Updates a product. `name` is required. A product from another site is left as it is.

`PATCH /sites/{siteId}/ecommerce/products/{productId}`

```typescript
const product = await site.ecommerce.updateProduct(productId, { name: "New name" });
```

**Input**

| Field       | Type     | Description                          |
| ----------- | -------- | ------------------------------------ |
| `productId` | `number` | Product id |
| body        | [`ProductWriteParams`](#productwriteparams) | |

**Response** [`Product`](#product).

### `upsertProducts`

Creates and updates products in one batch. The API accepts up to 50 items. An item without `id` is created. An item with an `id` on this site is updated. One failed item does not stop the others.

`POST /sites/{siteId}/ecommerce/products/batch`

```typescript
const result = await site.ecommerce.upsertProducts([{ name: "Mug" }, { id: productId, name: "New name" }]);
```

**Input**

| Field | Type | Description |
| --- | --- | --- |
| `items` | [`ProductUpsertItem[]`](#productupsertitem) | Up to 50 items |

**Response** [`ProductUpsertResult`](#productupsertresult).

### `ProductUpsertItem`

One batch item. Without `id` the product is created. With an `id` on this site it is updated.

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` | Product id. Optional |
| `name` | `string` | Name. Required |
| `description` | `string` | Description. Optional |
| `visible` | `boolean` | Shown. Optional |
| `taxable` | `boolean` | Tax applies. Optional |
| `images` | array | Images. Optional |
| `categoryIds` | `number[]` | Categories. Optional |
| `usePriceOld` | `boolean` | Show the previous price. Optional |
| `displayImage` | `string` | Which image to show. Optional |
| `settings` | object | Product settings. Optional |
| `options` | [`ProductOptionInput[]`](#productoptioninput) | Options. Optional |
| `variants` | [`ProductVariantInput[]`](#productvariantinput) | Variants. Optional |

### `ProductUpsertResult`

Batch result.

| Field | Type | Description |
| --- | --- | --- |
| `created` | [`ProductUpsertHit[]`](#productupserthit) | What was created |
| `updated` | [`ProductUpsertHit[]`](#productupserthit) | What was updated |
| `errors` | [`ProductUpsertError[]`](#productupserterror) | What failed |

### `ProductUpsertHit`

| Field | Type | Description |
| --- | --- | --- |
| `index` | `number` | Index of the input item |
| `product` | [`Product`](#product) | Product |

### `ProductUpsertError`

| Field | Type | Description |
| --- | --- | --- |
| `index` | `number` | Index of the input item |
| `message` | `string` | Error text |

### `bulkProducts`

Runs a bulk action on products.

`POST /sites/{siteId}/ecommerce/products/bulk`

```typescript
const result = await site.ecommerce.bulkProducts({ action: "hide", ids: [productId] });
```

**Input**

| Field    | Type                                                   | Description |
| -------- | ------------------------------------------------------ | ----------- |
| `action` | `'hide' \| 'show' \| 'remove' \| 'restore' \| 'purge'` | What to do  |
| `ids`    | `number[]`                                             | Product ids |

**Response** [`BulkProductsResult`](#bulkproductsresult).

### `BulkProductsResult`

| Field | Type | Description |
| --- | --- | --- |
| `results` | [`BulkProductResult[]`](#bulkproductresult) | One row per id |

### `BulkProductResult`

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` | Product id |
| `result` | `true` | The call worked |

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

**Response** [`MoveProductResult`](#moveproductresult).

### `MoveProductResult`

| Field | Type | Description |
| --- | --- | --- |
| `result` | `true` | Order changed |

### `bindProductCategories`

Binds products to categories. A missing product or category is skipped.

`POST /sites/{siteId}/ecommerce/products/categories/bind`

```typescript
const result = await site.ecommerce.bindProductCategories({
  productIds: [productId],
  categoryIds: [categoryId],
});
```

**Input** [`ChangeProductCategoriesParams`](#changeproductcategoriesparams).

**Response** [`BulkProductsResult`](#bulkproductsresult).

### `ChangeProductCategoriesParams`

| Field | Type | Description |
| --- | --- | --- |
| `productIds` | `number[]` | Product ids |
| `categoryIds` | `number[]` | Category ids |

### `unbindProductCategories`

Unbinds products from categories.

`POST /sites/{siteId}/ecommerce/products/categories/unbind`

```typescript
const result = await site.ecommerce.unbindProductCategories({
  productIds: [productId],
  categoryIds: [categoryId],
});
```

**Input** [`ChangeProductCategoriesParams`](#changeproductcategoriesparams).

**Response** [`BulkProductsResult`](#bulkproductsresult).

### `queryVariants`

Looks up variants by id. Ids from another site are left out of the result.

`POST /sites/{siteId}/ecommerce/variants/query`

```typescript
const found = await site.ecommerce.queryVariants([variantId]);
```

**Input**

| Field | Type       | Description  |
| ----- | ---------- | ------------ |
| `ids` | `number[]` | Variant ids  |

**Response** [`VariantLookup`](#variantlookup)[].

### `VariantLookup`

| Field | Type | Description |
| --- | --- | --- |
| `product` | [`VariantProduct`](#variantproduct) | Product slice |
| `variant` | [`ProductVariant`](#productvariant) | Variant |

### `VariantProduct`

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` | Product id |
| `name` | `string` | Name |
| `options` | [`ProductOption[]`](#productoption) | Options |
| `images` | array | Images |
| `displayImage` | `string` | Which image to show |

## Categories

### `Category`

A catalog category.

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` | Category id |
| `name` | `string` | Name |
| `sortIndex` | `number` | Order |
| `visible` | `boolean` | Shown |
| `isDemo` | `boolean` | Demo category |
| `productCount` | `number` | How many products are in the category |

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
| `list`                | [`Category[]`](#category) | Categories |
| `total`               | `number`     | How many categories the catalog has |
| `productCount`        | `number`     | Products in the catalog          |
| `removedProductCount` | `number`     | Removed products in the catalog  |

### `createCategory`

Creates a category. Omit `visible` and the category is created visible.

`POST /sites/{siteId}/ecommerce/categories`

```typescript
const category = await site.ecommerce.createCategory({ name: "Tableware" });
```

**Input**

| Field     | Type     | Description              |
| --------- | -------- | ------------------------ |
| `name`    | `string` | Name. Required           |
| `visible` | `boolean` | Show the category. Optional |

**Response** [`Category`](#category).

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
| `visible`    | `boolean` | Show the category. Optional |

**Response** [`Category`](#category).

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

**Response** [`Category`](#category)[].

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

**Response** [`DeleteCategoryResult`](#deletecategoryresult).

### `DeleteCategoryResult`

| Field | Type | Description |
| --- | --- | --- |
| `result` | `true` | Category deleted |

