# Domains

Domains on a site and domains on an account are two clients. `site.domains` is the list attached to one site. `client.account(accountId).domains` is the account's registrations and applications. Opening either object is in [Get started](getting-started.md).

`bind` attaches a name you already have. It does not register a domain.

## Site domains

`SiteDomains`. Paths sit on `/sites/{siteId}/domains`.

`SiteDomain`:

| Field                          | Type                                                              |
| ------------------------------ | ----------------------------------------------------------------- |
| `id`                           | `number`                                                          |
| `name`, `nameDecoded`          | `string`                                                          |
| `type`                         | `'primary' \| 'alias' \| 'tech'`                                  |
| `isRedirectToPrimary`          | `boolean`                                                         |
| `status.code`                  | `string`                                                          |
| `registration.regId`           | `number`. Flexbe registration id, or `0` for a third-party domain |
| `registration.isFree`          | `boolean`                                                         |
| `registration.expireTimestamp` | `number \| null`                                                  |
| `registration.expireAt`        | `string \| null`                                                  |
| `ssl.active`, `ssl.enabled`    | `boolean`                                                         |

### `list`

`GET /sites/{siteId}/domains`

```typescript
list(params?: GetSiteDomainsParams): Promise<SiteDomainListResponse>
```

`offset` and `limit` are optional. Returns `{ list, pagination }`.

### `bind`

`POST /sites/{siteId}/domains`

```typescript
bind(params: BindSiteDomainParams): Promise<SiteDomain>
```

`BindSiteDomainParams` is `{ name: string }`.

Use it for a third-party alias, or for your own domain that is not on a site yet, including a move between your sites.

### `remove`

`DELETE /sites/{siteId}/domains/{domainId}`

```typescript
remove(domainId: number): Promise<Record<string, never>>
```

The call returns no content. A domain registered through Flexbe stays on the account and only loses the site binding. A third-party domain is deleted.

## Account domains

`AccountDomains`. Paths sit on `/account/{accountId}/domains`.

`AccountDomain`:

| Field                    | Type                                                                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `regId`                  | `number`                                                                                                                        |
| `name`, `nameDecoded`    | `string`                                                                                                                        |
| `regStatus`              | `queued`, `success`, `wrongData`, `error`, or `waitingPayment`                                                                  |
| `status`                 | `{ code } \| null`. `code` is a runtime status such as `expired`, `banned`, or `active`, and is `null` on a pending application |
| `project`                | `{ id, name, imgId, access } \| null`. `access` is `owner`, `shared`, or `lost`                                                 |
| `isFree`, `allowRenewal` | `boolean`                                                                                                                       |
| `expireTimestamp`        | `number \| null`                                                                                                                |
| `expireAt`               | `string \| null`                                                                                                                |
| `contacts`               | email, phone, country, zip, city, street, or `null`                                                                             |
| `ns`                     | `{ enabled, list }` or `null`. A host is `{ host, ip }`                                                                         |

A `success` row is a domain you own. The other statuses are applications that are still in progress.

### `list`

`GET /account/{accountId}/domains`

```typescript
list(params?: GetAccountDomainsParams): Promise<AccountDomainListResponse>
```

Returns registered domains and pending applications as `{ list, pagination }`. Canceled registrations are omitted.

| `status`       | What you get                                     |
| -------------- | ------------------------------------------------ |
| omitted        | Registered domains and pending applications      |
| `'registered'` | Registered domains only                          |
| `'pending'`    | `queued`, `wrongData`, `error`, `waitingPayment` |

`offset` and `limit` are optional.

### `get`

`GET /account/{accountId}/domains/{regId}`

```typescript
get(regId: number): Promise<AccountDomain>
```

One registered domain. A pending or canceled id responds with 404.

### `unbindSite`

`DELETE /account/{accountId}/domains/{regId}/site`

```typescript
unbindSite(regId: number): Promise<Record<string, never>>
```

The call returns no content. It removes the domain from its site. The registration stays on the account. A registered domain is on at most one site, so the call takes the registration id only.
