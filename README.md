**English** · [Русский](README.ru.md)

# Flexbe TypeScript SDK

TypeScript client for the Flexbe API.

```bash
npm install @flexbe/sdk
```

```typescript
import { FlexbeClient } from "@flexbe/sdk";

const client = new FlexbeClient({
  apiKey: "your-api-key",
});

const site = client.getSiteApi(123);
const pages = await site.pages.getPages({
  limit: 10,
  offset: 0,
  type: "page",
  status: "published",
});

console.log(pages.list);
```

## Documentation

1. [Get started](docs/en/README.md) — install the package, create a client, work with a site or an account
2. [Requests and errors](docs/en/requests.md) — headers, query strings, status codes, timeouts
3. [Sites](docs/en/sites.md) — list and create projects, read and update the site, build HTML
4. [Pages](docs/en/pages.md) — pages and folders
5. [Page versions](docs/en/page-versions.md) — read and save versions
6. [Page data](docs/en/page-data.md) — version JSON: layout, entities, codes, animations
7. [Leads](docs/en/leads.md) — lead cards, order lines, shipping, reservations
8. [Ecommerce](docs/en/ecommerce.md) — products and categories
9. [Promotions](docs/en/promotions.md)
10. [Images](docs/en/images.md)
11. [Files](docs/en/files.md)
12. [Domains](docs/en/domains.md) — domains on a site and on an account
13. [Redirects](docs/en/redirects.md)
14. [Settings](docs/en/settings.md)
15. [Statistics](docs/en/statistics.md)
16. [Catalogs](docs/en/catalogs.md) — languages and currencies
17. [MCP](docs/en/mcp.md) — connect the MCP server

## MCP

The server is `https://api.flexbe.com/mcp`. Transport is Streamable HTTP.

Authorization is OAuth.

In Russia the host is `https://api.flexbe.ru`.

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

[Add to Cursor](https://cursor.com/en/install-mcp?name=flexbe&config=eyJ0eXBlIjoiaHR0cCIsInVybCI6Imh0dHBzOi8vYXBpLmZsZXhiZS5jb20vbWNwIn0=) · [Add to VS Code](https://vscode.dev/redirect/mcp/install?name=flexbe&config=%7B%22name%22%3A%22flexbe%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fapi.flexbe.com%2Fmcp%22%7D) · [Add to Claude Code](docs/en/mcp.md#claude-code) · [Add to Codex](docs/en/mcp.md#codex)

Claude Code, Codex, Cursor, and VS Code configs, and the plugins in this repo: [MCP](docs/en/mcp.md).
