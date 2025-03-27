import { FlexbeClient } from '../../src/client/client';
import { FlexbeError } from '../../src/types';

describe('FlexbeClient', () => {
    let client: FlexbeClient;
    const testConfig = {
        apiKey: process.env.FLEXBE_API_KEY || 'test-api-key',
        baseUrl: process.env.FLEXBE_API_URL || 'https://api.flexbe.com',
    };

    beforeEach(() => {
        client = new FlexbeClient(testConfig);
    });

    it('should initialize with correct configuration', () => {
        expect(client).toBeDefined();
        // Access protected config for testing
        const config = (client as unknown as { config: { baseUrl: string; apiKey: string } }).config;
        expect(config.baseUrl).toBe(testConfig.baseUrl);
        expect(config.apiKey).toBe(testConfig.apiKey);
    });

    it('should handle successful GET request', async () => {
        const response = await client.api.get<{ status: string }>('/ping');
        expect(response).toBeDefined();
        expect(response.status).toBe(200);
        expect(response.data).toBeDefined();
        expect(response.data.status).toBe('ok');
    });

    it('should handle error response', async () => {
        try {
            await client.api.get('/non-existent-endpoint');
            fail('Should have thrown an error');
        } catch (error) {
            const flexbeError = error as FlexbeError;
            expect(flexbeError.message).toBeDefined();
            expect(flexbeError.status).toBeDefined();
        }
    });
});