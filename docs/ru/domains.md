# Домены

## Сайт → Домены

### `SiteDomain`

| Поле                           | Тип                              | Описание                                                             |
| ------------------------------ | -------------------------------- | -------------------------------------------------------------------- |
| `id`                           | `number`                         | Id домена                                                            |
| `name`                         | `string`                         | Имя в ASCII, punycode                                                |
| `nameDecoded`                  | `string`                         | То же имя в Unicode, для показа                                      |
| `type`                         | `'primary' \| 'alias' \| 'tech'` | `primary` — основной, `alias` — дополнительный, `tech` — технический |
| `isRedirectToPrimary`          | `boolean`                        | Алиас открывает основной домен                                       |
| `status.code`                  | `string`                         | Код состояния, например `expired`                                    |
| `registration.regId`           | `number`                         | Id регистрации Flexbe. `0`, если домен сторонний                     |
| `registration.isFree`          | `boolean`                        | Регистрация бесплатная                                               |
| `registration.expireTimestamp` | `number \| null`                 | Окончание регистрации, unix-время                                    |
| `registration.expireAt`        | `string \| null`                 | Окончание регистрации строкой                                        |
| `ssl.enabled`                  | `boolean`                        | Для домена включён HTTPS                                             |
| `ssl.active`                   | `boolean`                        | Редирект на HTTPS включён. Сертификат при этом уже есть              |

---

## `list`

Возвращает список доменов сайта.

`GET /sites/{siteId}/domains`

```typescript
const domains = await site.domains.list({ offset: 0, limit: 20 });
```

**Вход**

| Поле     | Тип      | Описание                                  |
| -------- | -------- | ----------------------------------------- |
| `offset` | `number` | Сколько записей пропустить. Необязательно |
| `limit`  | `number` | Сколько записей вернуть. Необязательно    |

**Ответ**

