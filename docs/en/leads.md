# Site → Leads

`site.leads` reads and updates leads for the site.

```typescript
import { LeadStatus } from "@flexbe/sdk";

const page = await site.leads.list({ limit: 20, status: LeadStatus.NEW });
const lead = page.list[0];
```

### `Lead`

| Field            | Type                          | Description                   |
| ---------------- | ----------------------------- | ----------------------------- |
| `id`             | `number`                      | Lead id                       |
| `sequence`       | `number`                      | Lead number on the site       |
| `siteId`         | `number`                      | Site id                       |
| `status`         | `LeadStatus`                  | Lead status                   |
| `isRead`         | `boolean`                     | Someone has opened the lead   |
| `formName`       | `string`                      | Form name                     |
| `customer`       | `LeadCustomer`                | Customer                      |
| `formFields`     | `LeadFormField[] \| null`     | Form answers                  |
| `orderItems`     | `LeadOrderItem[] \| null`     | Order lines                   |
| `orderShipping`  | `LeadShipping \| null`        | Shipping                      |
| `orderDiscounts` | `LeadOrderDiscount[] \| null` | Discount snapshots            |
| `payment`        | `LeadPayment \| null`         | Payment                       |
| `taxSnapshot`    | object or `null`              | Tax at the time of the lead   |
| `notes`          | `string \| null`              | Note                          |
| `custom`         | object or `null`              | Custom data                   |
| `tracking`       | `LeadTracking \| null`        | Where the lead came from      |
| `trackingExtra`  | object or `null`              | Extra visit tags              |
| `createdAt`      | `string`                      | When it was created           |
| `updatedAt`      | `string`                      | When it was changed. Optional |

### `LeadStatus`

| Value         | Description |
| ------------- | ----------- |
| `new`         | New         |
| `in_progress` | In progress |
| `completed`   | Completed   |
| `canceled`    | Canceled    |
| `deleted`     | Deleted     |

### `LeadPaymentStatus`

| Value         | Description |
| ------------- | ----------- |
| `pending`     | Pending     |
| `in_progress` | In progress |
| `paid`        | Paid        |
| `error`       | Error       |

### `LeadMoney`

| Field    | Type             | Description  |
| -------- | ---------------- | ------------ |
| `value`  | `number`         | Number       |
| `unit`   | `string`         | Currency     |
| `string` | `string \| null` | Display text |

### `LeadCustomer`

| Field   | Type             | Description |
| ------- | ---------------- | ----------- |
| `name`  | `string`         | Name        |
| `phone` | `string`         | Phone       |
| `email` | `string \| null` | Email       |

### `LeadFormField`

| Field   | Type               | Description |
| ------- | ------------------ | ----------- |
| `id`    | `number \| string` | Field id    |
| `name`  | `string`           | Field label |
| `value` | `string \| null`   | Answer      |
| `type`  | `string`           | Field type  |

### `LeadOrderItem`

| Field         | Type                       | Description                |
| ------------- | -------------------------- | -------------------------- |
| `id`          | `string`                   | Line id                    |
| `productId`   | `number`                   | Product id                 |
| `variantId`   | `number`                   | Variant id                 |
| `name`        | `string`                   | Name at order time         |
| `quantity`    | `number`                   | Quantity                   |
| `price`       | `LeadMoney`                | Unit price                 |
| `rowTotal`    | `LeadMoney`                | Line total                 |
| `image`       | `{ id, ext }`              | Line image                 |
| `reservation` | `{ id, quantity } \| null` | Line reservation. Optional |

### `image`

| Field | Type     | Description     |
| ----- | -------- | --------------- |
| `id`  | `number` | Image id        |
| `ext` | `string` | Image extension |

### `reservation`

| Field      | Type     | Description       |
| ---------- | -------- | ----------------- |
| `id`       | `number` | Reservation id    |
| `quantity` | `number` | Reserved quantity |

### `LeadShipping`

