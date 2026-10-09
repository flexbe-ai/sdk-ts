# site > Магазин

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
| `list`              | `Product[]` | Товары. Поля в абзаце выше  |
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

**Ответ** `Product`. Поля в абзаце выше.

### `createProduct`

Создаёт товар. Опции и варианты передаются в этом теле.

`POST /sites/{siteId}/ecommerce/products`

```typescript
const product = await site.ecommerce.createProduct({ name: "Кружка" });
```

**Вход**

| Поле                         | Тип              | Описание                                              |
| ---------------------------- | ---------------- | ----------------------------------------------------- |
| `name`                       | `string`         | Название. Обязательно                                 |
| `description`                | `string`         | Описание. Необязательно                               |
| `visible`                    | `number`         | `0` или `1`. Необязательно                            |
| `taxable`                    | `boolean`        | Облагается налогом. Необязательно                     |
| `images`                     | массив           | Картинки. Необязательно                               |
| `categoryIds`                | `number[]`       | Категории. Необязательно                              |
| `usePriceOld`                | `number`         | `0` или `1`. Необязательно                            |
| `displayImage`               | `string`         | Какую картинку показывать. Необязательно              |
| `settings`                   | объект           | Настройки товара. Необязательно                       |
| `options`                    | массив           | Опции. Необязательно                                  |
| `options[].id`               | `number \| string` | Id опции, если она уже есть. Необязательно          |
| `options[].name`             | `string`         | Название опции                                        |
| `options[].data`             | объект           | Доп. данные. Необязательно                            |
| `options[].values`           | массив           | Значения опции                                        |
| `options[].values[].id`      | `number \| string` | Id значения. Необязательно                          |
| `options[].values[].name`    | `string`         | Название значения                                     |
| `options[].values[].data`    | значение         | Доп. данные значения. Необязательно                   |
| `variants`                   | массив           | Варианты. Необязательно                               |
| `variants[].id`              | `number \| string` | Id варианта. Необязательно                          |
| `variants[].optionValues`    | массив           | `{ optionId, valueId }`, число или строка             |
| `variants[].vendorCode`      | `string`         | Артикул. Необязательно                                |
| `variants[].quantity`        | `number \| null` | Остаток. Необязательно                                |
| `variants[].price`           | `number \| null` | Цена. Необязательно                                   |
| `variants[].priceOld`        | `number \| null` | Старая цена. Необязательно                            |
| `variants[].images`          | массив           | Картинки варианта. Необязательно                      |
| `variants[].defaultImageId`  | `string \| null` | Картинка по умолчанию. Необязательно                  |
| `variants[].visible`         | `number`         | `0` или `1`. Необязательно                            |
| `variants[].isDefault`       | `number`         | `0` или `1`. Необязательно                            |
| `variants[].notLimited`      | `number`         | `0` или `1`. Необязательно                            |

**Ответ** `Product`. Поля в абзаце выше.

### `updateProduct`

Меняет товар. Тело то же, что у создания, `name` обязателен. Товар другого сайта остаётся как был.

`PATCH /sites/{siteId}/ecommerce/products/{productId}`

```typescript
const product = await site.ecommerce.updateProduct(productId, { name: "Новое имя" });
```

**Вход**

| Поле        | Тип      | Описание                                      |
| ----------- | -------- | --------------------------------------------- |
| `productId` | `number` | Id товара                                     |
| тело        | объект   | Те же поля, что у `createProduct`             |

**Ответ** `Product`. Поля в абзаце выше.

### `upsertProducts`

Создаёт и обновляет товары пачкой. Тело — `{ items }`. API принимает до 50 элементов. Элемент без `id` создаётся. Элемент с `id` этого сайта обновляется. Ошибка одного элемента не останавливает остальные.

`POST /sites/{siteId}/ecommerce/products/batch`

```typescript
const result = await site.ecommerce.upsertProducts([{ name: "Кружка" }, { id: productId, name: "Новое имя" }]);
```

**Вход**

| Поле    | Тип                  | Описание                                      |
| ------- | -------------------- | --------------------------------------------- |
| `items` | `ProductUpsertItem[]`| До 50 элементов. Поля как у `createProduct`, плюс необязательный `id` |

**Ответ**

