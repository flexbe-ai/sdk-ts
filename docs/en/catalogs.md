# Catalogs

`client.meta` returns three reference lists: site languages, user-interface languages, and currencies. The lists are global. They do not take a site id or an account id.

```typescript
const languages = await client.meta.getSiteLanguages();
const currencies = await client.meta.getSiteCurrencies();
```

## `getSiteLanguages`

`GET /meta/site-languages`

```typescript
getSiteLanguages(): Promise<SiteLanguage[]>
```

`SiteLanguage` is `{ code, nameEn, nameNative }`.

## `getUserLanguages`

`GET /meta/user-languages`

```typescript
getUserLanguages(): Promise<UserLanguage[]>
```

`UserLanguage` has the same three fields.

## `getSiteCurrencies`

`GET /meta/site-currencies`

```typescript
getSiteCurrencies(): Promise<SiteCurrency[]>
```

`SiteCurrency` is `{ code, name, symbol, symbolVariants?, decimals }`. `symbolVariants` is an optional string array.
