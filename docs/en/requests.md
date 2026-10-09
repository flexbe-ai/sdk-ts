# Requests and errors

Resource methods return the JSON body.

## Query

`null` and `undefined` query values are omitted. Every other value is sent as a string.

Pass a page `type` or `status`, and a product `productIds` list, as one value or as an array. Lead filters use the field names on [Leads](leads.md).

## Body

`post`, `put`, and `patch` send JSON.

A file upload accepts a `Blob`, `File`, `Buffer`, `ArrayBuffer`, or `Uint8Array`. Anything else throws `TypeError` with `Unsupported upload binary type`.

`bulkDeletePages` sends a DELETE whose body is `{ ids }`.

A response with status 204 has no body. The method result is `null`.

## Timeouts

The client aborts the request after `timeout` milliseconds (default `30000`) and throws `TimeoutException` with the message `Request timeout`. `statusCode` on that exception is `408`, set by the client when it aborts.

## HTTP errors

A failed response is parsed as JSON. If the body is not JSON, `message` and `error` are the status text.

| HTTP status        | Thrown value                                            |
| ------------------ | ------------------------------------------------------- |
| 400                | `BadRequestException`                                   |
| 401                | `UnauthorizedException`                                 |
| 403                | `ForbiddenException`                                    |
| 404                | `NotFoundException`                                     |
| 500, 502, 503, 504 | `ServerException` (`statusCode` is the response status) |

These classes extend `Error`. Each one has `statusCode`, `error` (a string code), `message`, and optional `errors`. `message` is a string. When the API sends an array of messages, the client joins them with a comma.

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

`errors`, when present, is `FlexbeBulkError[]`: `id`, `message`, `error`, `code`. Bulk folder updates and bulk page deletes use their own error item types, on [Pages](pages.md).