| Поле               | Тип      | Описание                         |
| ------------------ | -------- | -------------------------------- |
| `created`          | массив   | Что создалось                    |
| `created[].index`  | `number` | Индекс элемента во входе         |
| `created[].product`| `Product`| Созданный товар                  |
| `updated`          | массив   | Что обновилось                   |
| `updated[].index`  | `number` | Индекс элемента во входе         |
| `updated[].product`| `Product`| Обновлённый товар                |
| `errors`           | массив   | Что не прошло                    |
| `errors[].index`   | `number` | Индекс элемента во входе         |
| `errors[].message` | `string` | Текст ошибки                     |

### `bulkProducts`

Прячет, показывает, удаляет, восстанавливает или стирает товары. Товар другого сайта остаётся как был.

`POST /sites/{siteId}/ecommerce/products/bulk`

```typescript
const result = await site.ecommerce.bulkProducts({ action: "hide", ids: [productId] });
```

**Вход**

| Поле     | Тип                                              | Описание |
| -------- | ------------------------------------------------ | -------- |
| `action` | `'hide' \| 'show' \| 'remove' \| 'restore' \| 'purge'` | Что сделать |
| `ids`    | `number[]`                                       | Id товаров |

**Ответ**

| Поле             | Тип      | Описание        |
| ---------------- | -------- | --------------- |
| `results`        | массив   | По каждому id   |
| `results[].id`   | `number` | Id товара       |
| `results[].result` | `true` | Операция прошла |

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

**Ответ**

| Поле     | Тип    | Описание        |
| -------- | ------ | --------------- |
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

**Вход**

| Поле          | Тип        | Описание    |
| ------------- | ---------- | ----------- |
| `productIds`  | `number[]` | Id товаров  |
| `categoryIds` | `number[]` | Id категорий |

**Ответ** тот же `results`, что у `bulkProducts`.

### `unbindProductCategories`

Отвязывает товары от категорий. Тело то же, что у bind.

`POST /sites/{siteId}/ecommerce/products/categories/unbind`

```typescript
const result = await site.ecommerce.unbindProductCategories({
  productIds: [productId],
  categoryIds: [categoryId],
});
```

**Вход** тот же, что у `bindProductCategories`.

**Ответ** тот же `results`, что у `bulkProducts`.

### `queryVariants`

Ищет варианты по id. Тело — `{ ids }`. Id другого сайта в результат не попадают.

`POST /sites/{siteId}/ecommerce/variants/query`

```typescript
const found = await site.ecommerce.queryVariants([variantId]);
```

**Вход**

| Поле  | Тип        | Описание     |
| ----- | ---------- | ------------ |
| `ids` | `number[]` | Id вариантов |

**Ответ** `VariantLookup[]`

| Поле                    | Тип      | Описание                                      |
| ----------------------- | -------- | --------------------------------------------- |
| `product`               | объект   | Срез товара                                   |
| `product.id`            | `number` | Id товара                                     |
| `product.name`          | `string` | Название                                      |
| `product.options`       | массив   | Опции                                         |
| `product.images`        | массив   | Картинки                                      |
| `product.displayImage`  | `string` | Какую картинку показывать                     |
| `variant`               | объект   | Вариант. Поля в абзаце выше                   |

## Категории

`Category` — это `{ id, name, sortIndex, visible, isDemo, productCount }`. В ответе списка ещё есть `total`, `productCount` и `removedProductCount` на весь каталог.

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
| `list`                | `Category[]` | Категории. Поля в абзаце выше    |
| `total`               | `number`     | Сколько категорий в каталоге     |
| `productCount`        | `number`     | Товаров в каталоге               |
| `removedProductCount` | `number`     | Удалённых товаров в каталоге     |

### `createCategory`

Создаёт категорию. Если `visible` не передать, категория создаётся видимой (`1`).

`POST /sites/{siteId}/ecommerce/categories`

```typescript
const category = await site.ecommerce.createCategory({ name: "Посуда" });
```

**Вход**

| Поле      | Тип      | Описание                         |
| --------- | -------- | -------------------------------- |
| `name`    | `string` | Название. Обязательно            |
| `visible` | `number` | `0` или `1`. Необязательно       |

**Ответ** `Category`. Поля в абзаце выше.

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
| `visible`    | `number` | `0` или `1`. Необязательно |

