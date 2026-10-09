# site > Leads

`site.leads` reads and updates leads for one site.

```typescript
import { LeadStatus } from "@flexbe/sdk";

const page = await site.leads.list({ limit: 20, status: LeadStatus.NEW });
const lead = page.list[0];
```

`site.leads.get(id)` loads one card. Paths sit on `/sites/{siteId}` unless a method says otherwise.

Shop delivery, tax, and the shared cart are on [Settings](settings.md). Catalog discounts are on [Ecommerce](ecommerce.md). A discount stored on a lead is the snapshot from the moment it was applied (`LeadOrderDiscount`).

## Lead card

| Field                             | Type                      | Description                                |
| --------------------------------- | ------------------------- | ------------------------------------------ |
| `id`                              | `number`                  | Lead id                                    |
| `sequence`                        | `number`                  | Lead number on the site                    |
| `siteId`                          | `number`                  | Site id                                    |
| `status`                          | `LeadStatus`              | Lead status                                |
| `isRead`                          | `boolean`                 | Someone has opened the lead                |
| `formName`                        | `string`                  | Form name                                  |
| `customer.name`                   | `string`                  | Name                                       |
| `customer.phone`                  | `string`                  | Phone                                      |
| `customer.email`                  | `string \| null`          | Email                                      |
| `formFields`                      | array or `null`           | Form answers                               |
| `formFields[].id`                 | `number \| string`        | Field id                                   |
| `formFields[].name`               | `string`                  | Field label                                |
| `formFields[].value`              | `string \| null`          | Answer                                     |
| `formFields[].type`               | `string`                  | Field type                                 |
| `orderItems`                      | array or `null`           | Order lines                                |
| `orderItems[].id`                 | `string`                  | Line id                                    |
| `orderItems[].productId`          | `number`                  | Product id                                 |
| `orderItems[].variantId`          | `number`                  | Variant id                                 |
| `orderItems[].name`               | `string`                  | Name at order time                         |
| `orderItems[].quantity`           | `number`                  | Quantity                                   |
| `orderItems[].price`              | `LeadMoney`               | Unit price                                 |
| `orderItems[].rowTotal`           | `LeadMoney`               | Line total                                 |
| `orderItems[].image.id`           | `number`                  | Image id                                   |
| `orderItems[].image.ext`          | `string`                  | Image extension                            |
| `orderItems[].reservation`        | object or `null`          | Reservation for this line, when there is one |
| `orderItems[].reservation.id`     | `number`                  | Reservation id                             |
| `orderItems[].reservation.quantity` | `number`                | Reserved quantity                          |
| `orderShipping`                   | `LeadShipping` or `null`  | Shipping                                   |
| `orderDiscounts`                  | array or `null`           | Discount snapshots from when they were applied |
| `payment`                         | `LeadPayment` or `null`   | Payment                                    |
| `payment.id`                      | `number`                  | Payment id                                 |
| `payment.amount`                  | `LeadMoney`               | Amount                                     |
| `payment.status`                  | `LeadPaymentStatus`       | Payment status                             |
| `payment.paymentProvider`         | `string`                  | Provider                                   |
| `payment.isTestPayment`           | `boolean`                 | Test payment                               |
| `payment.completedAt`             | `string`, optional        | When the payment finished                  |
| `taxSnapshot`                     | object or `null`          | Tax as it was when the lead was created    |
| `notes`                           | `string` or `null`        | Note                                       |
| `tracking`                        | object or `null`          | Where the lead came from                   |
| `tracking.ip`                     | `string`                  | IP                                         |
| `tracking.deviceType`             | `string`                  | Device type                                |
| `tracking.userAgent`              | `string`                  | User-Agent                                 |
| `tracking.visitorId`              | `string`                  | Visitor id                                 |
| `tracking.pageId`                 | `number`                  | Page that submitted the form               |
| `trackingExtra`                   | object or `null`          | Extra visit tags                           |
| `createdAt`                       | `string`                  | When it was created                        |
| `updatedAt`                       | `string`, optional        | When it was changed                        |

`LeadStatus`: `new`, `in_progress`, `completed`, `canceled`, `deleted`.

`LeadPaymentStatus`: `pending`, `in_progress`, `paid`, `error`.

`LeadMoney` is `value` (number), `unit` (currency), and `string` (display text, may be `null`).

