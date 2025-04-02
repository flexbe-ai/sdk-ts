# Flexbe TypeScript SDK

A TypeScript SDK for interacting with the Flexbe API. Works in both Node.js and browser environments.

## Installation

```bash
npm install @flexbe/sdk
```

## Usage

```typescript
import { FlexbeClient } from '@flexbe/sdk';

// Initialize the client with API Key authentication
const client = new FlexbeClient({
    apiKey: 'your-api-key',
    baseUrl: 'https://api.flexbe.com', // optional
    timeout: 30000, // optional, defaults to 30 seconds
});
const siteApi = client.getSiteApi(SITE_ID)

// Using the Pages API for a specific site
try {
    // Get list of pages for site
    const pages = await siteApi.pages.getPages({
        limit: 10,
        offset: 0,
        type: 'page',
        status: 'published'
    });
    console.log(pages.pages);

    // Get a single page from site
    const page = await siteApi.pages.getPage(123);
    console.log(page);
} catch (error) {
    console.error(error.message);
}

```

## Features

- TypeScript support with full type definitions
- Multiple authentication methods:
  - API Key authentication
  - JWT Bearer token authentication with automatic token refresh (uses cookie-based authentication)
- Automatic error handling
- Configurable timeout and base URL
- Native fetch API support (works in both Node.js and browser)
- Multi-site support with site-specific API instances
- Query parameter handling
- Request timeout handling
- Token sharing between browser tabs (for JWT authentication)

## Environment Variables

The SDK supports the following environment variables:
- `FLEXBE_API_KEY`: Your API key (required for API Key authentication)
- `FLEXBE_API_URL`: Base URL (defaults to 'https://api.flexbe.com')

## Development

```bash
# Install dependencies
npm install

# Build the SDK
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## License

MIT