**Ответ** `Category`. Поля в абзаце выше.

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

**Ответ** `Category[]` в новом порядке.

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

**Ответ**

| Поле     | Тип    | Описание          |
| -------- | ------ | ----------------- |
| `result` | `true` | Категория удалена |

## Акции

`Promotion` — строка каталога: `id`, `type` (`discount` | `promocode`), `discountType` (`money` | `percent` | `delivery`), `code`, `discountAmount` (строка), `deliveryFree`, `activeFrom`, `dateFrom`, `dateTo`, `availableCount`, `usageWithAnyDiscount`, `active`, `deletedAt`.

`PromotionWriteParams` требует `type`, `discountType`, `discountAmount` и `active` (`boolean` или `number`). Необязательно: `code`, `deliveryFree` (`boolean`, `number` или `null`), `activeFrom`, `dateFrom`, `dateTo`, `availableCount`, `usageWithAnyDiscount`.

### `listPromotions`

Возвращает акции каталога. Мягко удалённые строки не входят.

`GET /sites/{siteId}/ecommerce/promotions`

```typescript
const promotions = await site.ecommerce.listPromotions();
```

**Вход**

Параметров нет.

**Ответ**

| Поле   | Тип           | Описание                  |
| ------ | ------------- | ------------------------- |
| `list` | `Promotion[]` | Акции. Поля в абзаце выше |

### `createPromotion`

Создаёт акцию.

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

**Вход**

| Поле                   | Тип                                      | Описание                                      |
| ---------------------- | ---------------------------------------- | --------------------------------------------- |
| `type`                 | `'discount' \| 'promocode'`              | Вид акции. Обязательно                        |
| `discountType`         | `'money' \| 'percent' \| 'delivery'`     | Как считать скидку. Обязательно               |
| `discountAmount`       | `string`                                 | Размер скидки. Обязательно                    |
| `active`               | `boolean \| number`                      | Включена. Обязательно                         |
| `code`                 | `string \| null`                         | Код. Необязательно                            |
| `deliveryFree`         | `boolean \| number \| null`              | Бесплатная доставка. Необязательно            |
| `activeFrom`           | `string \| null`                         | С какого момента действует. Необязательно     |
| `dateFrom`             | `string \| null`                         | Дата начала. Необязательно                    |
| `dateTo`               | `string \| null`                         | Дата конца. Необязательно                     |
| `availableCount`       | `number \| null`                         | Сколько раз можно применить. Необязательно    |
| `usageWithAnyDiscount` | `boolean \| number \| null`              | Вместе с другими скидками. Необязательно      |

**Ответ** `Promotion`. Поля в абзаце выше.

### `updatePromotion`

Меняет акцию. Акция другого сайта остаётся как была.

`PATCH /sites/{siteId}/ecommerce/promotions/{promotionId}`

```typescript
const promotion = await site.ecommerce.updatePromotion(promotionId, {
  type: "promocode",
  discountType: "percent",
  discountAmount: "15",
  active: true,
});
```

**Вход**

| Поле          | Тип      | Описание                          |
| ------------- | -------- | --------------------------------- |
| `promotionId` | `number` | Id акции                          |
| тело          | объект   | Те же поля, что у `createPromotion` |

**Ответ** `Promotion`. Поля в абзаце выше.

### `deletePromotion`

Мягко удаляет акцию.

`DELETE /sites/{siteId}/ecommerce/promotions/{promotionId}`

```typescript
await site.ecommerce.deletePromotion(promotionId);
```

**Вход**

| Поле          | Тип      | Описание |
| ------------- | -------- | -------- |
| `promotionId` | `number` | Id акции |

**Ответ**

Тела нет.

### `getPromotionByCode`

Ищет акцию, которая ещё в каталоге. Передайте код текстом, например `SUMMER`. Клиент сам закодирует его в пути.

`GET /sites/{siteId}/ecommerce/promotions/code/{code}`

```typescript
const promotion = await site.ecommerce.getPromotionByCode("SUMMER");
```

**Вход**

| Поле   | Тип      | Описание |
| ------ | -------- | -------- |
| `code` | `string` | Код акции |

**Ответ** `Promotion`. Поля в абзаце выше.
