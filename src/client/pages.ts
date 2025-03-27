import { Page, GetPagesParams, PageListResponse } from '../types/pages';
import { FlexbeClient } from './client';

export class Pages {
    constructor(
        private readonly client: FlexbeClient,
    ) {}

    /**
     * Get list of pages for a site
     */
    async getPages(params?: GetPagesParams): Promise<PageListResponse> {
        const response = await this.client.api.get<PageListResponse>('/sites/:siteId:/pages', { params });
        return response.data;
    }

    /**
     * Get a single page by ID
     */
    async getPage(pageId: number): Promise<Page> {
        const response = await this.client.api.get<Page>(`/sites/:siteId:/pages/${pageId}`);
        return response.data;
    }
}