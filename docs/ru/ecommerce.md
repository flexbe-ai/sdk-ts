# Сайт → Магазин

`site.ecommerce` — каталог одного сайта: товары и категории.

```typescript
const catalog = site.ecommerce;
const products = await catalog.listProducts({
  limit: 20,
  status: ProductListStatus.VISIBLE,
});
```

## Товары

### `Product`

Карточка товара.

| Поле | Тип | Описание |
| --- | --- | --- |
| `id` | `number` | Id товара |
| `name` | `string` | Название |
| `description` | `string` | Описание |
| `visible` | `boolean` | Показывать |
| `taxable` | `boolean` | Облагается налогом |
| `available` | `boolean` | Можно купить |
| `images` | массив | Картинки |
| `categoryIds` | `number[]` | Категории |
| `options` | [`ProductOption[]`](#productoption) | Опции |
| `variants` | [`ProductVariant[]`](#productvariant) | Варианты |
| `usePriceOld` | `boolean` | Показывать старую цену |
| `displayImage` | `string` | Какую картинку показывать |
| `price` | [`ProductPrice`](#productprice) | Диапазон цен |
| `variantsQuantity` | `number` | Сумма положительных остатков |
| `defaultVariantId` | `number` | Id варианта по умолчанию. `0`, если его нет |
| `settings` | объект | Настройки товара |
| `sortIndex` | `number` | Порядок |
| `isDemo` | `boolean` | Демо-товар |
| `deletedAt` | `string \| null` | Когда удалили |

### `ProductOption`

Опция товара.

| Поле | Тип | Описание |
| --- | --- | --- |
| `id` | `number` | Id опции |
| `name` | `string` | Название |
| `sortIndex` | `number` | Порядок |
| `values` | [`ProductOptionValue[]`](#productoptionvalue) | Значения |
| `data` | объект или `null` | Дополнительные данные |

### `ProductOptionValue`

Значение опции.

| Поле | Тип | Описание |
| --- | --- | --- |
| `id` | `number` | Id значения |
| `name` | `string` | Название |
| `data` | значение | Дополнительные данные |
| `sortIndex` | `number` | Порядок |

### `ProductVariant`

Вариант товара.

| Поле | Тип | Описание |
| --- | --- | --- |
| `id` | `number` | Id варианта |
| `productId` | `number` | Id товара |
| `name` | `string[]` | Названия значений опций |
| `optionValues` | [`VariantOptionValueRef[]`](#variantoptionvalueref) | Связи со значениями опций |
| `vendorCode` | `string` | Артикул |
| `quantity` | `number \| null` | Остаток |
| `price` | `number \| null` | Цена |
| `priceOld` | `number \| null` | Старая цена |
| `images` | массив | Картинки |
| `defaultImageId` | `string \| null` | Картинка по умолчанию |
| `visible` | `boolean` | Показывать |
| `isDefault` | `boolean` | Вариант по умолчанию |
| `notLimited` | `boolean` | Без ограничения остатка |
| `deletedAt` | `string \| null` | Когда удалили |

### `VariantOptionValueRef`

Связь варианта со значением опции.

| Поле | Тип | Описание |
| --- | --- | --- |
| `optionId` | `number` | Id опции |
| `valueId` | `number` | Id значения |

### `ProductOptionInput`

Опция в теле запроса.

| Поле | Тип | Описание |
| --- | --- | --- |
| `id` | `number \| string` | Id опции, если она уже есть. Необязательно |
| `name` | `string` | Название |
| `data` | объект или `null` | Дополнительные данные. Необязательно |
| `values` | [`ProductOptionValueInput[]`](#productoptionvalueinput) | Значения |

### `ProductOptionValueInput`

Значение опции в теле запроса.

| Поле | Тип | Описание |
| --- | --- | --- |
| `id` | `number \| string` | Id значения. Необязательно |
| `name` | `string` | Название |
| `data` | значение | Дополнительные данные. Необязательно |

### `ProductVariantInput`

Вариант в теле запроса.

| Поле | Тип | Описание |
| --- | --- | --- |
| `id` | `number \| string` | Id варианта. Необязательно |
| `optionValues` | [`optionValues`](#optionvalues)[] | Необязательно |
| `vendorCode` | `string` | Артикул. Необязательно |
| `quantity` | `number \| null` | Остаток. Необязательно |
| `price` | `number \| null` | Цена. Необязательно |
| `priceOld` | `number \| null` | Старая цена. Необязательно |
| `images` | массив | Картинки. Необязательно |
| `defaultImageId` | `string \| null` | Картинка по умолчанию. Необязательно |
| `visible` | `boolean` | Показывать. Необязательно |
| `isDefault` | `boolean` | Вариант по умолчанию. Необязательно |
| `notLimited` | `boolean` | Без ограничения остатка. Необязательно |

### `optionValues`

Пара опции и значения в теле варианта.

| Поле | Тип | Описание |
| --- | --- | --- |
| `optionId` | `number \| string` | Id опции |
| `valueId` | `number \| string` | Id значения |

### `ProductPrice`

Диапазон цен вариантов.

| Поле | Тип | Описание |
| --- | --- | --- |
| `min` | `number \| null` | Минимальная цена |
| `max` | `number \| null` | Максимальная цена |

### `listProducts`

Возвращает товары сайта.

`GET /sites/{siteId}/ecommerce/products`

```typescript
const products = await site.ecommerce.listProducts({ limit: 20, status: "visible" });
```

**Вход**

| Поле         | Тип                                      | Описание                                      |
| ------------ | ---------------------------------------- | --------------------------------------------- |
| `page`       | `number`                                 | Номер страницы списка. Необязательно          |
| `limit`      | `number`                                 | Сколько товаров на страницу. Необязательно    |
| `categoryId` | `number`                                 | Только товары этой категории. Необязательно   |
| `search`     | `string`                                 | Поиск по названию. Необязательно              |
| `productIds` | `number[]`                               | Одной строкой через запятую. Необязательно    |
| `status`     | `'visible' \| 'hidden' \| 'removed'`     | Какие товары вернуть. Необязательно           |
| `priceMin`   | `number`                                 | Цена от. Необязательно                        |
| `priceMax`   | `number`                                 | Цена до. Необязательно                        |

**Ответ**

| Поле                | Тип         | Описание                    |
| ------------------- | ----------- | --------------------------- |
| `list`              | [`Product[]`](#product) | Товары |
| `pagination.limit`  | `number`    | Размер страницы             |
| `pagination.offset` | `number`    | Смещение                    |
| `pagination.total`  | `number`    | Всего записей               |

### `getProduct`

Возвращает товар. Удалённый товар не возвращается.

`GET /sites/{siteId}/ecommerce/products/{productId}`

```typescript
const product = await site.ecommerce.getProduct(productId);
```

**Вход**

| Поле        | Тип      | Описание  |
| ----------- | -------- | --------- |
| `productId` | `number` | Id товара |

**Ответ** [`Product`](#product).

### `ProductWriteParams`

Поля создания и изменения товара.

| Поле | Тип | Описание |
| --- | --- | --- |
| `name` | `string` | Название. Обязательно |
| `description` | `string` | Описание. Необязательно |
| `visible` | `boolean` | Показывать. Необязательно |
| `taxable` | `boolean` | Облагается налогом. Необязательно |
| `images` | массив | Картинки. Необязательно |
| `categoryIds` | `number[]` | Категории. Необязательно |
| `usePriceOld` | `boolean` | Показывать старую цену. Необязательно |
| `displayImage` | `string` | Какую картинку показывать. Необязательно |
| `settings` | объект | Настройки товара. Необязательно |
| `options` | [`ProductOptionInput[]`](#productoptioninput) | Опции. Необязательно |
| `variants` | [`ProductVariantInput[]`](#productvariantinput) | Варианты. Необязательно |

### `createProduct`

Создаёт товар.

`POST /sites/{siteId}/ecommerce/products`

```typescript
const product = await site.ecommerce.createProduct({ name: "Кружка" });
```

**Вход** [`ProductWriteParams`](#productwriteparams).

**Ответ** [`Product`](#product).

### `updateProduct`

Меняет товар. `name` обязателен. Товар другого сайта остаётся как был.

`PATCH /sites/{siteId}/ecommerce/products/{productId}`

```typescript
const product = await site.ecommerce.updateProduct(productId, { name: "Новое имя" });
```

**Вход**

| Поле        | Тип      | Описание                                      |
| ----------- | -------- | --------------------------------------------- |
| `productId` | `number` | Id товара |
| тело        | [`ProductWriteParams`](#productwriteparams) | |

**Ответ** [`Product`](#product).

### `upsertProducts`

Создаёт и обновляет товары пачкой. API принимает до 50 элементов. Элемент без `id` создаётся. Элемент с `id` этого сайта обновляется. Ошибка одного элемента не останавливает остальные.

`POST /sites/{siteId}/ecommerce/products/batch`

```typescript
const result = await site.ecommerce.upsertProducts([{ name: "Кружка" }, { id: productId, name: "Новое имя" }]);
```

**Вход**

| Поле    | Тип | Описание |
| ------- | --- | -------- |
| `items` | [`ProductUpsertItem[]`](#productupsertitem) | До 50 элементов |

**Ответ** [`ProductUpsertResult`](#productupsertresult).

### `ProductUpsertItem`

Элемент пачки. Без `id` товар создаётся, с `id` этого сайта обновляется.

| Поле | Тип | Описание |
| --- | --- | --- |
| `id` | `number` | Id товара. Необязательно |
| `name` | `string` | Название. Обязательно |
| `description` | `string` | Описание. Необязательно |
| `visible` | `boolean` | Показывать. Необязательно |
| `taxable` | `boolean` | Облагается налогом. Необязательно |
| `images` | массив | Картинки. Необязательно |
| `categoryIds` | `number[]` | Категории. Необязательно |
| `usePriceOld` | `boolean` | Показывать старую цену. Необязательно |
| `displayImage` | `string` | Какую картинку показывать. Необязательно |
| `settings` | объект | Настройки товара. Необязательно |
| `options` | [`ProductOptionInput[]`](#productoptioninput) | Опции. Необязательно |
| `variants` | [`ProductVariantInput[]`](#productvariantinput) | Варианты. Необязательно |

### `ProductUpsertResult`

Результат пачки.

| Поле | Тип | Описание |
| --- | --- | --- |
| `created` | [`ProductUpsertHit[]`](#productupserthit) | Что создалось |
| `updated` | [`ProductUpsertHit[]`](#productupserthit) | Что обновилось |
| `errors` | [`ProductUpsertError[]`](#productupserterror) | Что не прошло |

### `ProductUpsertHit`

| Поле | Тип | Описание |
| --- | --- | --- |
| `index` | `number` | Индекс элемента во входе |
| `product` | [`Product`](#product) | Товар |

### `ProductUpsertError`

| Поле | Тип | Описание |
| --- | --- | --- |
| `index` | `number` | Индекс элемента во входе |
| `message` | `string` | Текст ошибки |

### `bulkProducts`

Массовое действие над товарами.

`POST /sites/{siteId}/ecommerce/products/bulk`

```typescript
const result = await site.ecommerce.bulkProducts({ action: "hide", ids: [productId] });
```

**Вход**

| Поле     | Тип                                              | Описание |
| -------- | ------------------------------------------------ | -------- |
| `action` | `'hide' \| 'show' \| 'remove' \| 'restore' \| 'purge'` | Что сделать |
| `ids`    | `number[]`                                       | Id товаров |

**Ответ** [`BulkProductsResult`](#bulkproductsresult).

### `BulkProductsResult`

| Поле | Тип | Описание |
| --- | --- | --- |
| `results` | [`BulkProductResult[]`](#bulkproductresult) | По каждому id |

### `BulkProductResult`

| Поле | Тип | Описание |
| --- | --- | --- |
| `id` | `number` | Id товара |
| `result` | `true` | Операция прошла |

### `moveProduct`

Меняет порядок товара. Передайте `categoryId`, чтобы переставить его внутри категории. Без него меняется порядок в списке сайта.

`PUT /sites/{siteId}/ecommerce/products/{productId}/position`

```typescript
const moved = await site.ecommerce.moveProduct(productId, { afterId: 10 });
```

**Вход**

| Поле         | Тип      | Описание                              |
| ------------ | -------- | ------------------------------------- |
| `productId`  | `number` | Id товара                             |
| `categoryId` | `number` | Внутри этой категории. Необязательно  |
| `beforeId`   | `number` | Поставить перед этим id. Необязательно |
| `afterId`    | `number` | Поставить после этого id. Необязательно |

**Ответ** [`MoveProductResult`](#moveproductresult).

### `MoveProductResult`

| Поле | Тип | Описание |
| --- | --- | --- |
| `result` | `true` | Порядок изменён |

### `bindProductCategories`

Привязывает товары к категориям. Отсутствующий товар или категория пропускаются.

`POST /sites/{siteId}/ecommerce/products/categories/bind`

```typescript
const result = await site.ecommerce.bindProductCategories({
  productIds: [productId],
  categoryIds: [categoryId],
});
```

**Вход** [`ChangeProductCategoriesParams`](#changeproductcategoriesparams).

**Ответ** [`BulkProductsResult`](#bulkproductsresult).

### `ChangeProductCategoriesParams`

| Поле | Тип | Описание |
| --- | --- | --- |
| `productIds` | `number[]` | Id товаров |
| `categoryIds` | `number[]` | Id категорий |

### `unbindProductCategories`

Отвязывает товары от категорий.

`POST /sites/{siteId}/ecommerce/products/categories/unbind`

```typescript
const result = await site.ecommerce.unbindProductCategories({
  productIds: [productId],
  categoryIds: [categoryId],
});
```

**Вход** [`ChangeProductCategoriesParams`](#changeproductcategoriesparams).

**Ответ** [`BulkProductsResult`](#bulkproductsresult).

### `queryVariants`

Ищет варианты по id. Id другого сайта в результат не попадают.

`POST /sites/{siteId}/ecommerce/variants/query`

```typescript
const found = await site.ecommerce.queryVariants([variantId]);
```

**Вход**

| Поле  | Тип        | Описание     |
| ----- | ---------- | ------------ |
| `ids` | `number[]` | Id вариантов |

**Ответ** [`VariantLookup`](#variantlookup)[].

### `VariantLookup`

| Поле | Тип | Описание |
| --- | --- | --- |
| `product` | [`VariantProduct`](#variantproduct) | Срез товара |
| `variant` | [`ProductVariant`](#productvariant) | Вариант |

### `VariantProduct`

| Поле | Тип | Описание |
| --- | --- | --- |
| `id` | `number` | Id товара |
| `name` | `string` | Название |
| `options` | [`ProductOption[]`](#productoption) | Опции |
| `images` | массив | Картинки |
| `displayImage` | `string` | Какую картинку показывать |

## Категории

### `Category`

Категория каталога.

| Поле | Тип | Описание |
| --- | --- | --- |
| `id` | `number` | Id категории |
| `name` | `string` | Название |
| `sortIndex` | `number` | Порядок |
| `visible` | `boolean` | Показывать |
| `isDemo` | `boolean` | Демо-категория |
| `productCount` | `number` | Сколько товаров в категории |

### `listCategories`

Возвращает категории. Скрытые входят в список, пока вы не передадите `includeHidden: false`.

`GET /sites/{siteId}/ecommerce/categories`

```typescript
const categories = await site.ecommerce.listCategories();
```

**Вход**

| Поле            | Тип       | Описание                                      |
| --------------- | --------- | --------------------------------------------- |
| `includeHidden` | `boolean` | `false` убирает скрытые. Необязательно        |

**Ответ**

| Поле                  | Тип          | Описание                         |
| --------------------- | ------------ | -------------------------------- |
| `list`                | [`Category[]`](#category) | Категории |
| `total`               | `number`     | Сколько категорий в каталоге     |
| `productCount`        | `number`     | Товаров в каталоге               |
| `removedProductCount` | `number`     | Удалённых товаров в каталоге     |

### `createCategory`

Создаёт категорию. Если `visible` не передать, категория создаётся видимой.

`POST /sites/{siteId}/ecommerce/categories`

```typescript
const category = await site.ecommerce.createCategory({ name: "Посуда" });
```

**Вход**

| Поле      | Тип      | Описание                         |
| --------- | -------- | -------------------------------- |
| `name`    | `string` | Название. Обязательно            |
| `visible` | `boolean` | Показывать. Необязательно        |

**Ответ** [`Category`](#category).

### `updateCategory`

Меняет категорию. Категория другого сайта остаётся как была.

`PATCH /sites/{siteId}/ecommerce/categories/{categoryId}`

```typescript
const category = await site.ecommerce.updateCategory(categoryId, { name: "Новое имя" });
```

**Вход**

| Поле         | Тип      | Описание                  |
| ------------ | -------- | ------------------------- |
| `categoryId` | `number` | Id категории              |
| `name`       | `string` | Название. Необязательно   |
| `visible`    | `boolean` | Показывать. Необязательно |

**Ответ** [`Category`](#category).

### `sortCategories`

Меняет порядок категорий. `afterId` ставит категорию после этого id. Без `afterId` она уходит в начало.

`PUT /sites/{siteId}/ecommerce/categories/sort`

```typescript
const categories = await site.ecommerce.sortCategories({ categoryId, afterId: 3 });
```

**Вход**

| Поле         | Тип      | Описание                              |
| ------------ | -------- | ------------------------------------- |
| `categoryId` | `number` | Какую категорию двигать. Обязательно  |
| `afterId`    | `number` | Поставить после этого id. Необязательно |

**Ответ** [`Category`](#category)[].

### `deleteCategory`

Удаляет категорию. `deleteProducts: true` ещё и мягко удаляет товары этой категории. Флаг уходит query-параметром.

`DELETE /sites/{siteId}/ecommerce/categories/{categoryId}`

```typescript
const deleted = await site.ecommerce.deleteCategory(categoryId, { deleteProducts: true });
```

**Вход**

| Поле             | Тип       | Описание                                      |
| ---------------- | --------- | --------------------------------------------- |
| `categoryId`     | `number`  | Id категории                                  |
| `deleteProducts` | `boolean` | Мягко удалить товары категории. Необязательно |

**Ответ** [`DeleteCategoryResult`](#deletecategoryresult).

### `DeleteCategoryResult`

| Поле | Тип | Описание |
| --- | --- | --- |
| `result` | `true` | Категория удалена |

