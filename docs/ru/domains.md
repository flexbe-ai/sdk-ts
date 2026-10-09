# Домены

Домены сайта и домены аккаунта — два клиента. `site.domains` — список, привязанный к одному сайту. `client.account(accountId).domains` — регистрации и заявки аккаунта. Как открыть любой из объектов — в разделе [С чего начать](getting-started.md).

`bind` прикрепляет имя, которое у вас уже есть. Домен он не регистрирует.

## Домены сайта

`SiteDomains`. Пути лежат на `/sites/{siteId}/domains`.

`SiteDomain`:

| Поле                           | Тип                                                          |
| ------------------------------ | ------------------------------------------------------------ |
| `id`                           | `number`                                                     |
| `name`, `nameDecoded`          | `string`                                                     |
| `type`                         | `'primary' \| 'alias' \| 'tech'`                             |
| `isRedirectToPrimary`          | `boolean`                                                    |
| `status.code`                  | `string`                                                     |
| `registration.regId`           | `number`. Id регистрации Flexbe, или `0` у стороннего домена |
| `registration.isFree`          | `boolean`                                                    |
| `registration.expireTimestamp` | `number \| null`                                             |
| `registration.expireAt`        | `string \| null`                                             |
| `ssl.active`, `ssl.enabled`    | `boolean`                                                    |

### `list`

`GET /sites/{siteId}/domains`

```typescript
list(params?: GetSiteDomainsParams): Promise<SiteDomainListResponse>
```

`offset` и `limit` необязательны. Возвращает `{ list, pagination }`.

### `bind`

`POST /sites/{siteId}/domains`

```typescript
bind(params: BindSiteDomainParams): Promise<SiteDomain>
```

`BindSiteDomainParams` — это `{ name: string }`.

Используйте его для стороннего алиаса или для своего домена, который ещё не стоит на сайте, в том числе при переносе между своими сайтами.

### `remove`

`DELETE /sites/{siteId}/domains/{domainId}`

```typescript
remove(domainId: number): Promise<Record<string, never>>
```

Вызов не возвращает содержимого. Домен, зарегистрированный через Flexbe, остаётся на аккаунте и только теряет привязку к сайту. Сторонний домен удаляется.

## Домены аккаунта

`AccountDomains`. Пути лежат на `/account/{accountId}/domains`.

`AccountDomain`:

| Поле                     | Тип                                                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `regId`                  | `number`                                                                                                              |
| `name`, `nameDecoded`    | `string`                                                                                                              |
| `regStatus`              | `queued`, `success`, `wrongData`, `error` или `waitingPayment`                                                        |
| `status`                 | `{ code } \| null`. `code` — текущий статус, например `expired`, `banned` или `active`. У незавершённой заявки `null` |
| `project`                | `{ id, name, imgId, access } \| null`. `access` — `owner`, `shared` или `lost`                                        |
| `isFree`, `allowRenewal` | `boolean`                                                                                                             |
| `expireTimestamp`        | `number \| null`                                                                                                      |
| `expireAt`               | `string \| null`                                                                                                      |
| `contacts`               | email, телефон, страна, индекс, город, улица или `null`                                                               |
| `ns`                     | `{ enabled, list }` или `null`. Хост — `{ host, ip }`                                                                 |

Строка `success` — домен, который вам принадлежит. Остальные статусы — заявки, которые ещё не завершены.

### `list`

`GET /account/{accountId}/domains`

```typescript
list(params?: GetAccountDomainsParams): Promise<AccountDomainListResponse>
```

Возвращает зарегистрированные домены и незавершённые заявки как `{ list, pagination }`. Отменённые регистрации не входят.

| `status`       | Что придёт                                       |
| -------------- | ------------------------------------------------ |
| не передан     | Зарегистрированные домены и незавершённые заявки |
| `'registered'` | Только зарегистрированные                        |
| `'pending'`    | `queued`, `wrongData`, `error`, `waitingPayment` |

`offset` и `limit` необязательны.

### `get`

`GET /account/{accountId}/domains/{regId}`

```typescript
get(regId: number): Promise<AccountDomain>
```

Один зарегистрированный домен. Незавершённый или отменённый id отвечает 404.

### `unbindSite`

`DELETE /account/{accountId}/domains/{regId}/site`

```typescript
unbindSite(regId: number): Promise<Record<string, never>>
```

Вызов не возвращает содержимого. Он снимает домен с сайта. Регистрация остаётся на аккаунте. Зарегистрированный домен стоит не больше чем на одном сайте, поэтому вызову достаточно id регистрации.
