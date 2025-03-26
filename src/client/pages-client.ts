import { Page, GetPagesParams, PageListResponse } from '../types/pages';
import { FlexbeClient } from './flexbe-client';

export class PagesClient {
    constructor(
        private readonly client: FlexbeClient,
    ) {}

    /**
     * Get list of pages for a site
     */
    async getPages(params?: GetPagesParams): Promise<PageListResponse> {
        const response = await this.client.sitesGet<PageListResponse>('/pages', { params });
        return response.data;
    }

    /**
     * Get a single page by ID
     */
    async getPage(pageId: number): Promise<Page> {
        const response = await this.client.sitesGet<Page>(`/pages/${pageId}`);
        return response.data;
    }
}