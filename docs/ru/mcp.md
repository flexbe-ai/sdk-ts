# MCP

Сервер MCP Flexbe — `https://api.flexbe.ru/mcp`. Транспорт — Streamable HTTP. Вход через OAuth: клиент открывает браузер, вы входите в аккаунт. Ключ API здесь не используется.

Для остальных регионов хост — `https://api.flexbe.com`.

[Добавить в Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=flexbe&config=eyJ0eXBlIjoiaHR0cCIsInVybCI6Imh0dHBzOi8vYXBpLmZsZXhiZS5ydS9tY3AifQ%3D%3D) · [Добавить в VS Code](https://vscode.dev/redirect/mcp/install?name=flexbe&config=%7B%22name%22%3A%22flexbe%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fapi.flexbe.ru%2Fmcp%22%7D) · [Добавить в Claude Code](#claude-code) · [Добавить в Codex](#codex)

## Claude Code

Файл `.mcp.json` в проекте или в плагине:

```json
{
  "mcpServers": {
    "flexbe": {
      "type": "http",
      "url": "https://api.flexbe.ru/mcp"
    }
  }
}
```

Этот репозиторий — плагин. В корне уже лежит `.mcp.json` с хостом `https://api.flexbe.com/mcp`. Для России замените хост.

```text
/plugin marketplace add flexbe-ai/sdk-ts
/plugin install flexbe@flexbe
```

Манифест — `.claude-plugin/plugin.json`. Каталог — `.claude-plugin/marketplace.json`.

## Codex

Файл проекта `.codex/config.toml`. Codex читает его в доверенном проекте. Затем вход:

```toml
[mcp_servers.flexbe]
url = "https://api.flexbe.ru/mcp"
```

```text
codex mcp login flexbe
```

Этот репозиторий — ещё и плагин Codex. Манифест — `plugin.json`, сервер — `mcp.json`, совместимый манифест — `.codex-plugin/plugin.json`. Каталог — `.agents/plugins/marketplace.json`. В файлах репозитория хост `https://api.flexbe.com/mcp`. Для России замените его.

```text
codex plugin marketplace add flexbe-ai/sdk-ts
```

Когда каталог добавлен, установка открывается ссылкой `codex://plugins/install/flexbe?marketplace=flexbe`.

## Cursor

`.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "flexbe": {
      "url": "https://api.flexbe.ru/mcp"
    }
  }
}
```

## VS Code

`.vscode/mcp.json`:

```json
{
  "servers": {
    "flexbe": {
      "type": "http",
      "url": "https://api.flexbe.ru/mcp"
    }
  }
}
```
