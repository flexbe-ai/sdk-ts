# Leads

`site.leads` reads and updates leads for one site.

```typescript
import { LeadStatus } from "@flexbe/sdk";

const page = await site.leads.list({ limit: 20, status: LeadStatus.NEW });
const lead = page.list[0];
```

`site.leads.get(id)` loads one card. Paths sit on `/sites/{siteId}` unless a method says otherwise.

Shop delivery, tax, and the shared cart are on [Settings](settings.md). Catalog discounts are on [Ecommerce](ecommerce.md). A discount stored on a lead is the snapshot from the moment it was applied (`LeadOrderDiscount`).

## Lead card

| Field                      | Type                                                         |
| -------------------------- | ------------------------------------------------------------ |
| `id`, `sequence`, `siteId` | `number`                                                     |
| `status`                   | `LeadStatus`                                                 |
| `isRead`                   | `boolean`                                                    |
| `formName`                 | `string`                                                     |
| `customer`                 | `{ name, phone, email }`                                     |
| `formFields`               | `{ id, name, value, type }[]` or `null`                      |
| `orderItems`               | line items or `null`                                         |
| `orderShipping`            | `LeadShipping` or `null`                                     |
| `orderDiscounts`           | snapshots or `null`                                          |
| `payment`                  | `LeadPayment` or `null`                                      |
| `taxSnapshot`              | object or `null`                                             |
| `notes`                    | `string` or `null`                                           |
| `tracking`                 | `{ ip, deviceType, userAgent, visitorId, pageId }` or `null` |
| `trackingExtra`            | object or `null`                                             |
| `createdAt`                | `string`                                                     |
| `updatedAt`                | optional `string`                                            |

`LeadStatus`: `new`, `in_progress`, `completed`, `canceled`, `deleted`.

`LeadPaymentStatus`: `pending`, `in_progress`, `paid`, `error`.

Money fields (`LeadMoney`) are `{ value, unit, string }`. `string` may be `null`.

An order line is `{ id, productId, variantId, name, quantity, price, rowTotal, image, reservation? }`. `image` is `{ id, ext }`. `reservation` is `{ id, quantity }` or `null`.

`LeadShipping` on the card includes `fields` and `address` (`addressLine1`, optional `addressLine2`, `region`, `city`, `zipCode`). The body for `setShipping` is below, under that method.

`LeadPayment` is `{ id, amount, status, paymentProvider, isTestPayment, completedAt? }`.

## `list`

`GET /sites/{siteId}/leads`

```typescript
list(params?: ListLeadsParams): Promise<LeadListResponse>
```

Returns `{ list, pagination }`. Deleted leads stay out of the list unless you set `showDeleted`.

| Field                                      | Notes                                                                         |
| ------------------------------------------ | ----------------------------------------------------------------------------- |
| `page`, `limit`                            |                                                                               |
| `showDeleted`                              | Include leads with status `deleted`                                           |
| `status`                                   | `LeadStatus`                                                                  |
| `paymentStatus`                            | `LeadPaymentStatus`                                                           |
| `isRead`                                   | `boolean`                                                                     |
| `clientName`, `clientEmail`, `clientPhone` | Substring match                                                               |
| `dateFrom`, `dateTo`                       |                                                                               |
| `numberMin`, `numberMax`                   | Lead number range                                                             |
| `amountMin`, `amountMax`                   | Amount range                                                                  |
| `sorting`                                  | `field:direction`, for example `date:desc`. A missing direction is descending |

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

Changes status, the read flag, the note, contacts, and payment status. Products, shipping, and discounts have their own methods.

| Field            | Type                             |
| ---------------- | -------------------------------- |
| `status`         | `LeadStatus`                     |
| `isRead`         | `boolean`                        |
| `notes`          | `string \| null`                 |
| `customer`       | partial `{ name, phone, email }` |
| `payment.status` | `LeadPaymentStatus`              |

## `updateMany`

`POST /sites/{siteId}/leads/bulk`

```typescript
updateMany(ids: number[], data: UpdateLeadParams): Promise<LeadListResponse>
```

Sends `{ ids, ...data }` with the same fields as `update`. Returns `{ list, pagination }`.

## `remove`

`DELETE /sites/{siteId}/leads/{leadId}`

```typescript
remove(leadId: number): Promise<Lead>
```

Soft-delete. The row stays, and `status` becomes `deleted`.

## `replaceProducts`

`PUT /sites/{siteId}/leads/{leadId}/products`

```typescript
replaceProducts(leadId: number, data: ReplaceLeadProductsParams): Promise<Lead>
```

`items` entries are `{ productId, variantId, name, quantity, price }`. `price` is a number.

## `applyPromotion`

`POST /sites/{siteId}/leads/{leadId}/promotions`

```typescript
applyPromotion(leadId: number, data: ApplyLeadPromotionParams): Promise<Lead>
```

`ApplyLeadPromotionParams` is `{ id }`. Sending the same id again does not use the promocode limit a second time.

## `removePromotion`

`DELETE /sites/{siteId}/leads/{leadId}/promotions/{type}`

```typescript
removePromotion(leadId: number, type: 'discount' | 'promocode'): Promise<Lead>
```

Removing a promocode restores its limit.

## `setShipping`

`POST /sites/{siteId}/leads/{leadId}/shipping`

```typescript
setShipping(leadId: number, data: SetLeadShippingParams): Promise<Lead>
```

| Field           | Required                                                                            |
| --------------- | ----------------------------------------------------------------------------------- |
| `id`, `name`    | yes, strings                                                                        |
| `price`         | yes, number                                                                         |
| `isCustomQuote` | no, boolean                                                                         |
| `type`          | no, string                                                                          |
| `address`       | no. Optional `country`, `region`, `city`, `addressLine1`, `addressLine2`, `zipCode` |

## Reservations

### `createReservations`

`POST /sites/{siteId}/leads/{leadId}/reservations`

```typescript
createReservations(leadId: number): Promise<LeadReservationListResponse>
```

Reserves every product line. A later call returns the current rows and does not reserve more. The response is `{ list }`. A row is `{ id, leadId, variantId, quantity }`.

### `removeReservations`

`DELETE /sites/{siteId}/leads/{leadId}/reservations`

```typescript
removeReservations(leadId: number): Promise<LeadReservationListResponse>
```

Releases every reservation on the lead and returns the pieces to stock.

### `refillReservation`

`PUT /sites/{siteId}/reservations/{reservationId}`

```typescript
refillReservation(reservationId: number): Promise<LeadReservationListResponse>
```

Tops the reservation up to the quantities stored on the lead. Pass the reservation id from a reservation row.
