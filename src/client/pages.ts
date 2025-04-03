import { Page, GetPagesParams, PageListResponse, PageFolder, PageFolderListResponse, UpdateFolderParams, CreateFolderParams, UpdatePageParams } from '../types/pages';
import { ApiClient } from './api-client';

export class Pages {
    constructor(
        private readonly api: ApiClient,
        private readonly siteId: number
    ) {}

    /**
     * Get list of pages for a site
     * @param params - Query parameters including:
     * - offset: Number of items to skip (default: 0)
     * - limit: Maximum number of items to return (default: 100)
     * - type: Filter by page type (could be an array of types)
     * - status: Filter by page status (could be an array of statuses)
     * - uri: Search by URI (exact match with '/' or partial match with '%word%')
     * - folderId: Filter by folder ID
     */
    async getPages(params?: GetPagesParams): Promise<PageListResponse> {
        const processedParams = params ? {
            ...params,
            type: Array.isArray(params.type) ? params.type.join(',') : params.type,
            status: Array.isArray(params.status) ? params.status.join(',') : params.status
        } : undefined;

        const response = await this.api.get<PageListResponse>(`/sites/${this.siteId}/pages`, { params: processedParams });
        return response.data;
    }

    /**
     * Get a single page by ID
     */
    async getPage(pageId: number): Promise<Page> {
        const response = await this.api.get<Page>(`/sites/${this.siteId}/pages/${pageId}`);
        return response.data;
    }

    /**
     * Get list of folders for a site
     */
    async getFolders(): Promise<PageFolderListResponse> {
        const response = await this.api.get<PageFolderListResponse>(`/sites/${this.siteId}/pages-folders`);
        return response.data;
    }

    /**
     * Get a single folder by ID
     */
    async getFolder(folderId: number): Promise<PageFolder> {
        const response = await this.api.get<PageFolder>(`/sites/${this.siteId}/pages-folders/${folderId}`);
        return response.data;
    }

    /**
     * Update a folder's properties
     * @param folderId - ID of the folder to update
     * @param data - Update parameters:
     * - title: New title for the folder
     * - sortIndex: New position in the folder list
     */
    async updateFolder(folderId: number, data: UpdateFolderParams): Promise<PageFolder> {
        const response = await this.api.patch<PageFolder>(`/sites/${this.siteId}/pages-folders/${folderId}`, data);
        return response.data;
    }

    /**
     * Create a new folder
     * @param data - Create parameters:
     * - title: Title of the new folder (required)
     * - sortIndex: Position in the folder list (optional)
     */
    async createFolder(data: CreateFolderParams): Promise<PageFolder> {
        const response = await this.api.post<PageFolder>(`/sites/${this.siteId}/pages-folders`, data);
        return response.data;
    }

    /**
     * Delete a folder and its items
     * @throws {NotFoundException} When the folder is not found
     * @throws {ForbiddenException} When the folder does not belong to the site
     */
    async deleteFolder(folderId: number): Promise<void> {
        await this.api.delete(`/sites/${this.siteId}/pages-folders/${folderId}`);
    }

    /**
     * Update a page's properties
     * @param pageId - ID of the page to update
     * @param data - Update parameters including:
     * - status: New status for the page
     * - name: New name for the page
     * - uri: New URI for the page
     * - language: New language for the page
     * - folderId: New folder ID for the page
     * - sortIndex: New position in the page list
     * - meta: Meta information for the page:
     *   - title: Page title
     *   - description: Meta description for SEO
     *   - keywords: Meta keywords for SEO
     *   - ogImage: Open Graph image URL for social sharing
     *   - ogTitle: Open Graph title for social sharing
     *   - ogDescription: Open Graph description for social sharing
     *   - noindex: Whether to prevent search engine indexing
     * - grid: Grid configuration for the page
     */
    async updatePage(pageId: number, data: UpdatePageParams): Promise<Page> {
        const response = await this.api.put<Page>(`/sites/${this.siteId}/pages/${pageId}`, data);
        return response.data;
    }
}