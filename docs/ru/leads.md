# Сайт → Заявки

`site.leads` читает и обновляет заявки одного сайта.

```typescript
import { LeadStatus } from "@flexbe/sdk";

const page = await site.leads.list({ limit: 20, status: LeadStatus.NEW });
const lead = page.list[0];
```

## `Lead`

| Поле             | Тип                          | Описание                           |
| ---------------- | ---------------------------- | ---------------------------------- |
| `id`             | `number`                     | Id заявки                          |
| `sequence`       | `number`                     | Номер заявки на сайте              |
| `siteId`         | `number`                     | Id сайта                           |
| `status`         | `LeadStatus`                 | Статус заявки                      |
| `isRead`         | `boolean`                    | Заявку уже открывали               |
| `formName`       | `string`                     | Имя формы                          |
| `customer`       | `LeadCustomer`               | Покупатель                         |
| `formFields`     | `LeadFormField[] \| null`    | Ответы полей формы                 |
| `orderItems`     | `LeadOrderItem[] \| null`    | Строки заказа                      |
| `orderShipping`  | `LeadShipping \| null`       | Доставка                           |
| `orderDiscounts` | `LeadOrderDiscount[] \| null`| Снимки скидок                      |
| `payment`        | `LeadPayment \| null`        | Оплата                             |
| `taxSnapshot`    | объект или `null`            | Налог на момент заявки             |
| `notes`          | `string \| null`             | Заметка                            |
| `custom`         | объект или `null`            | Произвольные данные                |
| `tracking`       | `LeadTracking \| null`       | Откуда пришла заявка               |
| `trackingExtra`  | объект или `null`            | Дополнительные метки визита        |
| `createdAt`      | `string`                     | Когда создали                      |
| `updatedAt`      | `string`                     | Когда меняли. Необязательно        |

### `LeadStatus`

| Значение      | Описание   |
| ------------- | ---------- |
| `new`         | Новая      |
| `in_progress` | В работе   |
| `completed`   | Завершена  |
| `canceled`    | Отменена   |
| `deleted`     | Удалена    |

### `LeadPaymentStatus`

| Значение      | Описание    |
| ------------- | ----------- |
| `pending`     | Ожидает     |
| `in_progress` | В процессе  |
| `paid`        | Оплачена    |
| `error`       | Ошибка      |

### `LeadMoney`

| Поле     | Тип               | Описание           |
| -------- | ----------------- | ------------------ |
| `value`  | `number`          | Число              |
| `unit`   | `string`          | Валюта             |
| `string` | `string \| null`  | Строка для показа  |

### `LeadCustomer`

| Поле    | Тип              | Описание |
| ------- | ---------------- | -------- |
| `name`  | `string`         | Имя      |
| `phone` | `string`         | Телефон  |
| `email` | `string \| null` | Email    |

### `LeadFormField`

| Поле    | Тип                | Описание     |
| ------- | ------------------ | ------------ |
| `id`    | `number \| string` | Id поля      |
| `name`  | `string`           | Подпись поля |
| `value` | `string \| null`   | Ответ        |
| `type`  | `string`           | Тип поля     |

### `LeadOrderItem`

| Поле          | Тип                     | Описание                  |
| ------------- | ----------------------- | ------------------------- |
| `id`          | `string`                | Id строки                 |
| `productId`   | `number`                | Id товара                 |
| `variantId`   | `number`                | Id варианта               |
| `name`        | `string`                | Название на момент заказа |
| `quantity`    | `number`                | Количество                |
| `price`       | `LeadMoney`             | Цена одной штуки          |
| `rowTotal`    | `LeadMoney`             | Сумма строки              |
| `image`       | `{ id, ext }`           | Картинка строки           |
| `reservation` | `{ id, quantity } \| null` | Резерв строки. Необязательно |

### `image`

| Поле  | Тип      | Описание  |
| ----- | -------- | --------- |
| `id`  | `number` | Id картинки |
| `ext` | `string` | Расширение  |

### `reservation`