| Field           | Type        | Description            |
| --------------- | ----------- | ---------------------- |
| `id`            | `string`    | Shipping method id     |
| `name`          | `string`    | Name                   |
| `price`         | `LeadMoney` | Price                  |
| `isCustomQuote` | `boolean`   | Custom price           |
| `type`          | `string`    | Shipping type          |
| `fields`        | `unknown[]` | Shipping method fields |
| `address`       | `address`   | Address                |

### `address`

| Field          | Type     | Description |
| -------------- | -------- | ----------- |
| `addressLine1` | `string` | Address     |
| `addressLine2` | `string` | Optional    |
| `region`       | `string` | Region      |
| `city`         | `string` | City        |
| `zipCode`      | `string` | Postal code |

### `LeadOrderDiscount`

| Field            | Type                        | Description       |
| ---------------- | --------------------------- | ----------------- |
| `id`             | `number`                    | Discount id       |
| `type`           | `'discount' \| 'promocode'` | Discount kind     |
| `discountType`   | `'percent' \| 'money'`      | How it is counted |
| `discountAmount` | `string`                    | Discount amount   |
| `deliveryFree`   | `boolean \| null`           | Free delivery     |
| `code`           | `string \| null`            | Promo code        |

### `LeadPayment`

| Field             | Type                | Description                         |
| ----------------- | ------------------- | ----------------------------------- |
| `id`              | `number`            | Payment id                          |
| `amount`          | `LeadMoney`         | Amount                              |
| `status`          | `LeadPaymentStatus` | Payment status                      |
| `paymentProvider` | `string`            | Provider                            |
| `isTestPayment`   | `boolean`           | Test payment                        |
| `description`     | `string \| null`    | Description                         |
| `createdAt`       | `string \| null`    | When it was created                 |
| `payLink`         | `string \| null`    | Payment link                        |
| `completedAt`     | `string`            | When the payment finished. Optional |

### `LeadTracking`

| Field        | Type     | Description                  |
| ------------ | -------- | ---------------------------- |
| `ip`         | `string` | IP                           |
| `deviceType` | `string` | Device type                  |
| `userAgent`  | `string` | User-Agent                   |
| `visitorId`  | `string` | Visitor id                   |
| `pageId`     | `number` | Page that submitted the form |

---

## `list`

Returns the leads of the site. Deleted leads stay out of the list unless you set `showDeleted`.

`GET /sites/{siteId}/leads`

```typescript
const leads = await site.leads.list({ page: 1, limit: 20 });
```

**Input**

| Field           | Type                | Description                                                                   |
| --------------- | ------------------- | ----------------------------------------------------------------------------- |
| `page`          | `number`            | List page number. Optional                                                    |
| `limit`         | `number`            | How many leads per page. Optional                                             |
| `showDeleted`   | `boolean`           | Include leads with status `deleted`. Optional                                 |
| `status`        | `LeadStatus`        | Status. Optional                                                              |
| `paymentStatus` | `LeadPaymentStatus` | Payment status. Optional                                                      |
| `isRead`        | `boolean`           | Read or not. Optional                                                         |
| `clientName`    | `string`            | Name search, substring. Optional                                              |
| `clientEmail`   | `string`            | Email search, substring. Optional                                             |
| `clientPhone`   | `string`            | Phone search, substring. Optional                                             |
| `dateFrom`      | `string`            | Leads on or after this date. Optional                                         |
| `dateTo`        | `string`            | Leads on or before this date. Optional                                        |
| `numberMin`     | `number`            | Lead number from. Optional                                                    |
| `numberMax`     | `number`            | Lead number to. Optional                                                      |
| `amountMin`     | `number`            | Amount from. Optional                                                         |
| `amountMax`     | `number`            | Amount to. Optional                                                           |
| `sorting`       | `string`            | `field:direction`, for example `date:desc`. A missing direction is descending |

**Response**

