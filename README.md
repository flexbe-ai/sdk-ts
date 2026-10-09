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

Replace `123` with your site id. `getPages` returns `{ list, pagination }`. Installation, `getMe()`, and an account are in [Get started](docs/en/README.md).

## Documentation

1. [Get started](docs/en/README.md) — install the package, create a client, open a site or an account
2. [Requests and errors](docs/en/requests.md) — headers, query strings, status codes, timeouts
3. [Sites](docs/en/sites.md) — list and create projects, read and update one site, build HTML
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

## Development

```bash
npm install
npm run build
npm test
npm run lint
```

## License

MIT