`orderShipping.fields` are the shipping-method fields. `orderShipping.address` is `addressLine1`, optional `addressLine2`, `region`, `city`, `zipCode`. The body for `setShipping` is below, under that method.

## `list`

Returns the leads of the site. Deleted leads stay out of the list unless you set `showDeleted`.

`GET /sites/{siteId}/leads`

```typescript
const leads = await site.leads.list({ page: 1, limit: 20 });
```

**Input**

| Field           | Type                | Description                                                                       |
| --------------- | ------------------- | --------------------------------------------------------------------------------- |
| `page`          | `number`            | List page number. Optional                                                        |
| `limit`         | `number`            | How many leads per page. Optional                                                 |
| `showDeleted`   | `boolean`           | Include leads with status `deleted`. Optional                                     |
| `status`        | `LeadStatus`        | Status. Optional                                                                  |
| `paymentStatus` | `LeadPaymentStatus` | Payment status. Optional                                                          |
| `isRead`        | `boolean`           | Read or not. Optional                                                             |
| `clientName`    | `string`            | Name search, substring. Optional                                                  |
| `clientEmail`   | `string`            | Email search, substring. Optional                                                 |
| `clientPhone`   | `string`            | Phone search, substring. Optional                                                 |
| `dateFrom`      | `string`            | Leads on or after this date. Optional                                             |
| `dateTo`        | `string`            | Leads on or before this date. Optional                                            |
| `numberMin`     | `number`            | Lead number from. Optional                                                        |
| `numberMax`     | `number`            | Lead number to. Optional                                                          |
| `amountMin`     | `number`            | Amount from. Optional                                                             |
| `amountMax`     | `number`            | Amount to. Optional                                                               |
| `sorting`       | `string`            | `field:direction`, for example `date:desc`. A missing direction is descending    |

**Response**

| Field               | Type     | Description                    |
| ------------------- | -------- | ------------------------------ |
| `list`              | `Lead[]` | Leads. Fields in the table above |
| `pagination.limit`  | `number` | Page size                      |
| `pagination.offset` | `number` | Offset                         |
| `pagination.total`  | `number` | Total rows                     |

## `get`

Returns one lead.

`GET /sites/{siteId}/leads/{leadId}`

```typescript
const lead = await site.leads.get(leadId);
```

**Input**

| Field    | Type     | Description |
| -------- | -------- | ----------- |
| `leadId` | `number` | Lead id     |

**Response** `Lead`. Fields in the table above.

## `update`

Changes status, the read flag, the note, contacts, and payment status. Products, shipping, and discounts have their own methods.

`PATCH /sites/{siteId}/leads/{leadId}`

```typescript
const lead = await site.leads.update(leadId, { status: "completed", isRead: true });
```

**Input**

| Field                 | Type                | Description                    |
| --------------------- | ------------------- | ------------------------------ |
| `leadId`              | `number`            | Lead id                        |
| `status`              | `LeadStatus`        | New status                     |
| `isRead`              | `boolean`           | Read                           |
| `notes`               | `string \| null`    | Note                           |
| `customer.name`       | `string`            | Name. Optional                 |
| `customer.phone`      | `string`            | Phone. Optional                |
| `customer.email`      | `string \| null`    | Email. Optional                |
| `payment.status`      | `LeadPaymentStatus` | Payment status                 |
| `payment.description` | `string \| null`    | Payment note. Optional         |

**Response** `Lead`. Fields in the table above.

## `updateMany`

Updates several leads with the same fields as `update`. The body is `{ ids, ...data }`.

`POST /sites/{siteId}/leads/bulk`

```typescript
const leads = await site.leads.updateMany([leadId], { isRead: true });
```

**Input**

| Field | Type       | Description                              |
| ----- | ---------- | ---------------------------------------- |
| `ids` | `number[]` | Lead ids                                 |
| patch | object     | The same fields as `update`, all optional |

**Response** the same as `list`: `list` and `pagination`.

## `remove`

Soft-deletes a lead. The row stays, and `status` becomes `deleted`.

`DELETE /sites/{siteId}/leads/{leadId}`

```typescript
const lead = await site.leads.remove(leadId);
```

**Input**

| Field    | Type     | Description |
| -------- | -------- | ----------- |
| `leadId` | `number` | Lead id     |

**Response** `Lead` with status `deleted`.

## `replaceProducts`

Replaces the product lines of a lead.

`PUT /sites/{siteId}/leads/{leadId}/products`

