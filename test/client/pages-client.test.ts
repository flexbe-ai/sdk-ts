import { FlexbeClient } from '../../src/client/flexbe-client';
import { PageType, PageStatus } from '../../src/types/pages';
import { AxiosInstance } from 'axios';
import { FlexbeError } from '../../src/types';

describe('PagesClient', () => {
    let client: FlexbeClient;
    const testConfig = {
        apiKey: process.env.FLEXBE_API_KEY || 'test-api-key',
        baseUrl: process.env.FLEXBE_API_URL || 'https://api.flexbe.com',
        siteId: process.env.FLEXBE_SITE_ID || '0',
    };

    beforeEach(() => {
        client = new FlexbeClient(testConfig);
    });

    it('should initialize with correct configuration', () => {
        expect(client.pages).toBeDefined();
        const axiosInstance = (client as unknown as { client: AxiosInstance }).client;
        expect(axiosInstance.defaults.baseURL).toBe(testConfig.baseUrl);
        expect(axiosInstance.defaults.headers.Authorization).toBe(`Bearer ${testConfig.apiKey}`);
    });

    it('should get list of pages with default parameters', async () => {
        const response = await client.pages.getPages();
        expect(response).toBeDefined();
        expect(response.pages).toBeDefined();
        expect(response.pagination).toBeDefined();
        expect(response.pagination.limit).toBe(10);
        expect(response.pagination.offset).toBe(0);
        expect(response.pagination.total).toBeDefined();
    });

    it('should get list of pages with custom parameters', async () => {
        const params = {
            offset: 0,
            limit: 20,
            type: PageType.PAGE,
            status: PageStatus.PUBLISHED,
            search: ''
        };

        const response = await client.pages.getPages(params);
        expect(response).toBeDefined();
        expect(response.pages).toBeDefined();
        expect(response.pagination).toBeDefined();
        expect(response.pagination.limit).toBe(params.limit);
        expect(response.pagination.offset).toBe(params.offset);
        expect(response.pagination.total).toBeDefined();
    });

    it('should get a single page by ID', async () => {
        const pageId = 2272741;
        const response = await client.pages.getPage(pageId);
        expect(response).toBeDefined();
        expect(response.id).toBe(pageId);
        expect(response.siteId).toBe(Number(testConfig.siteId));
        expect(response.type).toBeDefined();
        expect(response.uri).toBeDefined();
        expect(response.status).toBeDefined();
        expect(response.sortIndex).toBeDefined();
    });

    it('should handle error when getting non-existent page', async () => {
        try {
            await client.pages.getPage(999999);
            fail('Should have thrown an error');
        } catch (error) {
            const flexbeError = error as FlexbeError;
            expect(flexbeError.message).toBeDefined();
            expect(flexbeError.status).toBeDefined();
        }
    });

    it('should handle error when getting pages with invalid parameters', async () => {
        try {
            await client.pages.getPages({
                offset: -1,
                limit: 0
            });
            fail('Should have thrown an error');
        } catch (error) {
            const flexbeError = error as FlexbeError;
            expect(flexbeError.message).toBeDefined();
            expect(flexbeError.status).toBeDefined();
        }
    });
});