| Поле       | Тип      | Описание                |
| ---------- | -------- | ----------------------- |
| `id`       | `number` | Id резерва              |
| `quantity` | `number` | Сколько зарезервировано |

### `LeadShipping`

| Поле            | Тип          | Описание              |
| --------------- | ------------ | --------------------- |
| `id`            | `string`     | Id способа доставки   |
| `name`          | `string`     | Название              |
| `price`         | `LeadMoney`  | Цена                  |
| `isCustomQuote` | `boolean`    | Своя цена             |
| `type`          | `string`     | Тип доставки          |
| `fields`        | `unknown[]`  | Поля способа доставки |
| `address`       | `address`    | Адрес                 |

### `address`

| Поле           | Тип      | Описание        |
| -------------- | -------- | --------------- |
| `addressLine1` | `string` | Адрес           |
| `addressLine2` | `string` | Необязательно   |
| `region`       | `string` | Регион          |
| `city`         | `string` | Город           |
| `zipCode`      | `string` | Индекс          |

### `LeadOrderDiscount`

| Поле             | Тип                         | Описание        |
| ---------------- | --------------------------- | --------------- |
| `id`             | `number`                    | Id скидки       |
| `type`           | `'discount' \| 'promocode'` | Вид скидки      |
| `discountType`   | `'percent' \| 'money'`      | Как считается   |
| `discountAmount` | `string`                    | Размер скидки   |
| `deliveryFree`   | `boolean \| null`           | Бесплатная доставка |
| `code`           | `string \| null`            | Промокод        |

### `LeadPayment`

| Поле              | Тип                 | Описание                              |
| ----------------- | ------------------- | ------------------------------------- |
| `id`              | `number`            | Id платежа                            |
| `amount`          | `LeadMoney`         | Сумма                                 |
| `status`          | `LeadPaymentStatus` | Статус оплаты                         |
| `paymentProvider` | `string`            | Провайдер                             |
| `isTestPayment`   | `boolean`           | Тестовый платёж                       |
| `description`     | `string \| null`    | Описание                              |
| `createdAt`       | `string \| null`    | Когда создан                          |
| `payLink`         | `string \| null`    | Ссылка на оплату                      |
| `completedAt`     | `string`            | Когда оплата завершилась. Необязательно |

### `LeadTracking`

| Поле         | Тип      | Описание                            |
| ------------ | -------- | ----------------------------------- |
| `ip`         | `string` | IP                                  |
| `deviceType` | `string` | Тип устройства                      |
| `userAgent`  | `string` | User-Agent                          |
| `visitorId`  | `string` | Id посетителя                       |
| `pageId`     | `number` | Страница, с которой отправили форму |

## `list`

Возвращает заявки сайта. Удалённые в список не попадают, пока не зададите `showDeleted`.

`GET /sites/{siteId}/leads`

```typescript
const leads = await site.leads.list({ page: 1, limit: 20 });
```

**Вход**

| Поле            | Тип                 | Описание                                                                                  |
| --------------- | ------------------- | ----------------------------------------------------------------------------------------- |
| `page`          | `number`            | Номер страницы списка. Необязательно                                                      |
| `limit`         | `number`            | Сколько заявок на страницу. Необязательно                                                 |
| `showDeleted`   | `boolean`           | Включить заявки со статусом `deleted`. Необязательно                                      |
| `status`        | `LeadStatus`        | Статус. Необязательно                                                                     |
| `paymentStatus` | `LeadPaymentStatus` | Статус оплаты. Необязательно                                                              |
| `isRead`        | `boolean`           | Прочитана или нет. Необязательно                                                          |
| `clientName`    | `string`            | Поиск по имени, подстрока. Необязательно                                                  |
| `clientEmail`   | `string`            | Поиск по email, подстрока. Необязательно                                                  |
| `clientPhone`   | `string`            | Поиск по телефону, подстрока. Необязательно                                               |
| `dateFrom`      | `string`            | Заявки не раньше этой даты. Необязательно                                                 |
| `dateTo`        | `string`            | Заявки не позже этой даты. Необязательно                                                  |
| `numberMin`     | `number`            | Номер заявки от. Необязательно                                                            |
| `numberMax`     | `number`            | Номер заявки до. Необязательно                                                            |
| `amountMin`     | `number`            | Сумма от. Необязательно                                                                   |
| `amountMax`     | `number`            | Сумма до. Необязательно                                                                   |
| `sorting`       | `string`            | `field:direction`, например `date:desc`. Если направление не задано, сортировка по убыванию |

