# Справочники

`client.meta` отдаёт три справочника: языки сайта, языки интерфейса и валюты. Списки общие. Id сайта и id аккаунта им не нужны.

```typescript
const languages = await client.meta.getSiteLanguages();
const currencies = await client.meta.getSiteCurrencies();
```

## `getSiteLanguages`

`GET /meta/site-languages`

```typescript
getSiteLanguages(): Promise<SiteLanguage[]>
```

`SiteLanguage` — это `{ code, nameEn, nameNative }`.

## `getUserLanguages`

`GET /meta/user-languages`

```typescript
getUserLanguages(): Promise<UserLanguage[]>
```

У `UserLanguage` те же три поля.

## `getSiteCurrencies`

`GET /meta/site-currencies`

```typescript
getSiteCurrencies(): Promise<SiteCurrency[]>
```

`SiteCurrency` — это `{ code, name, symbol, symbolVariants?, decimals }`. `symbolVariants` — необязательный массив строк.