| Поле                | Тип            | Описание                    |
| ------------------- | -------------- | --------------------------- |
| `list`              | `SiteDomain[]` | [`SiteDomain`](#sitedomain) |
| `pagination.limit`  | `number`       | Размер страницы             |
| `pagination.offset` | `number`       | Смещение                    |
| `pagination.total`  | `number`       | Всего записей               |

## `bind`

Прикрепляет к сайту имя, которое у вас уже есть. Домен не регистрирует. Это сторонний алиас или свой домен, который ещё не стоит на сайте, в том числе при переносе между своими сайтами.

`POST /sites/{siteId}/domains`

```typescript
const domain = await site.domains.bind({ name: "shop.example.com" });
```

**Вход**

| Поле   | Тип      | Описание   |
| ------ | -------- | ---------- |
| `name` | `string` | Имя домена |

**Ответ**

| Поле  | Тип          | Описание                                       |
| ----- | ------------ | ---------------------------------------------- |
| ответ | `SiteDomain` | Привязанный домен. [`SiteDomain`](#sitedomain) |

## `remove`

Снимает домен с сайта.

`DELETE /sites/{siteId}/domains/{domainId}`

```typescript
await site.domains.remove(domainId);
```

**Вход**

| Поле       | Тип      | Описание  |
| ---------- | -------- | --------- |
| `domainId` | `number` | Id домена |

Домен, зарегистрированный через Flexbe, остаётся на аккаунте и только теряет привязку к сайту. Сторонний домен удаляется.

## Аккаунт → Домены

### `AccountDomain`

| Поле                     | Тип                                                            | Описание                                                         |
| ------------------------ | -------------------------------------------------------------- | ---------------------------------------------------------------- |
| `regId`                  | `number`                                                       | Id регистрации                                                   |
| `name`                   | `string`                                                       | Имя в ASCII, punycode                                            |
| `nameDecoded`            | `string`                                                       | То же имя в Unicode, для показа                                  |
| `regStatus`              | `queued`, `success`, `wrongData`, `error` или `waitingPayment` | Статус заявки. `success` — домен уже ваш                         |
| `status`                 | `{ code } \| null`                                             | `null`, пока заявка не завершена                                 |
| `status.code`            | `string`                                                       | Текущий статус домена, например `expired`, `banned` или `active` |
| `project`                | объект или `null`                                              | Сайт, к которому привязан домен                                  |
| `project.id`             | `number`                                                       | Id сайта                                                         |
| `project.name`           | `string`                                                       | Название сайта                                                   |
| `project.imgId`          | `number \| null`                                               | Id картинки сайта                                                |
| `project.access`         | `owner`, `shared` или `lost`                                   | Домен на своём сайте, на расшаренном или связь уже потеряна      |
| `isFree`                 | `boolean`                                                      | Регистрация бесплатная                                           |
| `allowRenewal`           | `boolean`                                                      | Регистрацию можно продлить                                       |
| `expireTimestamp`        | `number \| null`                                               | Окончание регистрации, unix-время                                |
| `expireAt`               | `string \| null`                                               | Окончание регистрации строкой                                    |
| `contacts`               | объект или `null`                                              | Контакты регистрации                                             |
| `contacts.email`         | `string`                                                       | Email                                                            |
| `contacts.phone`         | `string`                                                       | Телефон                                                          |
| `contacts.country`       | `string`                                                       | Страна                                                           |
| `contacts.addressZip`    | `string`                                                       | Индекс                                                           |
| `contacts.addressCity`   | `string`                                                       | Город                                                            |
| `contacts.addressStreet` | `string`                                                       | Улица                                                            |
| `ns`                     | `{ enabled, list } \| null`                                    | Свои NS                                                          |
| `ns.enabled`             | `boolean`                                                      | Свои NS включены                                                 |
| `ns.list`                | `{ host, ip }[]`                                               | Серверы                                                          |
| `ns.list[].host`         | `string`                                                       | Хост                                                             |
| `ns.list[].ip`           | `string \| null`                                               | IP хоста                                                         |

---

## `list`

Возвращает зарегистрированные домены и незавершённые заявки аккаунта. Отменённые регистрации не входят.

`GET /account/{accountId}/domains`

```typescript
const domains = await client.account(accountId).domains.list({
  status: "registered",
  offset: 0,
  limit: 20,
});
```

**Вход**

| Поле     | Тип                         | Описание                                                                                                                                                     |
| -------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `status` | `'registered' \| 'pending'` | Необязательно. Не передан: зарегистрированные и незавершённые заявки. `registered`: только свои. `pending`: `queued`, `wrongData`, `error`, `waitingPayment` |
| `offset` | `number`                    | Сколько записей пропустить. Необязательно                                                                                                                    |
| `limit`  | `number`                    | Сколько записей вернуть. Необязательно                                                                                                                       |

**Ответ**

| Поле                | Тип               | Описание                                           |
| ------------------- | ----------------- | -------------------------------------------------- |
| `list`              | `AccountDomain[]` | Домены и заявки. [`AccountDomain`](#accountdomain) |
| `pagination.limit`  | `number`          | Размер страницы                                    |
| `pagination.offset` | `number`          | Смещение                                           |
| `pagination.total`  | `number`          | Всего записей                                      |

## `get`

Возвращает один зарегистрированный домен. Незавершённый или отменённый id отвечает 404.

`GET /account/{accountId}/domains/{regId}`

```typescript
const domain = await client.account(accountId).domains.get(regId);
```

**Вход**

| Поле    | Тип      | Описание       |
| ------- | -------- | -------------- |
| `regId` | `number` | Id регистрации |

**Ответ**

| Поле  | Тип             | Описание                          |
| ----- | --------------- | --------------------------------- |
| ответ | `AccountDomain` | [`AccountDomain`](#accountdomain) |

## `unbindSite`

Снимает домен с сайта. Регистрация остаётся на аккаунте. Зарегистрированный домен привязан к сайту, поэтому хватает id регистрации.

`DELETE /account/{accountId}/domains/{regId}/site`

```typescript
await client.account(accountId).domains.unbindSite(regId);
```

**Вход**

| Поле    | Тип      | Описание       |
| ------- | -------- | -------------- |
| `regId` | `number` | Id регистрации |
