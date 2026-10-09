# client → Meta

`client.meta` отдаёт три справочника: языки сайта, языки интерфейса и валюты. Списки общие. Id сайта и id аккаунта им не нужны.

```typescript
const languages = await client.meta.getSiteLanguages();
const currencies = await client.meta.getSiteCurrencies();
```

## `getSiteLanguages`

Возвращает языки, которые можно поставить сайту.

`GET /meta/site-languages`

```typescript
const languages = await client.meta.getSiteLanguages();
```

**Вход**

Параметров нет.

**Ответ** `SiteLanguage[]`

| Поле         | Тип      | Описание                |
| ------------ | -------- | ----------------------- |
| `code`       | `string` | Код языка               |
| `nameEn`     | `string` | Название по-английски   |
| `nameNative` | `string` | Название на этом языке  |

## `getUserLanguages`

Возвращает языки интерфейса.

`GET /meta/user-languages`

```typescript
const languages = await client.meta.getUserLanguages();
```

**Вход**

Параметров нет.

**Ответ** `UserLanguage[]`. Те же три поля, что у языка сайта: `code`, `nameEn`, `nameNative`.

## `getSiteCurrencies`

Возвращает валюты сайта.

`GET /meta/site-currencies`

```typescript
const currencies = await client.meta.getSiteCurrencies();
```

**Вход**

Параметров нет.

**Ответ** `SiteCurrency[]`

| Поле              | Тип        | Описание                          |
| ----------------- | ---------- | --------------------------------- |
| `code`            | `string`   | Код валюты                        |
| `name`            | `string`   | Название                          |
| `symbol`          | `string`   | Символ                            |
| `symbolVariants`  | `string[]` | Другие написания символа. Необязательно |
| `decimals`        | `number`   | Знаков после запятой              |
