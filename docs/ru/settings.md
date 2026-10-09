# Настройки

`site.settings` читает и обновляет настройки одного сайта.

```typescript
const settings = await site.settings.getSettings();
```

Товары каталога — в разделе [Магазин](ecommerce.md). Доставка и скидки одной заявки — в разделе [Заявки](leads.md).

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

Тело — JSON merge-patch: глубокий partial от `SiteSettings`. Поля-массивы в патче заменяют сохранённый массив.

## Разделы

### `locale`

`language`, `country`, `timezone` и `currency`.

Валюта — `{ code, symbol, data, format }`. `data` — `{ code, symbol, decimals }`. `format` — `{ str, t, d }`.

### `branding`

`fonts` (`myFonts` и `set`), `seoFavicon`, `myColors` (`colors` и `gradients`), `copyright`, `blockAnimation` (`show`, `style`), `smoothingScroll.enabled` и `adaptiveView` (`number` или `boolean`).

### `seo`

`robotsTxt`, `meta`, `canonical` (число), `trailingSlash`.

### `privacy`

`cookiesWarning` — объект. `policyPersonalData` — `{ show, file }`.

### `performance`

`images` и `optimization` — объекты. `injectCode` — `{ head, body }`.

### `ecommerce`

| Поле                                                                 | Тип                          |
| -------------------------------------------------------------------- | ---------------------------- |
| `delivery`, `pickups`                                                | массивы                      |
| `tax`, `reserve`, `cart`, `pricelessRule`                            | объекты                      |
| `globalCart`                                                         | `{ enabled: boolean; data }` |
| `outOfStockAction`, `outOfStockStatus`, `inStockStatus`, `zeroPrice` | `string`                     |

### `security`

`flood` — объект. `googleMapsApiKey` и `yandexMapsApiKey` — строки.

### `notifications`

| Поле                            | Тип                    |
| ------------------------------- | ---------------------- |
| `email`                         | `{ id, email }[]`      |
| `notify`                        | массив                 |
| `emailSendUtm`                  | `number` или `boolean` |
| `telegramSendUtm`, `maxSendUtm` | `boolean`              |
| `visitorMail`                   | объект                 |
| `sms`                           | массив, устарело       |
| `smsLight`                      | `boolean`, устарело    |

### `platform`

`ai` и `api` — объекты. `pays` — карта платёжных провайдеров, ключ — id провайдера, например `tinkoff` или `cash`.
