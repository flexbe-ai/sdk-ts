# Sandbox

`site.sandbox` creates a sandbox for a git branch, or returns the one that branch already has, and deletes a sandbox by id.

```typescript
const sandbox = await site.sandbox.create("feature-branch");
```

`delete` responds with 404 when the id is unknown.

## `create`

`POST /sites/{siteId}/app/sandbox`

```typescript
create(branch: string): Promise<SandboxResponse>
```

The body is `{ branch }`. If a sandbox for that branch already exists, the call returns it.

| Field           | Type     |
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

`sandboxId` is the `id` string from `create`.