| Field               | Type     | Description     |
| ------------------- | -------- | --------------- |
| `list`              | `Lead[]` | [`Lead`](#lead) |
| `pagination.limit`  | `number` | Page size       |
| `pagination.offset` | `number` | Offset          |
| `pagination.total`  | `number` | Total rows      |

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

**Response** [`Lead`](#lead).

## `update`

Changes status, the read flag, the note, contacts, and payment status. Products, shipping, and discounts have their own methods.

`PATCH /sites/{siteId}/leads/{leadId}`

```typescript
const lead = await site.leads.update(leadId, {
  status: "completed",
  isRead: true,
});
```

**Input**

| Field                 | Type                | Description            |
| --------------------- | ------------------- | ---------------------- |
| `leadId`              | `number`            | Lead id                |
| `status`              | `LeadStatus`        | New status             |
| `isRead`              | `boolean`           | Read                   |
| `notes`               | `string \| null`    | Note                   |
| `customer.name`       | `string`            | Name. Optional         |
| `customer.phone`      | `string`            | Phone. Optional        |
| `customer.email`      | `string \| null`    | Email. Optional        |
| `payment.status`      | `LeadPaymentStatus` | Payment status         |
| `payment.description` | `string \| null`    | Payment note. Optional |

**Response** [`Lead`](#lead).

## `updateMany`

Updates several leads with the same fields as `update`.

`POST /sites/{siteId}/leads/bulk`

```typescript
const leads = await site.leads.updateMany([leadId], { isRead: true });
```

**Input**

| Field | Type       | Description                               |
| ----- | ---------- | ----------------------------------------- |
| `ids` | `number[]` | Lead ids                                  |
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

**Response** [`Lead`](#lead) with status `deleted`.

## `replaceProducts`

Replaces the product lines of a lead.

`PUT /sites/{siteId}/leads/{leadId}/products`

```typescript
const lead = await site.leads.replaceProducts(leadId, {
  items: [{ productId: 1, variantId: 2, name: "Mug", quantity: 1, price: 500 }],
});
```

**Input**

| Field               | Type     | Description |
| ------------------- | -------- | ----------- |
| `leadId`            | `number` | Lead id     |
| `items`             | array    | New lines   |
| `items[].productId` | `number` | Product id  |
| `items[].variantId` | `number` | Variant id  |
| `items[].name`      | `string` | Name        |
| `items[].quantity`  | `number` | Quantity    |
| `items[].price`     | `number` | Price       |

**Response** [`Lead`](#lead).

## `applyPromotion`

Applies a promotion to the lead. Sending the same id again does not use the promocode limit a second time.

`POST /sites/{siteId}/leads/{leadId}/promotions`

```typescript
const lead = await site.leads.applyPromotion(leadId, { id: promotionId });
```

**Input**

| Field    | Type     | Description  |
| -------- | -------- | ------------ |
| `leadId` | `number` | Lead id      |
| `id`     | `number` | Promotion id |

**Response** [`Lead`](#lead).

## `removePromotion`

Removes a discount or a promocode. Removing a promocode restores its limit.

`DELETE /sites/{siteId}/leads/{leadId}/promotions/{type}`

```typescript
const lead = await site.leads.removePromotion(leadId, "promocode");
```

**Input**

| Field    | Type                        | Description    |
| -------- | --------------------------- | -------------- |
| `leadId` | `number`                    | Lead id        |
| `type`   | `'discount' \| 'promocode'` | What to remove |

**Response** [`Lead`](#lead).

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

**Response** [`Lead`](#lead).

## Reservations

## `createReservations`

Reserves every product line. A later call returns the reservations that already exist.

`POST /sites/{siteId}/leads/{leadId}/reservations`

```typescript
const reservations = await site.leads.createReservations(leadId);
```

**Input**

| Field    | Type     | Description |
| -------- | -------- | ----------- |
| `leadId` | `number` | Lead id     |

**Response**

| Field              | Type     | Description      |
| ------------------ | -------- | ---------------- |
| `list`             | array    | Reservation rows |
| `list[].id`        | `number` | Reservation id   |
| `list[].leadId`    | `number` | Lead id          |
| `list[].variantId` | `number` | Variant id       |
| `list[].quantity`  | `number` | Quantity         |

## `removeReservations`

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

## `refillReservation`

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