**Ответ**

| Поле                | Тип      | Описание                     |
| ------------------- | -------- | ---------------------------- |
| `list`              | `Lead[]` | [`Lead`](#lead)  |
| `pagination.limit`  | `number` | Размер страницы              |
| `pagination.offset` | `number` | Смещение                     |
| `pagination.total`  | `number` | Всего записей                |

## `get`

Возвращает одну заявку.

`GET /sites/{siteId}/leads/{leadId}`

```typescript
const lead = await site.leads.get(leadId);
```

**Вход**

| Поле     | Тип      | Описание   |
| -------- | -------- | ---------- |
| `leadId` | `number` | Id заявки  |

**Ответ** [`Lead`](#lead).

## `update`

Меняет статус, флаг прочтения, заметку, контакты и статус оплаты. Товары, доставка и скидки меняются своими методами.

`PATCH /sites/{siteId}/leads/{leadId}`

```typescript
const lead = await site.leads.update(leadId, { status: "completed", isRead: true });
```

**Вход**

| Поле             | Тип                 | Описание               |
| ---------------- | ------------------- | ---------------------- |
| `leadId`         | `number`            | Id заявки              |
| `status`         | `LeadStatus`        | Новый статус           |
| `isRead`         | `boolean`           | Прочитана              |
| `notes`          | `string \| null`    | Заметка                |
| `customer.name`  | `string`            | Имя. Необязательно     |
| `customer.phone` | `string`            | Телефон. Необязательно |
| `customer.email` | `string \| null`    | Email. Необязательно   |
| `payment.status`      | `LeadPaymentStatus` | Статус оплаты               |
| `payment.description` | `string \| null`    | Комментарий к оплате. Необязательно |

**Ответ** [`Lead`](#lead).

## `updateMany`

Меняет несколько заявок теми же полями, что `update`.

`POST /sites/{siteId}/leads/bulk`

```typescript
const leads = await site.leads.updateMany([leadId], { isRead: true });
```

**Вход**

| Поле  | Тип        | Описание                                      |
| ----- | ---------- | --------------------------------------------- |
| `ids` | `number[]` | Id заявок                                     |
| патч  | объект     | Те же поля, что у `update`, все необязательны |

**Ответ** тот же, что у `list`: `list` и `pagination`.

## `remove`

Мягко удаляет заявку. Строка остаётся, `status` становится `deleted`.

`DELETE /sites/{siteId}/leads/{leadId}`

```typescript
const lead = await site.leads.remove(leadId);
```

**Вход**

| Поле     | Тип      | Описание  |
| -------- | -------- | --------- |
| `leadId` | `number` | Id заявки |

**Ответ** [`Lead`](#lead) со статусом `deleted`.

## `replaceProducts`

Заменяет товарные строки заявки.

`PUT /sites/{siteId}/leads/{leadId}/products`

```typescript
const lead = await site.leads.replaceProducts(leadId, {
  items: [{ productId: 1, variantId: 2, name: "Кружка", quantity: 1, price: 500 }],
});
```

**Вход**

| Поле               | Тип      | Описание        |
| ------------------ | -------- | --------------- |
| `leadId`           | `number` | Id заявки       |
| `items`            | массив   | Новые строки    |
| `items[].productId`| `number` | Id товара       |
| `items[].variantId`| `number` | Id варианта     |
| `items[].name`     | `string` | Название        |
| `items[].quantity` | `number` | Количество      |
| `items[].price`    | `number` | Цена            |

**Ответ** [`Lead`](#lead).

## `applyPromotion`

Применяет акцию к заявке. Повторная отправка того же id не расходует лимит промокода второй раз.

`POST /sites/{siteId}/leads/{leadId}/promotions`

```typescript
const lead = await site.leads.applyPromotion(leadId, { id: promotionId });
```

**Вход**

| Поле     | Тип      | Описание   |
| -------- | -------- | ---------- |
| `leadId` | `number` | Id заявки  |
| `id`     | `number` | Id акции   |

**Ответ** [`Lead`](#lead).

## `removePromotion`

Снимает скидку или промокод. Снятие промокода возвращает его использование в лимит.

`DELETE /sites/{siteId}/leads/{leadId}/promotions/{type}`

```typescript
const lead = await site.leads.removePromotion(leadId, "promocode");
```

**Вход**

| Поле     | Тип                        | Описание          |
| -------- | -------------------------- | ----------------- |
| `leadId` | `number`                   | Id заявки         |
| `type`   | `'discount' \| 'promocode'` | Что снять        |

**Ответ** [`Lead`](#lead).

## `setShipping`

Ставит доставку заявки.

`POST /sites/{siteId}/leads/{leadId}/shipping`

```typescript
const lead = await site.leads.setShipping(leadId, {
  id: "courier",
  name: "Курьер",
  price: 300,
});
```

**Вход**

| Поле                   | Тип      | Описание                         |
| ---------------------- | -------- | -------------------------------- |
| `leadId`               | `number` | Id заявки                        |
| `id`                   | `string` | Id способа доставки. Обязательно |
| `name`                 | `string` | Название способа. Обязательно    |
| `price`                | `number` | Цена. Обязательно                |
| `isCustomQuote`        | `boolean`| Цену называет менеджер. Необязательно |
| `type`                 | `string` | Тип способа доставки. Необязательно |
| `address`              | объект   | Адрес. Необязательно             |
| `address.country`      | `string` | Страна. Необязательно            |
| `address.region`       | `string` | Регион. Необязательно            |
| `address.city`         | `string` | Город. Необязательно             |
| `address.addressLine1` | `string` | Улица и дом. Необязательно       |
| `address.addressLine2` | `string` | Квартира. Необязательно          |
| `address.zipCode`      | `string` | Индекс. Необязательно            |

**Ответ** [`Lead`](#lead).

## Резервы

### `createReservations`

Резервирует каждую товарную строку. Повторный вызов возвращает уже созданные резервы.

`POST /sites/{siteId}/leads/{leadId}/reservations`

```typescript
const reservations = await site.leads.createReservations(leadId);
```

**Вход**

| Поле     | Тип      | Описание  |
| -------- | -------- | --------- |
| `leadId` | `number` | Id заявки |

**Ответ**

| Поле               | Тип      | Описание        |
| ------------------ | -------- | --------------- |
| `list`             | массив   | Строки резерва  |
| `list[].id`        | `number` | Id резерва      |
| `list[].leadId`    | `number` | Id заявки       |
| `list[].variantId` | `number` | Id варианта     |
| `list[].quantity`  | `number` | Количество      |

### `removeReservations`

Снимает все резервы заявки и возвращает количество на склад.

`DELETE /sites/{siteId}/leads/{leadId}/reservations`

```typescript
const reservations = await site.leads.removeReservations(leadId);
```

**Вход**

| Поле     | Тип      | Описание  |
| -------- | -------- | --------- |
| `leadId` | `number` | Id заявки |

**Ответ** тот же `{ list }`, что у `createReservations`.

### `refillReservation`

Добирает резерв до количеств, записанных в заявке. Передайте id резерва из строки резерва.

`PUT /sites/{siteId}/reservations/{reservationId}`

```typescript
const reservations = await site.leads.refillReservation(reservationId);
```

**Вход**

| Поле            | Тип      | Описание   |
| --------------- | -------- | ---------- |
| `reservationId` | `number` | Id резерва |

**Ответ** тот же `{ list }`, что у `createReservations`.
