[English](README.md) · **Русский**

# Flexbe TypeScript SDK

TypeScript-клиент к API Flexbe.

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

## Документация

1. [С чего начать](docs/ru/README.md) — установка, клиент, сайт или аккаунт
2. [Запросы и ошибки](docs/ru/requests.md) — заголовки, query, коды ответа, таймаут
3. [Сайты](docs/ru/sites.md) — список и создание проектов, чтение и правка сайта, сборка HTML
4. [Страницы](docs/ru/pages.md) — страницы и папки
5. [Версии страниц](docs/ru/page-versions.md) — читать и сохранять версии
6. [Данные страницы](docs/ru/page-data.md) — JSON версии: макет, сущности, коды, анимации
7. [Заявки](docs/ru/leads.md) — карточка заявки, строки заказа, доставка, резервы
8. [Магазин](docs/ru/ecommerce.md) — товары и категории
9. [Акции](docs/ru/promotions.md)
10. [Изображения](docs/ru/images.md)
11. [Файлы](docs/ru/files.md)
12. [Домены](docs/ru/domains.md) — домены сайта и аккаунта
13. [Редиректы](docs/ru/redirects.md)
14. [Настройки](docs/ru/settings.md)
15. [Статистика](docs/ru/statistics.md)
16. [Справочники](docs/ru/catalogs.md) — языки и валюты
17. [MCP](docs/ru/mcp.md) — подключение сервера MCP

## MCP

Сервер — `https://api.flexbe.ru/mcp` (Streamable HTTP). Вход через OAuth: клиент открывает браузер. Ключ API не используется. Для остальных регионов хост — `https://api.flexbe.com`.

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

[Добавить в Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=flexbe&config=eyJ0eXBlIjoiaHR0cCIsInVybCI6Imh0dHBzOi8vYXBpLmZsZXhiZS5ydS9tY3AifQ%3D%3D) · [Добавить в VS Code](https://vscode.dev/redirect/mcp/install?name=flexbe&config=%7B%22name%22%3A%22flexbe%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fapi.flexbe.ru%2Fmcp%22%7D) · [Добавить в Claude Code](docs/ru/mcp.md#claude-code) · [Добавить в Codex](docs/ru/mcp.md#codex)

Конфиги Claude Code, Codex, Cursor и VS Code и плагины в этом репозитории: [MCP](docs/ru/mcp.md).
