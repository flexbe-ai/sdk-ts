# Catalogs

`client.meta` returns three reference lists: site languages, currencies, and interface languages. The lists are global. They do not take a site id or an account id.

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

| Field        | Type     | Description           |
| ------------ | -------- | --------------------- |
| `code`       | `string` | Language code         |
| `nameEn`     | `string` | English name          |
| `nameNative` | `string` | Name in that language |

## `getSiteCurrencies`

Returns site currencies.

`GET /meta/site-currencies`

```typescript
const currencies = await client.meta.getSiteCurrencies();
```

**Input**

No parameters.

**Response** `SiteCurrency[]`

| Field            | Type       | Description                             |
| ---------------- | ---------- | --------------------------------------- |
| `code`           | `string`   | Currency code                           |
| `name`           | `string`   | Name                                    |
| `symbol`         | `string`   | Symbol                                  |
| `symbolVariants` | `string[]` | Other spellings of the symbol. Optional |
| `decimals`       | `number`   | Digits after the decimal point          |

## `getUserLanguages`

Returns interface languages.

`GET /meta/user-languages`

```typescript
const languages = await client.meta.getUserLanguages();
```

**Input**

No parameters.

**Response** `UserLanguage[]`

| Field        | Type     | Description           |
| ------------ | -------- | --------------------- |
| `code`       | `string` | Language code         |
| `nameEn`     | `string` | English name          |
| `nameNative` | `string` | Name in that language |
