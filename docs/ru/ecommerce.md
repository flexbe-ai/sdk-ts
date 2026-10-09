# Магазин

`site.ecommerce` — каталог одного сайта: товары, категории и акции. Каждый путь начинается с `/sites/{siteId}/ecommerce`.

```typescript
const catalog = site.ecommerce;
const products = await catalog.listProducts({
  limit: 20,
  status: ProductListStatus.VISIBLE,
});
```

Доставка, налог, сообщения об остатках и общая корзина — это `site.settings`, раздел [Настройки](settings.md). Применение акции к одной заявке — в разделе [Заявки](leads.md).

`visible`, `usePriceOld`, `isDefault` и `notLimited` равны `0` или `1`.

## Товары

В `Product` входят `id`, `name`, `description`, `visible`, `taxable`, `available`, `images`, `categoryIds`, `options`, `variants`, `usePriceOld`, `displayImage`, `price` (`{ min, max }`), `variantsQuantity`, `defaultVariantId`, `settings`, `sortIndex`, `isDemo` и `deletedAt`.

У варианта есть `id`, `productId`, `name` (массив строк), `optionValues` (`{ optionId, valueId }`), `vendorCode`, `quantity`, `price`, `priceOld`, `images`, `defaultImageId`, `visible`, `isDefault`, `notLimited` и `deletedAt`.

### `listProducts`

`GET /sites/{siteId}/ecommerce/products`

```typescript
listProducts(params?: ListProductsParams): Promise<ProductListResponse>
```

Возвращает `{ list, pagination }` с `{ limit, offset, total }`.

| Поле                   | Примечание                              |
| ---------------------- | --------------------------------------- |
| `page`, `limit`        | Уходят этими ключами query              |
| `categoryId`           |                                         |
| `search`               |                                         |
| `productIds`           | `number[]`, одной строкой через запятую |
| `status`               | `visible`, `hidden` или `removed`       |
| `priceMin`, `priceMax` |                                         |

### `getProduct`

`GET /sites/{siteId}/ecommerce/products/{productId}`

```typescript
getProduct(productId: number): Promise<Product>
```

Возвращает товар. Удалённый товар не возвращается.

### `createProduct`

`POST /sites/{siteId}/ecommerce/products`

```typescript
createProduct(data: ProductWriteParams): Promise<Product>
```

`name` обязателен. Необязательные поля: `description`, `visible`, `taxable`, `images`, `categoryIds`, `usePriceOld`, `displayImage`, `settings`, `options`, `variants`. Опции и варианты передаются в этом теле.

Опция — `{ id?, name, data?, values }`. Значение — `{ id?, name, data? }`. У варианта можно задать `id`, `optionValues` (`optionId` и `valueId` числом или строкой), `vendorCode`, `quantity`, `price`, `priceOld`, `images`, `defaultImageId`, `visible`, `isDefault` и `notLimited`.

### `updateProduct`

`PATCH /sites/{siteId}/ecommerce/products/{productId}`

```typescript
updateProduct(productId: number, data: ProductWriteParams): Promise<Product>
```

Тело то же, что у создания. `name` обязателен. Товар другого сайта остаётся как был.

### `upsertProducts`

`POST /sites/{siteId}/ecommerce/products/batch`

```typescript
upsertProducts(items: ProductUpsertItem[]): Promise<ProductUpsertResult>
```

Отправляет `{ items }`. API принимает до 50 элементов. Элемент без `id` создаётся. Элемент с `id` этого сайта обновляется. Ошибка одного элемента не останавливает остальные.

Результат — `{ created, updated, errors }`. Успех — `{ index, product }`. Ошибка — `{ index, message }`.

### `bulkProducts`

`POST /sites/{siteId}/ecommerce/products/bulk`

```typescript
bulkProducts(data: BulkProductsParams): Promise<BulkProductsResult>
```

`action` — `hide`, `show`, `remove`, `restore` или `purge`. `ids` — `number[]`. Возвращает `{ results: { id, result: true }[] }`. Товар другого сайта остаётся как был.

### `moveProduct`

`PUT /sites/{siteId}/ecommerce/products/{productId}/position`

```typescript
moveProduct(productId: number, data: MoveProductParams): Promise<MoveProductResult>
```

