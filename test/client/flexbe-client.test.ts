import axios from 'axios';
import { FlexbeClient } from '../../src/client/flexbe-client';
import { FlexbeError } from '../../src/types';

describe('FlexbeClient', () => {
    let client: FlexbeClient;
    const testConfig = {
        apiKey: 'test-api-key',
        baseUrl: 'https://api.flexbe.com',
    };

    beforeEach(() => {
        client = new FlexbeClient(testConfig);
    });

    it('should initialize with correct configuration', () => {
        expect(client).toBeDefined();
        const axiosInstance = (client as any).client;
        expect(axiosInstance.defaults.baseURL).toBe(testConfig.baseUrl);
        expect(axiosInstance.defaults.headers.Authorization).toBe(`Bearer ${testConfig.apiKey}`);
    });

    it('should handle successful GET request', async () => {
        // Access protected method for testing
        const response = await (client as any).get('/');
        expect(response).toBeDefined();
        expect(response.status).toBeDefined();
        expect(response.statusText).toBeDefined();
    });

    it('should handle error response', async () => {
        try {
            // Access protected method for testing
            await (client as any).get('/non-existent-endpoint');
            fail('Should have thrown an error');
        } catch (error) {
            const flexbeError = error as FlexbeError;
            expect(flexbeError.message).toBeDefined();
            expect(flexbeError.status).toBeDefined();
        }
    });
});