# site > Settings

`site.settings` reads and updates the settings of one site.

```typescript
const settings = await site.settings.getSettings();
```

Catalog products are [Ecommerce](ecommerce.md). Shipping and discounts on one lead are [Leads](leads.md).

## `getSettings`

Returns the site settings.

`GET /sites/{siteId}/settings`

```typescript
const settings = await site.settings.getSettings();
```

**Input**

No parameters.

**Response** `SiteSettings`. Sections below.

## `updateSettings`

Updates the settings. The body is a JSON merge-patch: a deep partial of `SiteSettings`. Array fields in the patch replace the stored array.

`PATCH /sites/{siteId}/settings`

```typescript
const settings = await site.settings.updateSettings({
  locale: { language: "ru" },
});
```

**Input**

Any `SiteSettings` fields, all optional. Section contents are below.

**Response** `SiteSettings`. Sections below.

## Sections

### `locale`

`language`, `country`, `timezone`, and `currency`.

Currency is `{ code, symbol, data, format }`. `data` is `{ code, symbol, decimals }`. `format` is `{ str, t, d }`.

### `branding`

`fonts` (`myFonts` and `set`), `seoFavicon`, `myColors` (`colors` and `gradients`), `copyright`, `blockAnimation` (`show`, `style`), `smoothingScroll.enabled`, and `adaptiveView` (`number` or `boolean`).

### `seo`

`robotsTxt`, `meta`, `canonical` (number), `trailingSlash`.

### `privacy`

`cookiesWarning` is an object. `policyPersonalData` is `{ show, file }`.

### `performance`

`images` and `optimization` are objects. `injectCode` is `{ head, body }`.

### `ecommerce`

| Field                 | Type     | Description                                   |
| --------------------- | -------- | --------------------------------------------- |
| `delivery`            | array    | Shipping methods                              |
| `pickups`             | array    | Pickup points                                 |
| `tax`                 | object   | Tax                                           |
| `reserve`             | object   | Stock reservation                             |
| `cart`                | object   | Cart                                          |
| `pricelessRule`       | object   | How to treat a product with no price          |
| `globalCart.enabled`  | `boolean`| The shared cart is on                         |
| `globalCart.data`     | object   | Cart settings snapshot. The API stores it as sent |
| `outOfStockAction`    | `string` | What to do when the item is out of stock      |
| `outOfStockStatus`    | `string` | Out-of-stock status                           |
| `inStockStatus`       | `string` | In-stock status                               |
| `zeroPrice`           | `string` | How to show a zero price                      |

### `security`

`flood` is an object. `googleMapsApiKey` and `yandexMapsApiKey` are strings.

### `notifications`

| Field             | Type                  | Description                                           |
| ----------------- | --------------------- | ----------------------------------------------------- |
| `email`           | `{ id, email }[]`     | Addresses that receive notifications                  |
| `email[].id`      | `string`              | Address id                                            |
| `email[].email`   | `string`              | The address                                           |
| `notify`          | array                 | Other notification targets                            |
| `emailSendUtm`    | `number` or `boolean` | Add UTM to email                                      |
| `telegramSendUtm` | `boolean`             | Add UTM to Telegram                                   |
| `maxSendUtm`      | `boolean`             | Add UTM to MAX                                        |
| `visitorMail`     | object                | Mail sent to the visitor                              |
| `sms`             | array                 | Deprecated. The SMS module is gone; the field remains |
| `smsLight`        | `boolean`             | Deprecated. The SMS module is gone; the field remains |

### `platform`

`ai` and `api` are objects. `pays` is a map of payment providers, keyed by provider id, such as `tinkoff` or `cash`.
