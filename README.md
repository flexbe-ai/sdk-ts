**English** · [Русский](README.ru.md)

# Flexbe TypeScript SDK

TypeScript client for the Flexbe API. It runs in Node.js 20 or newer and in the browser, and calls the API with `fetch`.

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

Replace `123` with your site id. `getPages` returns `{ list, pagination }`. Installation, `getMe()`, and an account are in [Get started](docs/en/getting-started.md).

## Documentation

1. [Get started](docs/en/getting-started.md) — install the package, create a client, open a site or an account
2. [Requests and errors](docs/en/requests.md) — headers, query strings, status codes, timeouts
3. [Sites](docs/en/sites.md) — list and create projects, read and update one site, build HTML
4. [Pages](docs/en/pages.md) — pages, folders, versions
5. [Page data](docs/en/page-data.md) — version JSON: layout, entities, codes, animations
6. [Leads](docs/en/leads.md) — lead cards, order lines, shipping, reservations
7. [Ecommerce](docs/en/ecommerce.md) — products, categories, promotions
8. [Images](docs/en/images.md)
9. [Files](docs/en/files.md)
10. [Domains](docs/en/domains.md) — domains on a site and on an account
11. [Redirects](docs/en/redirects.md)
12. [Settings](docs/en/settings.md)
13. [Statistics](docs/en/statistics.md) — A/B tests
14. [Catalogs](docs/en/catalogs.md) — languages and currencies

## Development

```bash
npm install
npm run build
npm test
npm run lint
```

## License

MIT