```typescript
const lead = await site.leads.replaceProducts(leadId, {
  items: [{ productId: 1, variantId: 2, name: "Mug", quantity: 1, price: 500 }],
});
```

**Input**

| Field                | Type     | Description |
| -------------------- | -------- | ----------- |
| `leadId`             | `number` | Lead id     |
| `items`              | array    | New lines   |
| `items[].productId`  | `number` | Product id  |
| `items[].variantId`  | `number` | Variant id  |
| `items[].name`       | `string` | Name        |
| `items[].quantity`   | `number` | Quantity    |
| `items[].price`      | `number` | Price       |

**Response** `Lead`. Fields in the table above.

## `applyPromotion`

Applies a promotion to the lead. Sending the same id again does not use the promocode limit a second time.

`POST /sites/{siteId}/leads/{leadId}/promotions`

```typescript
const lead = await site.leads.applyPromotion(leadId, { id: promotionId });
```

**Input**

| Field    | Type     | Description    |
| -------- | -------- | -------------- |
| `leadId` | `number` | Lead id        |
| `id`     | `number` | Promotion id   |

**Response** `Lead`. Fields in the table above.

## `removePromotion`

Removes a discount or a promocode. Removing a promocode restores its limit.

`DELETE /sites/{siteId}/leads/{leadId}/promotions/{type}`

```typescript
const lead = await site.leads.removePromotion(leadId, "promocode");
```

**Input**

| Field    | Type                         | Description |
| -------- | ---------------------------- | ----------- |
| `leadId` | `number`                     | Lead id     |
| `type`   | `'discount' \| 'promocode'`  | What to remove |

**Response** `Lead`. Fields in the table above.

## `setShipping`

Sets shipping on the lead.

`POST /sites/{siteId}/leads/{leadId}/shipping`

```typescript
const lead = await site.leads.setShipping(leadId, {
  id: "courier",
  name: "Courier",
  price: 300,
});
```

**Input**

| Field                  | Type      | Description                          |
| ---------------------- | --------- | ------------------------------------ |
| `leadId`               | `number`  | Lead id                              |
| `id`                   | `string`  | Shipping method id. Required         |
| `name`                 | `string`  | Method name. Required                |
| `price`                | `number`  | Price. Required                      |
| `isCustomQuote`        | `boolean` | A manager quotes the price. Optional |
| `type`                 | `string`  | Shipping method type. Optional       |
| `address`              | object    | Address. Optional                    |
| `address.country`      | `string`  | Country. Optional                    |
| `address.region`       | `string`  | Region. Optional                     |
| `address.city`         | `string`  | City. Optional                       |
| `address.addressLine1` | `string`  | Street and building. Optional        |
| `address.addressLine2` | `string`  | Apartment. Optional                  |
| `address.zipCode`      | `string`  | Postal code. Optional                |

**Response** `Lead`. Fields in the table above.

## Reservations

### `createReservations`

Reserves every product line. A later call returns the current rows and does not reserve more.

`POST /sites/{siteId}/leads/{leadId}/reservations`

```typescript
const reservations = await site.leads.createReservations(leadId);
```

**Input**

| Field    | Type     | Description |
| -------- | -------- | ----------- |
| `leadId` | `number` | Lead id     |

**Response**

| Field              | Type     | Description        |
| ------------------ | -------- | ------------------ |
| `list`             | array    | Reservation rows   |
| `list[].id`        | `number` | Reservation id     |
| `list[].leadId`    | `number` | Lead id            |
| `list[].variantId` | `number` | Variant id         |
| `list[].quantity`  | `number` | Quantity           |

### `removeReservations`

Releases every reservation on the lead and returns the pieces to stock.

`DELETE /sites/{siteId}/leads/{leadId}/reservations`

```typescript
const reservations = await site.leads.removeReservations(leadId);
```

**Input**

| Field    | Type     | Description |
| -------- | -------- | ----------- |
| `leadId` | `number` | Lead id     |

**Response** the same `{ list }` as `createReservations`.

### `refillReservation`

Tops the reservation up to the quantities stored on the lead. Pass the reservation id from a reservation row.

`PUT /sites/{siteId}/reservations/{reservationId}`

```typescript
const reservations = await site.leads.refillReservation(reservationId);
```

**Input**

| Field           | Type     | Description    |
| --------------- | -------- | -------------- |
| `reservationId` | `number` | Reservation id |

**Response** the same `{ list }` as `createReservations`.
