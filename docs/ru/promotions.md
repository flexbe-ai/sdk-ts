# Сайт → Акции

Методы вызываются через `site.ecommerce`.

### `Promotion`

Акция каталога.

| Поле | Тип | Описание |
| --- | --- | --- |
| `id` | `number` | Id акции |
| `type` | `'discount' \| 'promocode'` | Вид акции |
| `discountType` | `'money' \| 'percent' \| 'delivery'` | Как считать скидку |
| `code` | `string \| null` | Код |
| `discountAmount` | `string` | Размер скидки |
| `deliveryFree` | `boolean \| null` | Бесплатная доставка |
| `activeFrom` | `string` | С какого момента действует |
| `dateFrom` | `string \| null` | Дата начала |
| `dateTo` | `string \| null` | Дата конца |
| `availableCount` | `number \| null` | Сколько раз можно применить |
| `usageWithAnyDiscount` | `boolean \| null` | Вместе с другими скидками |
| `active` | `boolean` | Включена |
| `deletedAt` | `string \| null` | Когда удалили |

---

## `listPromotions`

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
| `list` | [`Promotion[]`](#promotion) | Акции |

### `PromotionWriteParams`

Поля создания и изменения акции.

| Поле | Тип | Описание |
| --- | --- | --- |
| `type` | `'discount' \| 'promocode'` | Вид акции. Обязательно |
| `discountType` | `'money' \| 'percent' \| 'delivery'` | Как считать скидку. Обязательно |
| `discountAmount` | `string` | Размер скидки. Обязательно |
| `active` | `boolean \| number` | Включена. Обязательно |
| `code` | `string \| null` | Код. Необязательно |
| `deliveryFree` | `boolean \| number \| null` | Бесплатная доставка. Необязательно |
| `activeFrom` | `string \| null` | С какого момента действует. Необязательно |
| `dateFrom` | `string \| null` | Дата начала. Необязательно |
| `dateTo` | `string \| null` | Дата конца. Необязательно |
| `availableCount` | `number \| null` | Сколько раз можно применить. Необязательно |
| `usageWithAnyDiscount` | `boolean \| number \| null` | Вместе с другими скидками. Необязательно |

## `createPromotion`

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

**Вход** [`PromotionWriteParams`](#promotionwriteparams).

**Ответ** [`Promotion`](#promotion).

## `updatePromotion`

Меняет акцию.

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
| `promotionId` | `number` | Id акции |
| тело          | [`PromotionWriteParams`](#promotionwriteparams) | |

**Ответ** [`Promotion`](#promotion).

## `deletePromotion`

Мягко удаляет акцию.

`DELETE /sites/{siteId}/ecommerce/promotions/{promotionId}`

```typescript
await site.ecommerce.deletePromotion(promotionId);
```

**Вход**

| Поле          | Тип      | Описание |
| ------------- | -------- | -------- |
| `promotionId` | `number` | Id акции |

## `getPromotionByCode`

Ищет акцию, которая ещё в каталоге. Передайте код текстом, например `SUMMER`. Клиент сам закодирует его в пути.

`GET /sites/{siteId}/ecommerce/promotions/code/{code}`

```typescript
const promotion = await site.ecommerce.getPromotionByCode("SUMMER");
```

**Вход**

| Поле   | Тип      | Описание |
| ------ | -------- | -------- |
| `code` | `string` | Код акции |

**Ответ** [`Promotion`](#promotion).
