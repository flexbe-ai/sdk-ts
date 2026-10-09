# Заявки

`site.leads` читает и обновляет заявки одного сайта.

```typescript
import { LeadStatus } from "@flexbe/sdk";

const page = await site.leads.list({ limit: 20, status: LeadStatus.NEW });
const lead = page.list[0];
```

`site.leads.get(id)` загружает одну карточку. Пути лежат на `/sites/{siteId}`, если у метода не сказано иначе.

Доставка магазина, налог и общая корзина — в разделе [Настройки](settings.md). Скидки каталога — в разделе [Магазин](ecommerce.md). Скидка, записанная в заявке, — снимок на момент применения (`LeadOrderDiscount`).

## Карточка заявки

| Поле                       | Тип                                                           |
| -------------------------- | ------------------------------------------------------------- |
| `id`, `sequence`, `siteId` | `number`                                                      |
| `status`                   | `LeadStatus`                                                  |
| `isRead`                   | `boolean`                                                     |
| `formName`                 | `string`                                                      |
| `customer`                 | `{ name, phone, email }`                                      |
| `formFields`               | `{ id, name, value, type }[]` или `null`                      |
| `orderItems`               | строки заказа или `null`                                      |
| `orderShipping`            | `LeadShipping` или `null`                                     |
| `orderDiscounts`           | снимки или `null`                                             |
| `payment`                  | `LeadPayment` или `null`                                      |
| `taxSnapshot`              | объект или `null`                                             |
| `notes`                    | `string` или `null`                                           |
| `tracking`                 | `{ ip, deviceType, userAgent, visitorId, pageId }` или `null` |
| `trackingExtra`            | объект или `null`                                             |
| `createdAt`                | `string`                                                      |
| `updatedAt`                | необязательный `string`                                       |

`LeadStatus`: `new`, `in_progress`, `completed`, `canceled`, `deleted`.

`LeadPaymentStatus`: `pending`, `in_progress`, `paid`, `error`.

Денежные поля (`LeadMoney`) — `{ value, unit, string }`. `string` может быть `null`.

Строка заказа — `{ id, productId, variantId, name, quantity, price, rowTotal, image, reservation? }`. `image` — `{ id, ext }`. `reservation` — `{ id, quantity }` или `null`.

`LeadShipping` в карточке включает `fields` и `address` (`addressLine1`, необязательный `addressLine2`, `region`, `city`, `zipCode`). Тело для `setShipping` описано ниже, у этого метода.

`LeadPayment` — это `{ id, amount, status, paymentProvider, isTestPayment, completedAt? }`.

## `list`

`GET /sites/{siteId}/leads`

```typescript
list(params?: ListLeadsParams): Promise<LeadListResponse>
```

Возвращает `{ list, pagination }`. Удалённые заявки в список не попадают, пока не зададите `showDeleted`.

| Поле                                       | Примечание                                                                                  |
| ------------------------------------------ | ------------------------------------------------------------------------------------------- |
| `page`, `limit`                            |                                                                                             |
| `showDeleted`                              | Включить заявки со статусом `deleted`                                                       |
| `status`                                   | `LeadStatus`                                                                                |
| `paymentStatus`                            | `LeadPaymentStatus`                                                                         |
| `isRead`                                   | `boolean`                                                                                   |
| `clientName`, `clientEmail`, `clientPhone` | Поиск по подстроке                                                                          |
| `dateFrom`, `dateTo`                       |                                                                                             |
| `numberMin`, `numberMax`                   | Диапазон номера заявки                                                                      |
| `amountMin`, `amountMax`                   | Диапазон суммы                                                                              |
| `sorting`                                  | `field:direction`, например `date:desc`. Если направление не задано, сортировка по убыванию |

## `get`

`GET /sites/{siteId}/leads/{leadId}`

```typescript
get(leadId: number): Promise<Lead>
```

## `update`

`PATCH /sites/{siteId}/leads/{leadId}`

```typescript
update(leadId: number, data: UpdateLeadParams): Promise<Lead>
```

Меняет статус, флаг прочтения, заметку, контакты и статус оплаты. Товары, доставка и скидки меняются своими методами.

| Поле             | Тип                                |
| ---------------- | ---------------------------------- |
| `status`         | `LeadStatus`                       |
| `isRead`         | `boolean`                          |
| `notes`          | `string \| null`                   |
| `customer`       | частичный `{ name, phone, email }` |
| `payment.status` | `LeadPaymentStatus`                |

## `updateMany`

`POST /sites/{siteId}/leads/bulk`

```typescript
updateMany(ids: number[], data: UpdateLeadParams): Promise<LeadListResponse>
```

Отправляет `{ ids, ...data }` с теми же полями, что и `update`. Возвращает `{ list, pagination }`.

## `remove`

`DELETE /sites/{siteId}/leads/{leadId}`

```typescript
remove(leadId: number): Promise<Lead>
```

Мягкое удаление. Строка остаётся, `status` становится `deleted`.

## `replaceProducts`

`PUT /sites/{siteId}/leads/{leadId}/products`

```typescript
replaceProducts(leadId: number, data: ReplaceLeadProductsParams): Promise<Lead>
```

Элементы `items` — `{ productId, variantId, name, quantity, price }`. `price` — число.

## `applyPromotion`

`POST /sites/{siteId}/leads/{leadId}/promotions`

```typescript
applyPromotion(leadId: number, data: ApplyLeadPromotionParams): Promise<Lead>
```

`ApplyLeadPromotionParams` — это `{ id }`. Повторная отправка того же id не расходует лимит промокода второй раз.

## `removePromotion`

`DELETE /sites/{siteId}/leads/{leadId}/promotions/{type}`

```typescript
removePromotion(leadId: number, type: 'discount' | 'promocode'): Promise<Lead>
```

Снятие промокода возвращает его использование в лимит.

## `setShipping`

`POST /sites/{siteId}/leads/{leadId}/shipping`

```typescript
setShipping(leadId: number, data: SetLeadShippingParams): Promise<Lead>
```

| Поле            | Обязательно                                                                                |
| --------------- | ------------------------------------------------------------------------------------------ |
| `id`, `name`    | да, строки                                                                                 |
| `price`         | да, число                                                                                  |
| `isCustomQuote` | нет, `boolean`                                                                             |
| `type`          | нет, строка                                                                                |
| `address`       | нет. Необязательные `country`, `region`, `city`, `addressLine1`, `addressLine2`, `zipCode` |

## Резервы

### `createReservations`

`POST /sites/{siteId}/leads/{leadId}/reservations`

```typescript
createReservations(leadId: number): Promise<LeadReservationListResponse>
```

Резервирует каждую товарную строку. Следующий вызов возвращает текущие строки и больше ничего не резервирует. Ответ — `{ list }`. Строка — `{ id, leadId, variantId, quantity }`.

### `removeReservations`

`DELETE /sites/{siteId}/leads/{leadId}/reservations`

```typescript
removeReservations(leadId: number): Promise<LeadReservationListResponse>
```

Снимает все резервы заявки и возвращает количество на склад.

### `refillReservation`

`PUT /sites/{siteId}/reservations/{reservationId}`

```typescript
refillReservation(reservationId: number): Promise<LeadReservationListResponse>
```

Добирает резерв до количеств, записанных в заявке. Передайте id резерва из строки резерва.
