# Запросы и ошибки

Методы ресурсов возвращают JSON-тело.

## Query

Значения `null` и `undefined` в query не отправляются. Всё остальное уходит строкой.

`type` и `status` страницы, а также список `productIds` товара, передавайте одним значением или массивом. Фильтры заявок используют имена полей из раздела [Заявки](leads.md).

## Тело

`post`, `put` и `patch` отправляют JSON.

Загрузка файла принимает `Blob`, `File`, `Buffer`, `ArrayBuffer` или `Uint8Array`. Любой другой тип бросает `TypeError` с текстом `Unsupported upload binary type`.

`bulkDeletePages` отправляет DELETE с телом `{ ids }`.

Ответ со статусом 204 не содержит тела. Результат метода — `null`.

## Таймаут

Клиент обрывает запрос через `timeout` миллисекунд (по умолчанию `30000`) и бросает `TimeoutException` с сообщением `Request timeout`. У этого исключения `statusCode` равен `408`: его ставит клиент в момент обрыва.

## Ошибки HTTP

Неуспешный ответ разбирается как JSON. Если тело не JSON, `message` и `error` берутся из status text.

| HTTP-статус        | Что бросается                                    |
| ------------------ | ------------------------------------------------ |
| 400                | `BadRequestException`                            |
| 401                | `UnauthorizedException`                          |
| 403                | `ForbiddenException`                             |
| 404                | `NotFoundException`                              |
| 500, 502, 503, 504 | `ServerException` (`statusCode` — статус ответа) |

Эти классы наследуют `Error`. У каждого есть `statusCode`, `error` (строковый код), `message` и необязательный `errors`. `message` — строка. Если API прислал массив сообщений, клиент склеивает их через запятую.

```typescript
import { NotFoundException } from "@flexbe/sdk";

try {
  await site.pages.getPage(123);
} catch (error) {
  if (error instanceof NotFoundException) {
    // error.statusCode === 404
  }
}
```

`errors`, когда он есть, имеет тип `FlexbeBulkError[]`: `id`, `message`, `error`, `code`. Массовое обновление папок и массовое удаление страниц используют свои типы элементов ошибки. Они описаны в разделе [Страницы](pages.md).
