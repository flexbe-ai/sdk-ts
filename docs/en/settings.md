# Settings

`site.settings` reads and updates the settings of one site.

```typescript
const settings = await site.settings.getSettings();
```

Catalog products are [Ecommerce](ecommerce.md). Shipping and discounts on one lead are [Leads](leads.md).

## `getSettings`

`GET /sites/{siteId}/settings`

```typescript
getSettings(): Promise<SiteSettings>
```

## `updateSettings`

`PATCH /sites/{siteId}/settings`

```typescript
updateSettings(patch: UpdateSiteSettingsParams): Promise<SiteSettings>
```

The body is a JSON merge-patch: a deep partial of `SiteSettings`. Array fields in the patch replace the stored array.

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

| Field                                                                | Type                         |
| -------------------------------------------------------------------- | ---------------------------- |
| `delivery`, `pickups`                                                | arrays                       |
| `tax`, `reserve`, `cart`, `pricelessRule`                            | objects                      |
| `globalCart`                                                         | `{ enabled: boolean; data }` |
| `outOfStockAction`, `outOfStockStatus`, `inStockStatus`, `zeroPrice` | `string`                     |

### `security`

`flood` is an object. `googleMapsApiKey` and `yandexMapsApiKey` are strings.

### `notifications`

| Field                           | Type                  |
| ------------------------------- | --------------------- |
| `email`                         | `{ id, email }[]`     |
| `notify`                        | array                 |
| `emailSendUtm`                  | `number` or `boolean` |
| `telegramSendUtm`, `maxSendUtm` | `boolean`             |
| `visitorMail`                   | object                |
| `sms`                           | array, deprecated     |
| `smsLight`                      | `boolean`, deprecated |

### `platform`

`ai` and `api` are objects. `pays` is a map of payment providers, keyed by provider id, such as `tinkoff` or `cash`.
