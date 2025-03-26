# Flexbe TypeScript SDK

A TypeScript SDK for interacting with the Flexbe API. Works in both Node.js and browser environments.

## Installation

```bash
npm install @flexbe/sdk
```

## Usage

```typescript
import { FlexbeClient } from '@flexbe/sdk';

// Initialize the client
const client = new FlexbeClient({
    apiKey: 'your-api-key',
    siteId: 'your-site-id', // optional, required for site-specific endpoints
    baseUrl: 'https://api.flexbe.com', // optional
    timeout: 30000, // optional, defaults to 30 seconds
});

// Using the Pages API
try {
    // Get list of pages
    const pages = await client.pages.getPages({
        limit: 10,
        offset: 0,
        type: 'page',
        status: 'published'
    });
    console.log(pages.pages);

    // Get a single page
    const page = await client.pages.getPage(123);
    console.log(page);
} catch (error) {
    console.error(error.message);
}

```

## Features

- TypeScript support with full type definitions
- API Key authentication
- Automatic error handling
- Configurable timeout and base URL
- Native fetch API support (works in both Node.js and browser)
- Site-specific endpoints support
- Query parameter handling
- Request timeout handling

## Environment Variables

The SDK supports the following environment variables:
- `FLEXBE_API_KEY`: Your API key
- `FLEXBE_API_URL`: Base URL (defaults to 'https://api.flexbe.com')
- `FLEXBE_SITE_ID`: Your site ID

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