`MoveProductParams` — это `{ categoryId?, beforeId?, afterId? }`. Передайте `categoryId`, чтобы переставить товар внутри категории. Без него меняется порядок в списке сайта. Возвращает `{ result: true }`.

### `bindProductCategories`

`POST /sites/{siteId}/ecommerce/products/categories/bind`

```typescript
bindProductCategories(data: ChangeProductCategoriesParams): Promise<BulkProductsResult>
```

`ChangeProductCategoriesParams` — это `{ productIds, categoryIds }`. Отсутствующий товар или категория пропускаются.

### `unbindProductCategories`

`POST /sites/{siteId}/ecommerce/products/categories/unbind`

```typescript
unbindProductCategories(data: ChangeProductCategoriesParams): Promise<BulkProductsResult>
```

Тело то же, что у bind.

### `queryVariants`

`POST /sites/{siteId}/ecommerce/variants/query`

```typescript
queryVariants(ids: number[]): Promise<VariantLookup[]>
```

Отправляет `{ ids }`. Каждый найденный элемент — `{ product, variant }`. Срез товара — `{ id, name, options, images, displayImage }`. Id другого сайта в результат не попадают.

## Категории

`Category` — это `{ id, name, sortIndex, visible, isDemo, productCount }`. В ответе списка ещё есть `total`, `productCount` и `removedProductCount` на весь каталог.

### `listCategories`

`GET /sites/{siteId}/ecommerce/categories`

```typescript
listCategories(params?: ListCategoriesParams): Promise<CategoryListResponse>
```

Скрытые категории входят в список, пока вы не передадите `includeHidden: false`.

### `createCategory`

`POST /sites/{siteId}/ecommerce/categories`

```typescript
createCategory(data: CreateCategoryParams): Promise<Category>
```

`name` обязателен. `visible` — необязательные `0` или `1`. Если не передать, категория создаётся видимой (`1`).

### `updateCategory`

`PATCH /sites/{siteId}/ecommerce/categories/{categoryId}`

```typescript
updateCategory(categoryId: number, data: UpdateCategoryParams): Promise<Category>
```

`name` и `visible` оба необязательны. Категория другого сайта остаётся как была.

### `sortCategories`

`PUT /sites/{siteId}/ecommerce/categories/sort`

```typescript
sortCategories(data: SortCategoriesParams): Promise<Category[]>
```

`categoryId` обязателен. `afterId` ставит категорию после этого id. Без `afterId` она уходит в начало. Возвращает категории в новом порядке.

### `deleteCategory`

`DELETE /sites/{siteId}/ecommerce/categories/{categoryId}`

```typescript
deleteCategory(categoryId: number, params?: DeleteCategoryParams): Promise<DeleteCategoryResult>
```

`deleteProducts: true` ещё и мягко удаляет товары этой категории. Флаг уходит query-параметром. Возвращает `{ result: true }`.

## Акции

`Promotion` — строка каталога: `id`, `type` (`discount` | `promocode`), `discountType` (`money` | `percent` | `delivery`), `code`, `discountAmount` (строка), `deliveryFree`, `activeFrom`, `dateFrom`, `dateTo`, `availableCount`, `usageWithAnyDiscount`, `active`, `deletedAt`.

`PromotionWriteParams` требует `type`, `discountType`, `discountAmount` и `active` (`boolean` или `number`). Необязательно: `code`, `deliveryFree` (`boolean`, `number` или `null`), `activeFrom`, `dateFrom`, `dateTo`, `availableCount`, `usageWithAnyDiscount`.

### `listPromotions`

`GET /sites/{siteId}/ecommerce/promotions`

```typescript
listPromotions(): Promise<PromotionListResponse>
```

Возвращает `{ list }`. Мягко удалённые строки не входят.

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

Акция другого сайта остаётся как была.

### `deletePromotion`

`DELETE /sites/{siteId}/ecommerce/promotions/{promotionId}`

```typescript
deletePromotion(promotionId: number): Promise<void>
```

Мягкое удаление.

### `getPromotionByCode`

`GET /sites/{siteId}/ecommerce/promotions/code/{code}`

```typescript
getPromotionByCode(code: string): Promise<Promotion>
```

Ищет акцию, которая ещё в каталоге. Передайте код текстом, например `SUMMER`. Клиент сам закодирует его в пути.
