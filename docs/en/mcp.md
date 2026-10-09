# MCP

The Flexbe MCP server is `https://api.flexbe.com/mcp`. Transport is Streamable HTTP.

Authorization is OAuth.

In Russia the host is `https://api.flexbe.ru`.

[Add to Cursor](https://cursor.com/en/install-mcp?name=flexbe&config=eyJ0eXBlIjoiaHR0cCIsInVybCI6Imh0dHBzOi8vYXBpLmZsZXhiZS5jb20vbWNwIn0=) · [Add to VS Code](https://vscode.dev/redirect/mcp/install?name=flexbe&config=%7B%22name%22%3A%22flexbe%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fapi.flexbe.com%2Fmcp%22%7D) · [Add to Claude Code](#claude-code) · [Add to Codex](#codex)

## Claude Code

Project file `.mcp.json`, or the plugin file of the same name:

```json
{
  "mcpServers": {
    "flexbe": {
      "type": "http",
      "url": "https://api.flexbe.com/mcp"
    }
  }
}
```

This repository is a plugin. The root `.mcp.json` already points at `https://api.flexbe.com/mcp`.

```text
/plugin marketplace add flexbe-ai/sdk-ts
/plugin install flexbe@flexbe
```

The manifest is `.claude-plugin/plugin.json`. The catalog is `.claude-plugin/marketplace.json`.

## Codex

Project file `.codex/config.toml`. Codex reads it in a trusted project. Then sign in:

```toml
[mcp_servers.flexbe]
url = "https://api.flexbe.com/mcp"
```

```text
codex mcp login flexbe
```

This repository is also a Codex plugin. The manifest is `plugin.json`, the server is `mcp.json`, and the compatibility manifest is `.codex-plugin/plugin.json`. The catalog is `.agents/plugins/marketplace.json`.

```text
codex plugin marketplace add flexbe-ai/sdk-ts
```

After that marketplace is added, Codex opens the install from `codex://plugins/install/flexbe?marketplace=flexbe`.

## Cursor

`.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "flexbe": {
      "url": "https://api.flexbe.com/mcp"
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
      "url": "https://api.flexbe.com/mcp"
    }
  }
}
```
