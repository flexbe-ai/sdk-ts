# client → Meta

`client.meta` returns three reference lists: site languages, user-interface languages, and currencies. The lists are global. They do not take a site id or an account id.

```typescript
const languages = await client.meta.getSiteLanguages();
const currencies = await client.meta.getSiteCurrencies();
```

## `getSiteLanguages`

Returns the languages a site can use.

`GET /meta/site-languages`

```typescript
const languages = await client.meta.getSiteLanguages();
```

**Input**

No parameters.

**Response** `SiteLanguage[]`

| Field        | Type     | Description          |
| ------------ | -------- | -------------------- |
| `code`       | `string` | Language code        |
| `nameEn`     | `string` | English name         |
| `nameNative` | `string` | Name in that language |

## `getUserLanguages`

Returns interface languages.

`GET /meta/user-languages`

```typescript
const languages = await client.meta.getUserLanguages();
```

**Input**

No parameters.

**Response** `UserLanguage[]`. The same three fields as a site language: `code`, `nameEn`, `nameNative`.

## `getSiteCurrencies`

Returns site currencies.

`GET /meta/site-currencies`

```typescript
const currencies = await client.meta.getSiteCurrencies();
```

**Input**

No parameters.

**Response** `SiteCurrency[]`

| Field             | Type       | Description                    |
| ----------------- | ---------- | ------------------------------ |
| `code`            | `string`   | Currency code                  |
| `name`            | `string`   | Name                           |
| `symbol`          | `string`   | Symbol                         |
| `symbolVariants`  | `string[]` | Other spellings of the symbol. Optional |
| `decimals`        | `number`   | Digits after the decimal point |
