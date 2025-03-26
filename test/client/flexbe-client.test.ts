import { FlexbeClient } from '../../src/client/flexbe-client';
import { FlexbeError } from '../../src/types';
import { AxiosInstance, AxiosResponse } from 'axios';

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
        const axiosInstance = (client as unknown as { client: AxiosInstance }).client;
        expect(axiosInstance.defaults.baseURL).toBe(testConfig.baseUrl);
        expect(axiosInstance.defaults.headers.Authorization).toBe(`Bearer ${testConfig.apiKey}`);
    });

    it('should handle successful GET request', async () => {
        // Access protected method for testing
        const response = await (client as unknown as { get: (url: string) => Promise<AxiosResponse> }).get('/');
        expect(response).toBeDefined();
        expect(response.status).toBe(200);
        expect(response.data).toBeDefined();
    });

    it('should handle error response', async () => {
        try {
            // Access protected method for testing
            await (client as unknown as { get: (url: string) => Promise<AxiosResponse> }).get('/non-existent-endpoint');
            fail('Should have thrown an error');
        } catch (error) {
            const flexbeError = error as FlexbeError;
            expect(flexbeError.message).toBeDefined();
            expect(flexbeError.status).toBeDefined();
        }
    });
});