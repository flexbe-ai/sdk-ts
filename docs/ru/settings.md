# Сайт → Настройки

`site.settings` читает и обновляет настройки сайта.

```typescript
const settings = await site.settings.getSettings();
```

## `SiteSettings`

Настройки сайта.

| Поле | Тип | Описание |
| --- | --- | --- |
| `locale` | [`LocaleSettings`](#localesettings) | Язык и регион |
| `branding` | [`BrandingSettings`](#brandingsettings) | Оформление |
| `seo` | [`SeoSettings`](#seosettings) | SEO |
| `privacy` | [`PrivacySettings`](#privacysettings) | Конфиденциальность |
| `performance` | [`PerformanceSettings`](#performancesettings) | Производительность |
| `ecommerce` | [`EcommerceSettings`](#ecommercesettings) | Магазин |
| `security` | [`SecuritySettings`](#securitysettings) | Безопасность |
| `notifications` | [`NotificationsSettings`](#notificationssettings) | Уведомления |
| `platform` | [`PlatformSettings`](#platformsettings) | Платформа |

## `LocaleSettings`

Язык и регион.

| Поле | Тип | Описание |
| --- | --- | --- |
| `language` | `string` | Язык |
| `country` | `string` | Страна |
| `timezone` | `string` | Часовой пояс |
| `currency` | [`CurrencySettings`](#currencysettings) | Валюта |

## `CurrencySettings`

Валюта.

| Поле | Тип | Описание |
| --- | --- | --- |
| `code` | `string` | Код |
| `symbol` | `string` | Символ |
| `data` | [`CurrencyDataSettings`](#currencydatasettings) | Данные валюты |
| `format` | [`CurrencyFormatSettings`](#currencyformatsettings) | Формат |

## `CurrencyDataSettings`

Данные валюты.

| Поле | Тип | Описание |
| --- | --- | --- |
| `code` | `string` | Код |
| `symbol` | `string` | Символ |
| `decimals` | `number` | Знаков после запятой |

## `CurrencyFormatSettings`

Формат валюты.

| Поле | Тип | Описание |
| --- | --- | --- |
| `str` | `string` | Шаблон, например `:symbol:value` |
| `t` | `string` | Разделитель тысяч |
| `d` | `string` | Десятичный разделитель |

## `BrandingSettings`

Оформление.

| Поле | Тип | Описание |
| --- | --- | --- |
| `fonts` | [`FontsSettings`](#fontssettings) | Шрифты |
| `seoFavicon` | значение или `null` | Фавикон |
| `myColors` | [`myColors`](#mycolors) | Свои цвета |
| `copyright` | `string` | Копирайт |
| `blockAnimation` | [`blockAnimation`](#blockanimation) | Анимация блоков |
| `smoothingScroll` | [`smoothingScroll`](#smoothingscroll) | Плавная прокрутка |
| `adaptiveView` | `number \| boolean` | Адаптивный вид |

## `FontsSettings`

Шрифты.

| Поле | Тип | Описание |
| --- | --- | --- |
| `myFonts` | массив | Свои шрифты |
| `set` | массив | Набор шрифтов |

## `myColors`

Свои цвета.

| Поле | Тип | Описание |
| --- | --- | --- |
| `colors` | массив | Цвета |
| `gradients` | массив | Градиенты |

## `blockAnimation`

Анимация блоков.

| Поле | Тип | Описание |
| --- | --- | --- |
| `show` | `number \| null` | Показ |
| `style` | `string \| null` | Стиль |

## `smoothingScroll`

Плавная прокрутка.

| Поле | Тип | Описание |
| --- | --- | --- |
| `enabled` | `number` | Включена |

## `SeoSettings`

SEO.

| Поле | Тип | Описание |
| --- | --- | --- |
| `robotsTxt` | `string` | Содержимое robots.txt |
| `meta` | `string` | Мета-теги |
| `canonical` | `number` | Канонический адрес |
| `trailingSlash` | `string` | Завершающий слэш |

## `PrivacySettings`

Конфиденциальность.

| Поле | Тип | Описание |
| --- | --- | --- |
| `cookiesWarning` | объект | Предупреждение о cookies |
| `policyPersonalData` | [`policyPersonalData`](#policypersonaldata) | Политика персональных данных |

## `policyPersonalData`

Политика персональных данных.

| Поле | Тип | Описание |
| --- | --- | --- |
| `show` | `number` | Показывать |
| `file` | `string` | Файл |

## `PerformanceSettings`

Производительность.

| Поле | Тип | Описание |
| --- | --- | --- |
| `images` | объект | Картинки |
| `optimization` | объект | Оптимизация |
| `injectCode` | [`injectCode`](#injectcode) | Вставка кода |

## `injectCode`

Код в head и body.

| Поле | Тип | Описание |
| --- | --- | --- |
| `head` | `string` | Код в head |
| `body` | `string` | Код в body |

## `EcommerceSettings`

Настройки магазина.

| Поле | Тип | Описание |
| --- | --- | --- |
| `delivery` | массив | Способы доставки |
| `pickups` | массив | Пункты выдачи |
| `tax` | объект | Налог |
| `reserve` | объект | Резерв товара |
| `cart` | объект | Корзина |
| `pricelessRule` | объект | Как считать товар без цены |
| `globalCart` | [`GlobalCartSettings`](#globalcartsettings) | Общая корзина |
| `outOfStockAction` | `string` | Что делать, когда товара нет |
| `outOfStockStatus` | `string` | Статус «нет в наличии» |
| `inStockStatus` | `string` | Статус «в наличии» |
| `zeroPrice` | `string` | Как показывать нулевую цену |

## `GlobalCartSettings`

Общая корзина.

| Поле | Тип | Описание |
| --- | --- | --- |
| `enabled` | `boolean` | Включена |
| `data` | объект | Снимок настроек корзины. API его не меняет |

## `SecuritySettings`

Безопасность.

| Поле | Тип | Описание |
| --- | --- | --- |
| `flood` | объект | Защита от флуда |
| `googleMapsApiKey` | `string` | Ключ Google Maps |
| `yandexMapsApiKey` | `string` | Ключ Яндекс Карт |

## `NotificationsSettings`

Уведомления.

| Поле | Тип | Описание |
| --- | --- | --- |
| `email` | [`email[]`](#email) | Адреса уведомлений |
| `notify` | массив | Куда ещё слать уведомления |
| `emailSendUtm` | `number \| boolean` | Добавлять UTM в письма |
| `telegramSendUtm` | `boolean` | Добавлять UTM в Telegram |
| `maxSendUtm` | `boolean` | Добавлять UTM в MAX |
| `visitorMail` | объект | Письмо посетителю |
| `sms` | массив | Устарело. Поле осталось в данных |
| `smsLight` | `boolean` | Устарело. Поле осталось в данных |

## `email`

Адрес уведомления.

| Поле | Тип | Описание |
| --- | --- | --- |
| `id` | `string` | Id адреса |
| `email` | `string` | Адрес |

## `PlatformSettings`

Платформа.

| Поле | Тип | Описание |
| --- | --- | --- |
| `ai` | объект | AI |
| `api` | объект | API |
| `pays` | объект | Платёжные провайдеры. Ключ — id провайдера, например `tinkoff` или `cash` |

## `getSettings`

Возвращает настройки сайта.

`GET /sites/{siteId}/settings`

```typescript
const settings = await site.settings.getSettings();
```

**Вход**

Параметров нет.

**Ответ** [`SiteSettings`](#sitesettings).

## `updateSettings`

Обновляет переданные поля. Массив в теле заменяет сохранённый массив.

`PATCH /sites/{siteId}/settings`

```typescript
const settings = await site.settings.updateSettings({
  locale: { language: "ru" },
});
```

**Вход** частичный [`SiteSettings`](#sitesettings).

**Ответ** [`SiteSettings`](#sitesettings).
