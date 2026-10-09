# Domains

## site > Domains

`SiteDomains`. Paths sit on `/sites/{siteId}/domains`.

`SiteDomain`:

| Field                          | Type                             | Description                                                          |
| ------------------------------ | -------------------------------- | -------------------------------------------------------------------- |
| `id`                           | `number`                         | Domain id                                                            |
| `name`                         | `string`                         | ASCII name, punycode                                                 |
| `nameDecoded`                  | `string`                         | The same name in Unicode, for display                                |
| `type`                         | `'primary' \| 'alias' \| 'tech'` | `primary` is the main domain, `alias` an extra one, `tech` the technical host |
| `isRedirectToPrimary`          | `boolean`                        | The alias opens the primary domain                                   |
| `status.code`                  | `string`                         | Status code, for example `expired`                                   |
| `registration.regId`           | `number`                         | Flexbe registration id. `0` when the domain is third-party           |
| `registration.isFree`          | `boolean`                        | The registration is free                                             |
| `registration.expireTimestamp` | `number \| null`                 | Registration end, unix time                                          |
| `registration.expireAt`        | `string \| null`                 | Registration end as a string                                         |
| `ssl.enabled`                  | `boolean`                        | HTTPS is turned on for the domain                                    |
| `ssl.active`                   | `boolean`                        | Redirect to HTTPS is on. A certificate is already in place           |

### `list`

Returns the domains of the site.

`GET /sites/{siteId}/domains`

```typescript
const domains = await site.domains.list({ offset: 0, limit: 20 });
```

**Input**

| Field    | Type     | Description                              |
| -------- | -------- | ---------------------------------------- |
| `offset` | `number` | How many rows to skip. Optional          |
| `limit`  | `number` | How many rows to return. Optional        |

**Response**

| Field               | Type           | Description                    |
| ------------------- | -------------- | ------------------------------ |
| `list`              | `SiteDomain[]` | Domains. Fields in the table above |
| `pagination.limit`  | `number`       | Page size                      |
| `pagination.offset` | `number`       | Offset                         |
| `pagination.total`  | `number`       | Total rows                     |

### `bind`

Attaches a name you already have. It does not register a domain. Use it for a third-party alias, or for your own domain that is not on a site yet, including a move between your sites.

`POST /sites/{siteId}/domains`

```typescript
const domain = await site.domains.bind({ name: "shop.example.com" });
```

**Input**

| Field  | Type     | Description |
| ------ | -------- | ----------- |
| `name` | `string` | Domain name |

**Response**

| Field  | Type         | Description                         |
| ------ | ------------ | ----------------------------------- |
| result | `SiteDomain` | The bound domain. Fields in the table above |

### `remove`

Removes the domain from the site.

`DELETE /sites/{siteId}/domains/{domainId}`

```typescript
await site.domains.remove(domainId);
```

**Input**

| Field      | Type     | Description |
| ---------- | -------- | ----------- |
| `domainId` | `number` | Domain id   |

**Response**

No body. A domain registered through Flexbe stays on the account and only loses the site binding. A third-party domain is deleted.

## account > Domains

`AccountDomains`. Paths sit on `/account/{accountId}/domains`.

`AccountDomain`:

| Field                    | Type                                                           | Description                                                    |
| ------------------------ | -------------------------------------------------------------- | -------------------------------------------------------------- |
| `regId`                  | `number`                                                       | Registration id                                                |
| `name`                   | `string`                                                       | ASCII name, punycode                                           |
| `nameDecoded`            | `string`                                                       | The same name in Unicode, for display                          |
| `regStatus`              | `queued`, `success`, `wrongData`, `error`, or `waitingPayment` | Application status. `success` means you own the domain         |
| `status`                 | `{ code } \| null`                                             | `null` until the application is finished                       |
| `status.code`            | `string`                                                       | Current domain status, for example `expired`, `banned`, or `active` |
| `project`                | object or `null`                                               | Site the domain is attached to                                 |
| `project.id`             | `number`                                                       | Site id                                                        |
| `project.name`           | `string`                                                       | Site name                                                      |
| `project.imgId`          | `number \| null`                                               | Site image id                                                  |
| `project.access`         | `owner`, `shared`, or `lost`                                   | Your site, a shared site, or the link is already gone          |
| `isFree`                 | `boolean`                                                      | The registration is free                                       |
| `allowRenewal`           | `boolean`                                                      | The registration can be renewed                                |
| `expireTimestamp`        | `number \| null`                                               | Registration end, unix time                                    |
| `expireAt`               | `string \| null`                                               | Registration end as a string                                   |
| `contacts`               | object or `null`                                               | Registration contacts                                          |
| `contacts.email`         | `string`                                                       | Email                                                          |
| `contacts.phone`         | `string`                                                       | Phone                                                          |
| `contacts.country`       | `string`                                                       | Country                                                        |
| `contacts.addressZip`    | `string`                                                       | Postal code                                                    |
| `contacts.addressCity`   | `string`                                                       | City                                                           |
| `contacts.addressStreet` | `string`                                                       | Street                                                         |
| `ns`                     | `{ enabled, list } \| null`                                    | Custom name servers                                            |
| `ns.enabled`             | `boolean`                                                      | Custom name servers are on                                     |
| `ns.list`                | `{ host, ip }[]`                                               | Servers                                                        |
| `ns.list[].host`         | `string`                                                       | Host                                                           |
| `ns.list[].ip`           | `string \| null`                                               | Host IP                                                        |

### `list`

Returns registered domains and pending applications. Canceled registrations are omitted.

`GET /account/{accountId}/domains`

```typescript
const domains = await client.account(accountId).domains.list({
  status: "registered",
  offset: 0,
  limit: 20,
});
```

**Input**

| Field    | Type                         | Description                                                                                          |
| -------- | ---------------------------- | ---------------------------------------------------------------------------------------------------- |
| `status` | `'registered' \| 'pending'`  | Optional. Omitted: registered domains and pending applications. `registered`: owned domains only. `pending`: `queued`, `wrongData`, `error`, `waitingPayment` |
| `offset` | `number`                     | How many rows to skip. Optional                                                                      |
| `limit`  | `number`                     | How many rows to return. Optional                                                                    |

**Response**

| Field               | Type              | Description                   |
| ------------------- | ----------------- | ----------------------------- |
| `list`              | `AccountDomain[]` | Domains and applications. Fields above |
| `pagination.limit`  | `number`          | Page size                     |
| `pagination.offset` | `number`          | Offset                        |
| `pagination.total`  | `number`          | Total rows                    |

### `get`

Returns one registered domain. A pending or canceled id responds with 404.

`GET /account/{accountId}/domains/{regId}`

```typescript
const domain = await client.account(accountId).domains.get(regId);
```

**Input**

| Field   | Type     | Description      |
| ------- | -------- | ---------------- |
| `regId` | `number` | Registration id  |

**Response**

| Field  | Type            | Description                  |
| ------ | --------------- | ---------------------------- |
| result | `AccountDomain` | The domain. Fields in the table above |

### `unbindSite`

Removes the domain from its site. The registration stays on the account. A registered domain is on at most one site, so the call takes the registration id only.

`DELETE /account/{accountId}/domains/{regId}/site`

```typescript
await client.account(accountId).domains.unbindSite(regId);
```

**Input**

| Field   | Type     | Description      |
| ------- | -------- | ---------------- |
| `regId` | `number` | Registration id  |

**Response**

No body.
