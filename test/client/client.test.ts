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

    it('should get site API instance', () => {
        const siteId = 1;
        const siteApi = client.getSiteApi(siteId);
        expect(siteApi).toBeDefined();
        expect(siteApi.pages).toBeDefined();
    });

    it('should return same site API instance for same site ID', () => {
        const siteId = 1;
        const siteApi1 = client.getSiteApi(siteId);
        const siteApi2 = client.getSiteApi(siteId);
        expect(siteApi1).toBe(siteApi2);
    });

    it('should handle successful GET request through site API', async () => {
        const siteApi = client.getSiteApi(1);
        const response = await siteApi.pages.getPages();
        expect(response).toBeDefined();
        expect(response.list).toBeDefined();
        expect(response.pagination).toBeDefined();
    });

    it('should handle error response through site API', async () => {
        try {
            const siteApi = client.getSiteApi(1);
            await siteApi.pages.getPage(999999);
            fail('Should have thrown an error');
        } catch (error) {
            const flexbeError = error as FlexbeError;
            expect(flexbeError.message).toBeDefined();
            expect(flexbeError.status).toBeDefined();
        }
    });
});