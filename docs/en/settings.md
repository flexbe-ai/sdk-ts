# Site → Settings

`site.settings` reads and updates site settings.

```typescript
const settings = await site.settings.getSettings();
```

### `SiteSettings`

Site settings.

| Field | Type | Description |
| --- | --- | --- |
| `locale` | [`LocaleSettings`](#localesettings) | Language and region |
| `branding` | [`BrandingSettings`](#brandingsettings) | Appearance |
| `seo` | [`SeoSettings`](#seosettings) | SEO |
| `privacy` | [`PrivacySettings`](#privacysettings) | Privacy |
| `performance` | [`PerformanceSettings`](#performancesettings) | Performance |
| `ecommerce` | [`EcommerceSettings`](#ecommercesettings) | Store |
| `security` | [`SecuritySettings`](#securitysettings) | Security |
| `notifications` | [`NotificationsSettings`](#notificationssettings) | Notifications |
| `platform` | [`PlatformSettings`](#platformsettings) | Platform |

### `LocaleSettings`

Language and region.

| Field | Type | Description |
| --- | --- | --- |
| `language` | `string` | Language |
| `country` | `string` | Country |
| `timezone` | `string` | Time zone |
| `currency` | [`CurrencySettings`](#currencysettings) | Currency |

### `CurrencySettings`

Currency.

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` | Code |
| `symbol` | `string` | Symbol |
| `data` | [`CurrencyDataSettings`](#currencydatasettings) | Currency data |
| `format` | [`CurrencyFormatSettings`](#currencyformatsettings) | Format |

### `CurrencyDataSettings`

Currency data.

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` | Code |
| `symbol` | `string` | Symbol |
| `decimals` | `number` | Decimal places |

### `CurrencyFormatSettings`

Currency format.

| Field | Type | Description |
| --- | --- | --- |
| `str` | `string` | Template, for example `:symbol:value` |
| `t` | `string` | Thousands separator |
| `d` | `string` | Decimal separator |

### `BrandingSettings`

Appearance.

| Field | Type | Description |
| --- | --- | --- |
| `fonts` | [`FontsSettings`](#fontssettings) | Fonts |
| `seoFavicon` | value or `null` | Favicon |
| `myColors` | [`myColors`](#mycolors) | Custom colors |
| `copyright` | `string` | Copyright |
| `blockAnimation` | [`blockAnimation`](#blockanimation) | Block animation |
| `smoothingScroll` | [`smoothingScroll`](#smoothingscroll) | Smooth scroll |
| `adaptiveView` | `number \| boolean` | Adaptive view |

### `FontsSettings`

Fonts.

| Field | Type | Description |
| --- | --- | --- |
| `myFonts` | array | Custom fonts |
| `set` | array | Font set |

### `myColors`

Custom colors.

| Field | Type | Description |
| --- | --- | --- |
| `colors` | array | Colors |
| `gradients` | array | Gradients |

### `blockAnimation`

Block animation.

| Field | Type | Description |
| --- | --- | --- |
| `show` | `number \| null` | Display |
| `style` | `string \| null` | Style |

### `smoothingScroll`

Smooth scroll.

| Field | Type | Description |
| --- | --- | --- |
| `enabled` | `number` | On |

### `SeoSettings`

SEO.

| Field | Type | Description |
| --- | --- | --- |
| `robotsTxt` | `string` | robots.txt contents |
| `meta` | `string` | Meta tags |
| `canonical` | `number` | Canonical address |
| `trailingSlash` | `string` | Trailing slash |

### `PrivacySettings`

Privacy.

| Field | Type | Description |
| --- | --- | --- |
| `cookiesWarning` | object | Cookie notice |
| `policyPersonalData` | [`policyPersonalData`](#policypersonaldata) | Personal data policy |

### `policyPersonalData`

Personal data policy.

| Field | Type | Description |
| --- | --- | --- |
| `show` | `number` | Show |
| `file` | `string` | File |

### `PerformanceSettings`

Performance.

| Field | Type | Description |
| --- | --- | --- |
| `images` | object | Images |
| `optimization` | object | Optimization |
| `injectCode` | [`injectCode`](#injectcode) | Injected code |

### `injectCode`

Code in head and body.

| Field | Type | Description |
| --- | --- | --- |
| `head` | `string` | Code in head |
| `body` | `string` | Code in body |

### `EcommerceSettings`

Store settings.

| Field | Type | Description |
| --- | --- | --- |
| `delivery` | array | Shipping methods |
| `pickups` | array | Pickup points |
| `tax` | object | Tax |
| `reserve` | object | Stock reservation |
| `cart` | object | Cart |
| `pricelessRule` | object | How to treat a product with no price |
| `globalCart` | [`GlobalCartSettings`](#globalcartsettings) | Shared cart |
| `outOfStockAction` | `string` | What to do when the item is out of stock |
| `outOfStockStatus` | `string` | Out-of-stock status |
| `inStockStatus` | `string` | In-stock status |
| `zeroPrice` | `string` | How to show a zero price |

### `GlobalCartSettings`

Shared cart.

| Field | Type | Description |
| --- | --- | --- |
| `enabled` | `boolean` | On |
| `data` | object | Cart settings snapshot. The API stores it as sent |

### `SecuritySettings`

Security.

| Field | Type | Description |
| --- | --- | --- |
| `flood` | object | Flood protection |
| `googleMapsApiKey` | `string` | Google Maps key |
| `yandexMapsApiKey` | `string` | Yandex Maps key |

### `NotificationsSettings`

Notifications.

| Field | Type | Description |
| --- | --- | --- |
| `email` | [`email[]`](#email) | Notification addresses |
| `notify` | array | Other notification targets |
| `emailSendUtm` | `number \| boolean` | Add UTM to email |
| `telegramSendUtm` | `boolean` | Add UTM to Telegram |
| `maxSendUtm` | `boolean` | Add UTM to MAX |
| `visitorMail` | object | Mail sent to the visitor |
| `sms` | array | Deprecated. The field remains in the data |
| `smsLight` | `boolean` | Deprecated. The field remains in the data |

### `email`

A notification address.

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Address id |
| `email` | `string` | Address |

### `PlatformSettings`

Platform.

| Field | Type | Description |
| --- | --- | --- |
| `ai` | object | AI |
| `api` | object | API |
| `pays` | object | Payment providers. The key is the provider id, for example `tinkoff` or `cash` |

---

## `getSettings`

Returns the site settings.

`GET /sites/{siteId}/settings`

```typescript
const settings = await site.settings.getSettings();
```

**Input**

No parameters.

**Response** [`SiteSettings`](#sitesettings).

## `updateSettings`

Updates the fields you send. An array in the body replaces the stored array.

`PATCH /sites/{siteId}/settings`

```typescript
const settings = await site.settings.updateSettings({
  locale: { language: "ru" },
});
```

**Input** a partial [`SiteSettings`](#sitesettings).

**Response** [`SiteSettings`](#sitesettings).
