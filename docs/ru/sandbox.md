# Песочница

`site.sandbox` создаёт песочницу для git-ветки или возвращает уже существующую для этой ветки, и удаляет песочницу по id.

```typescript
const sandbox = await site.sandbox.create("feature-branch");
```

`delete` отвечает 404, если такого id нет.

## `create`

`POST /sites/{siteId}/app/sandbox`

```typescript
create(branch: string): Promise<SandboxResponse>
```

Тело — `{ branch }`. Если песочница для этой ветки уже есть, вызов вернёт её.

| Поле            | Тип      |
| --------------- | -------- |
| `id`            | `string` |
| `previewUrl`    | `string` |
| `controllerUrl` | `string` |
| `ideUrl`        | `string` |
| `token`         | `string` |

## `delete`

`DELETE /sites/{siteId}/app/sandbox/{sandboxId}`

```typescript
delete(sandboxId: string): Promise<void>
```

`sandboxId` — это строка `id` из `create`.
