# site > Настройки

`site.settings` читает и обновляет настройки одного сайта.

```typescript
const settings = await site.settings.getSettings();
```

Товары каталога — в разделе [Магазин](ecommerce.md). Доставка и скидки одной заявки — в разделе [Заявки](leads.md).

## `getSettings`

Возвращает настройки сайта.

`GET /sites/{siteId}/settings`

```typescript
const settings = await site.settings.getSettings();
```

**Вход**

Параметров нет.

**Ответ** `SiteSettings`. Разделы ниже.

## `updateSettings`

Обновляет настройки. Тело — JSON merge-patch: глубокий partial от `SiteSettings`. Поля-массивы в патче заменяют сохранённый массив.

`PATCH /sites/{siteId}/settings`

```typescript
const settings = await site.settings.updateSettings({
  locale: { language: "ru" },
});
```

**Вход**

Любые поля `SiteSettings`, все необязательны. Состав разделов ниже.

**Ответ** `SiteSettings`. Разделы ниже.

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

| Поле                | Тип                          | Описание                                      |
| ------------------- | ---------------------------- | --------------------------------------------- |
| `delivery`          | массив                       | Способы доставки                              |
| `pickups`           | массив                       | Пункты выдачи                                 |
| `tax`               | объект                       | Налог                                         |
| `reserve`           | объект                       | Резерв товара                                 |
| `cart`              | объект                       | Корзина                                       |
| `pricelessRule`     | объект                       | Как считать товар без цены                    |
| `globalCart.enabled`| `boolean`                    | Общая корзина включена                        |
| `globalCart.data`   | объект                       | Снимок настроек корзины. API его не меняет    |
| `outOfStockAction`  | `string`                     | Что делать, когда товара нет                  |
| `outOfStockStatus`  | `string`                     | Статус «нет в наличии»                        |
| `inStockStatus`     | `string`                     | Статус «в наличии»                            |
| `zeroPrice`         | `string`                     | Как показывать нулевую цену                   |

### `security`

`flood` — объект. `googleMapsApiKey` и `yandexMapsApiKey` — строки.

### `notifications`

| Поле              | Тип                    | Описание                                              |
| ----------------- | ---------------------- | ----------------------------------------------------- |
| `email`           | `{ id, email }[]`      | Адреса, на которые уходят уведомления                 |
| `email[].id`      | `string`               | Id адреса                                             |
| `email[].email`   | `string`               | Сам адрес                                             |
| `notify`          | массив                 | Куда ещё слать уведомления                            |
| `emailSendUtm`    | `number` или `boolean` | Добавлять UTM в письма                                |
| `telegramSendUtm` | `boolean`              | Добавлять UTM в Telegram                              |
| `maxSendUtm`      | `boolean`              | Добавлять UTM в MAX                                   |
| `visitorMail`     | объект                 | Письмо посетителю                                     |
| `sms`             | массив                 | Устарело. Модуль SMS снят, поле осталось в данных     |
| `smsLight`        | `boolean`              | Устарело. Модуль SMS снят, поле осталось в данных     |

### `platform`

`ai` и `api` — объекты. `pays` — карта платёжных провайдеров, ключ — id провайдера, например `tinkoff` или `cash`.
