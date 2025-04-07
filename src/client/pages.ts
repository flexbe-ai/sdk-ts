import { Page, GetPagesParams, PageListResponse, PageFolder, PageFolderListResponse, UpdateFolderParams, CreateFolderParams, UpdatePageParams, BulkUpdatePageItem, BulkUpdateResponse, BulkUpdateFolderItem, BulkUpdateFolderResponse } from '../types/pages';
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
     * @throws {UnauthorizedException} When the API key is invalid or expired
     * @throws {ForbiddenException} When the site is not accessible
     * @throws {BadRequestException} When the query parameters are invalid
     * @throws {ServerException} When the server encounters an error
     * @throws {TimeoutException} When the request times out
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
     * @throws {UnauthorizedException} When the API key is invalid or expired
     * @throws {NotFoundException} When the page is not found
     * @throws {ForbiddenException} When the page does not belong to the site
     * @throws {ServerException} When the server encounters an error
     * @throws {TimeoutException} When the request times out
     */
    async getPage(pageId: number): Promise<Page> {
        const response = await this.api.get<Page>(`/sites/${this.siteId}/pages/${pageId}`);
        return response.data;
    }

    /**
     * Get list of folders for a site
     * @throws {UnauthorizedException} When the API key is invalid or expired
     * @throws {ForbiddenException} When the site is not accessible
     * @throws {ServerException} When the server encounters an error
     * @throws {TimeoutException} When the request times out
     */
    async getFolders(): Promise<PageFolderListResponse> {
        const response = await this.api.get<PageFolderListResponse>(`/sites/${this.siteId}/pages-folders`);
        return response.data;
    }

    /**
     * Get a single folder by ID
     * @throws {UnauthorizedException} When the API key is invalid or expired
     * @throws {NotFoundException} When the folder is not found
     * @throws {ForbiddenException} When the folder does not belong to the site
     * @throws {ServerException} When the server encounters an error
     * @throws {TimeoutException} When the request times out
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
     * @throws {UnauthorizedException} When the API key is invalid or expired
     * @throws {NotFoundException} When the folder is not found
     * @throws {ForbiddenException} When the folder does not belong to the site
     * @throws {BadRequestException} When the update parameters are invalid
     * @throws {ServerException} When the server encounters an error
     * @throws {TimeoutException} When the request times out
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
     * @throws {UnauthorizedException} When the API key is invalid or expired
     * @throws {ForbiddenException} When the site is not accessible
     * @throws {BadRequestException} When the create parameters are invalid
     * @throws {ServerException} When the server encounters an error
     * @throws {TimeoutException} When the request times out
     */
    async createFolder(data: CreateFolderParams): Promise<PageFolder> {
        const response = await this.api.post<PageFolder>(`/sites/${this.siteId}/pages-folders`, data);
        return response.data;
    }

    /**
     * Delete a folder and its items
     * @throws {UnauthorizedException} When the API key is invalid or expired
     * @throws {NotFoundException} When the folder is not found
     * @throws {ForbiddenException} When the folder does not belong to the site
     * @throws {ServerException} When the server encounters an error
     * @throws {TimeoutException} When the request times out
     */
    async deleteFolder(folderId: number): Promise<void> {
        await this.api.delete(`/sites/${this.siteId}/pages-folders/${folderId}`);
    }

    /**
     * Delete a page
     * @param pageId - ID of the page to delete
     * @throws {UnauthorizedException} When the API key is invalid or expired
     * @throws {NotFoundException} When the page is not found
     * @throws {ForbiddenException} When the page does not belong to the site
     * @throws {ServerException} When the server encounters an error
     * @throws {TimeoutException} When the request times out
     */
    async deletePage(pageId: number): Promise<void> {
        await this.api.delete(`/sites/${this.siteId}/pages/${pageId}`);
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
     * @throws {UnauthorizedException} When the API key is invalid or expired
     * @throws {NotFoundException} When the page is not found
     * @throws {ForbiddenException} When the page does not belong to the site
     * @throws {BadRequestException} When the update parameters are invalid
     * @throws {ServerException} When the server encounters an error
     * @throws {TimeoutException} When the request times out
     */
    async updatePage(pageId: number, data: UpdatePageParams): Promise<Page> {
        const response = await this.api.put<Page>(`/sites/${this.siteId}/pages/${pageId}`, data);
        return response.data;
    }

    /**
     * Bulk update multiple pages
     * @param updates - Array of page updates, each containing:
     * - pageId: ID of the page to update
     * - status: New status for the page
     * - name: New name for the page
     * - uri: New URI for the page
     * - language: New language for the page
     * - folderId: New folder ID for the page
     * - sortIndex: New position in the page list
     * - meta: Meta information for the page
     * @returns Object containing:
     * - updated: Array of successfully updated pages
     * - errors: Array of errors for failed updates
     * @throws {UnauthorizedException} When the API key is invalid or expired
     * @throws {ForbiddenException} When the site is not accessible
     * @throws {BadRequestException} When all pages fail to update
     * @throws {ServerException} When the server encounters an error
     * @throws {TimeoutException} When the request times out
     */
    async bulkUpdatePages(updates: BulkUpdatePageItem[]): Promise<BulkUpdateResponse> {
        const response = await this.api.patch<BulkUpdateResponse>(`/sites/${this.siteId}/pages`, updates);
        return response.data;
    }

    /**
     * Bulk update multiple folders
     * @param updates - Array of folder updates, each containing:
     * - folderId: ID of the folder to update
     * - title: New title for the folder
     * - sortIndex: New position in the folder list
     * @returns Object containing:
     * - updated: Array of successfully updated folders
     * - errors: Array of errors for failed updates
     * @throws {UnauthorizedException} When the API key is invalid or expired
     * @throws {ForbiddenException} When the site is not accessible
     * @throws {BadRequestException} When all folders fail to update
     * @throws {ServerException} When the server encounters an error
     * @throws {TimeoutException} When the request times out
     */
    async bulkUpdateFolders(updates: BulkUpdateFolderItem[]): Promise<BulkUpdateFolderResponse> {
        const response = await this.api.patch<BulkUpdateFolderResponse>(`/sites/${this.siteId}/pages-folders`, updates);
        return response.data;
    }
}