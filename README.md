# Flexbe TypeScript SDK

A TypeScript SDK for interacting with the Flexbe API.

## Installation

```bash
npm install @flexbe/sdk-ts
```

## Usage

```typescript
import { FlexbeClient } from '@flexbe/sdk-ts';

// Initialize the client
const client = new FlexbeClient({
    apiKey: 'your-api-key',
    baseUrl: 'https://api.flexbe.com', // optional
    timeout: 30000, // optional, defaults to 30 seconds
});

// Example API call
try {
    const response = await client.get('/some-endpoint');
    console.log(response.data);
} catch (error) {
    console.error(error.message);
}
```

## Features

- TypeScript support with full type definitions
- API Key authentication
- Automatic error handling
- Configurable timeout and base URL
- Axios-based HTTP client

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