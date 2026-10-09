# site > Заявки

`site.leads` читает и обновляет заявки одного сайта.

```typescript
import { LeadStatus } from "@flexbe/sdk";

const page = await site.leads.list({ limit: 20, status: LeadStatus.NEW });
const lead = page.list[0];
```

`site.leads.get(id)` загружает одну карточку. Пути лежат на `/sites/{siteId}`, если у метода не сказано иначе.

Доставка магазина, налог и общая корзина — в разделе [Настройки](settings.md). Скидки каталога — в разделе [Магазин](ecommerce.md). Скидка, записанная в заявке, — снимок на момент применения (`LeadOrderDiscount`).

## Карточка заявки

| Поле                          | Тип                    | Описание                                      |
| ----------------------------- | ---------------------- | --------------------------------------------- |
| `id`                          | `number`               | Id заявки                                     |
| `sequence`                    | `number`               | Номер заявки на сайте                         |
| `siteId`                      | `number`               | Id сайта                                      |
| `status`                      | `LeadStatus`           | Статус заявки                                 |
| `isRead`                      | `boolean`              | Заявку уже открывали                          |
| `formName`                    | `string`               | Имя формы                                     |
| `customer.name`               | `string`               | Имя                                           |
| `customer.phone`              | `string`               | Телефон                                       |
| `customer.email`              | `string \| null`       | Email                                         |
| `formFields`                  | массив или `null`      | Ответы полей формы                            |
| `formFields[].id`             | `number \| string`     | Id поля                                       |
| `formFields[].name`           | `string`               | Подпись поля                                  |
| `formFields[].value`          | `string \| null`       | Ответ                                         |
| `formFields[].type`           | `string`               | Тип поля                                      |
| `orderItems`                  | массив или `null`      | Строки заказа                                 |
| `orderItems[].id`             | `string`               | Id строки                                     |
| `orderItems[].productId`      | `number`               | Id товара                                     |
| `orderItems[].variantId`      | `number`               | Id варианта                                   |
| `orderItems[].name`           | `string`               | Название на момент заказа                     |
| `orderItems[].quantity`       | `number`               | Количество                                    |
| `orderItems[].price`          | `LeadMoney`            | Цена одной штуки                              |
| `orderItems[].rowTotal`       | `LeadMoney`            | Сумма строки                                  |
| `orderItems[].image.id`       | `number`               | Id картинки                                   |
| `orderItems[].image.ext`      | `string`               | Расширение картинки                           |
| `orderItems[].reservation`    | объект или `null`      | Резерв этой строки, если есть                 |
| `orderItems[].reservation.id` | `number`               | Id резерва                                    |
| `orderItems[].reservation.quantity` | `number`         | Сколько зарезервировано                       |
| `orderShipping`               | `LeadShipping` или `null` | Доставка                                   |
| `orderDiscounts`              | массив или `null`      | Снимки скидок на момент применения            |
| `payment`                     | `LeadPayment` или `null` | Оплата                                      |
| `payment.id`                  | `number`               | Id платежа                                    |
| `payment.amount`              | `LeadMoney`            | Сумма                                         |
| `payment.status`              | `LeadPaymentStatus`    | Статус оплаты                                 |
| `payment.paymentProvider`     | `string`               | Провайдер                                     |
| `payment.isTestPayment`       | `boolean`              | Тестовый платёж                               |
| `payment.completedAt`         | `string`, необязательно | Когда оплата завершилась                     |
| `taxSnapshot`                 | объект или `null`      | Налог, как он был на момент заявки            |
| `notes`                       | `string` или `null`    | Заметка                                       |
| `tracking`                    | объект или `null`      | Откуда пришла заявка                          |
| `tracking.ip`                 | `string`               | IP                                            |
| `tracking.deviceType`         | `string`               | Тип устройства                                |
| `tracking.userAgent`          | `string`               | User-Agent                                    |
| `tracking.visitorId`          | `string`               | Id посетителя                                 |
| `tracking.pageId`             | `number`               | Страница, с которой отправили форму           |
| `trackingExtra`               | объект или `null`      | Дополнительные метки визита                   |
| `createdAt`                   | `string`               | Когда создали                                 |
| `updatedAt`                   | `string`, необязательно | Когда меняли                                 |

`LeadStatus`: `new`, `in_progress`, `completed`, `canceled`, `deleted`.

`LeadPaymentStatus`: `pending`, `in_progress`, `paid`, `error`.

`LeadMoney` — это `value` (число), `unit` (валюта) и `string` (строка для показа, может быть `null`).

`orderShipping.fields` — поля способа доставки. `orderShipping.address` — `addressLine1`, необязательный `addressLine2`, `region`, `city`, `zipCode`. Тело для `setShipping` описано ниже, у этого метода.

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
| `list`              | `Lead[]` | Заявки. Поля в таблице выше  |
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

**Ответ** `Lead`. Поля в таблице выше.

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

**Ответ** `Lead`. Поля в таблице выше.

## `updateMany`

Меняет несколько заявок теми же полями, что `update`. Тело — `{ ids, ...data }`.

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

**Ответ** `Lead` со статусом `deleted`.

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

**Ответ** `Lead`. Поля в таблице выше.

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

**Ответ** `Lead`. Поля в таблице выше.

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

**Ответ** `Lead`. Поля в таблице выше.

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

**Ответ** `Lead`. Поля в таблице выше.

## Резервы

### `createReservations`

Резервирует каждую товарную строку. Следующий вызов возвращает текущие строки и больше ничего не резервирует.

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
