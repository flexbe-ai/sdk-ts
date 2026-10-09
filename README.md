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

Replace `123` with your site id. `getPages` returns `{ list, pagination }`. Installation, `getMe()`, and an account are in [Get started](docs/getting-started.md).

## Documentation

1. [Get started](docs/getting-started.md) — install the package, create a client, open a site or an account
2. [Authentication](docs/authentication.md) — API key and browser bearer tokens
3. [Requests and errors](docs/requests.md) — headers, query strings, status codes, timeouts
4. [Sites](docs/sites.md) — list and create projects, read and update one site, build HTML
5. [Pages](docs/pages.md) — pages, folders, versions
6. [Page data](docs/page-data.md) — version JSON: layout, entities, codes, animations
7. [Leads](docs/leads.md) — lead cards, order lines, shipping, reservations
8. [Ecommerce](docs/ecommerce.md) — products, categories, promotions
9. [Images](docs/images.md)
10. [Files](docs/files.md)
11. [Domains](docs/domains.md) — domains on a site and on an account
12. [Redirects](docs/redirects.md)
13. [Settings](docs/settings.md)
14. [Sandbox](docs/sandbox.md)
15. [Statistics](docs/statistics.md) — A/B tests
16. [Catalogs](docs/catalogs.md) — languages and currencies

## Development

```bash
npm install
npm run build
npm test
npm run lint
```

## License

MIT
