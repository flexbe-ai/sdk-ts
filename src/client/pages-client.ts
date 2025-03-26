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

    /**
     * Create a new page
     */
    async createPage(data: Omit<Page, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Page> {
        const response = await this.client.sitesPost<Page>('/pages', data);
        return response.data;
    }

    /**
     * Update an existing page
     */
    async updatePage(pageId: number, data: Partial<Omit<Page, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>): Promise<Page> {
        const response = await this.client.sitesPut<Page>(`/pages/${pageId}`, data);
        return response.data;
    }

    /**
     * Delete a page
     */
    async deletePage(pageId: number): Promise<void> {
        await this.client.sitesDelete(`/pages/${pageId}`);
    }
}