import { ApiClient } from './api-client';
import { BulkDeleteResponse, BulkUpdateFolderItem, BulkUpdateFolderResponse, BulkUpdatePageItem, BulkUpdateResponse, CreateFolderParams, CreatePageVersionParams, GetPagesParams, Page, PageContent, PageFolder, PageFolderListResponse, PageHistoryItemData, PageHistoryListResponse, PageListResponse, PageVersionDataResponse, PageVersionListResponse, UpdateFolderParams, UpdatePageContentParams, UpdatePageParams } from '../types/pages';

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
     * - themeId: Filter by theme ID
     * @throws {UnauthorizedException} When the API key is invalid or expired
     * @throws {ForbiddenException} When the site is not accessible
     * @throws {BadRequestException} When the query parameters are invalid
     * @throws {ServerException} When the server encounters an error
     * @throws {TimeoutException} When the request times out
     */
    async getPages(params?: GetPagesParams): Promise<PageListResponse> {
        const processedParams = params
            ? {
                ...params,
                type: Array.isArray(params.type) ? params.type.join(',') : params.type,
                status: Array.isArray(params.status) ? params.status.join(',') : params.status,
            }
            : undefined;

        const response = await this.api.get<PageListResponse>(`/sites/${ this.siteId }/pages`, { params: processedParams });
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
        const response = await this.api.get<Page>(`/sites/${ this.siteId }/pages/${ pageId }`);
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
        const response = await this.api.get<PageFolderListResponse>(`/sites/${ this.siteId }/pages-folders`);
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
    async getFolder(id: number): Promise<PageFolder> {
        const response = await this.api.get<PageFolder>(`/sites/${ this.siteId }/pages-folders/${ id }`);
        return response.data;
    }

    /**
     * Update a folder's properties
     * @param id - ID of the folder to update
     * @param data - Update parameters:
     * - name: New name for the folder (max 50 characters)
     * - sortIndex: New position in the folder list (minimum 0)
     * @throws {UnauthorizedException} When the API key is invalid or expired
     * @throws {NotFoundException} When the folder is not found
     * @throws {ForbiddenException} When the folder does not belong to the site
     * @throws {BadRequestException} When the update parameters are invalid
     * @throws {ServerException} When the server encounters an error
     * @throws {TimeoutException} When the request times out
     */
    async updateFolder(id: number, data: UpdateFolderParams): Promise<PageFolder> {
        const response = await this.api.patch<PageFolder>(`/sites/${ this.siteId }/pages-folders/${ id }`, data);
        return response.data;
    }

    /**
     * Create a new folder
     * @param data - Create parameters:
     * - name: Name of the new folder (required, max 50 characters)
     * - sortIndex: Position in the folder list (optional, minimum 0)
     * @throws {UnauthorizedException} When the API key is invalid or expired
     * @throws {ForbiddenException} When the site is not accessible
     * @throws {BadRequestException} When the create parameters are invalid
     * @throws {ServerException} When the server encounters an error
     * @throws {TimeoutException} When the request times out
     */
    async createFolder(data: CreateFolderParams): Promise<PageFolder> {
        const response = await this.api.post<PageFolder>(`/sites/${ this.siteId }/pages-folders`, data);
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
    async deleteFolder(id: number): Promise<void> {
        await this.api.delete(`/sites/${ this.siteId }/pages-folders/${ id }`);
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
        await this.api.delete(`/sites/${ this.siteId }/pages/${ pageId }`);
    }

    /**
     * Update a page's properties
     * @param pageId - ID of the page to update
     * @param data - Update parameters including:
     * - status: New status for the page
     * - versionId: ID of the version to set as current
     * - name: New name for the page (max 150 characters)
     * - uri: New URI for the page (max 255 characters, automatically normalized with leading and trailing slashes)
     * - language: New language for the page
     * - folderId: New folder ID for the page
     * - sortIndex: New position in the page list
     * - meta: Meta information for the page:
     *   - title: Page title (max 200 characters)
     *   - description: Meta description for SEO (max 1000 characters)
     *   - keywords: Meta keywords for SEO (max 1000 characters)
     *   - ogImage: Open Graph image URL for social sharing
     *   - ogTitle: Open Graph title for social sharing (max 200 characters)
     *   - ogDescription: Open Graph description for social sharing (max 1000 characters)
     *   - noindex: Whether to prevent search engine indexing
     * @throws {UnauthorizedException} When the API key is invalid or expired
     * @throws {NotFoundException} When the page or version is not found
     * @throws {ForbiddenException} When the page does not belong to the site or version belongs to a different page
     * @throws {BadRequestException} When the update parameters are invalid
     * @throws {ServerException} When the server encounters an error
     * @throws {TimeoutException} When the request times out
     */
    async updatePage(pageId: number, data: UpdatePageParams): Promise<Page> {
        const response = await this.api.put<Page>(`/sites/${ this.siteId }/pages/${ pageId }`, data);
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
        const response = await this.api.patch<BulkUpdateResponse>(`/sites/${ this.siteId }/pages`, updates);
        return response.data;
    }

    /**
     * Bulk update multiple folders
     * @param updates - Array of folder updates, each containing:
     * - folderId: ID of the folder to update
     * - name: New name for the folder
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
        const response = await this.api.patch<BulkUpdateFolderResponse>(`/sites/${ this.siteId }/pages-folders`, updates);
        return response.data;
    }

    /**
     * Bulk delete multiple pages
     * @param ids - Array of page IDs to delete
     * @returns Object containing:
     * - deleted: Array of successfully deleted page IDs
     * - errors: Array of errors for failed deletions
     * @throws {UnauthorizedException} When the API key is invalid or expired
     * @throws {ForbiddenException} When the site is not accessible
     * @throws {BadRequestException} When all pages fail to delete
     * @throws {ServerException} When the server encounters an error
     * @throws {TimeoutException} When the request times out
     */
    async bulkDeletePages(ids: number[]): Promise<BulkDeleteResponse> {
        const response = await this.api.delete<BulkDeleteResponse>(`/sites/${ this.siteId }/pages`, {
            body: JSON.stringify({ ids }),
        });
        return response.data;
    }

    /**
     * Get page content
     * @param pageId - ID of the page to get content for
     * @returns The page content
     * @throws {UnauthorizedException} When the API key is invalid or expired
     * @throws {NotFoundException} When the page is not found
     * @throws {ForbiddenException} When the page does not belong to the site
     * @throws {ServerException} When the server encounters an error
     * @throws {TimeoutException} When the request times out
     */
    async getPageContent(pageId: number): Promise<PageContent> {
        const response = await this.api.get<PageContent>(`/sites/${ this.siteId }/pages/${ pageId }/content`);
        return response.data;
    }

    /**
     * Update page content
     * @param pageId - ID of the page to update content for
     * @param content - The new page content (excluding versionId and versionTime)
     * @returns The updated page content
     * @throws {UnauthorizedException} When the API key is invalid or expired
     * @throws {NotFoundException} When the page is not found
     * @throws {ForbiddenException} When the page does not belong to the site
     * @throws {BadRequestException} When the update parameters are invalid
     * @throws {ServerException} When the server encounters an error
     * @throws {TimeoutException} When the request times out
     */
    async updatePageContent(pageId: number, content: Partial<UpdatePageContentParams>): Promise<PageContent> {
        const response = await this.api.put<PageContent>(`/sites/${ this.siteId }/pages/${ pageId }/content`, content);
        return response.data;
    }

    /**
     * Get list of page history items
     * @param pageId - ID of the page to get history for
     * @returns List of page history items
     * @throws {UnauthorizedException} When the API key is invalid or expired
     * @throws {NotFoundException} When the page is not found
     * @throws {ForbiddenException} When the page does not belong to the site
     * @throws {ServerException} When the server encounters an error
     * @throws {TimeoutException} When the request times out
     */
    async getPageHistory(pageId: number): Promise<PageHistoryListResponse> {
        const response = await this.api.get<PageHistoryListResponse>(`/sites/${ this.siteId }/pages/${ pageId }/history`);
        return response.data;
    }

    /**
     * Get a specific page history item
     * @param pageId - ID of the page
     * @param versionId - ID of the history item to get
     * @returns The requested page history item with data
     * @throws {UnauthorizedException} When the API key is invalid or expired
     * @throws {NotFoundException} When the page or history item is not found
     * @throws {ForbiddenException} When the page does not belong to the site
     * @throws {ServerException} When the server encounters an error
     * @throws {TimeoutException} When the request times out
     */
    async getPageHistoryItem(pageId: number, versionId: number): Promise<PageHistoryItemData> {
        const response = await this.api.get<PageHistoryItemData>(`/sites/${ this.siteId }/pages/${ pageId }/history/${ versionId }`);
        return response.data;
    }

    /**
     * Get list of page versions
     * @param pageId - ID of the page to get versions for
     * @returns List of page versions
     * @throws {UnauthorizedException} When the API key is invalid or expired
     * @throws {NotFoundException} When the page is not found
     * @throws {ForbiddenException} When the page does not belong to the site
     * @throws {ServerException} When the server encounters an error
     * @throws {TimeoutException} When the request times out
     */
    async getVersions(pageId: number): Promise<PageVersionListResponse> {
        const response = await this.api.get<PageVersionListResponse>(`/sites/${ this.siteId }/pages/${ pageId }/versions`);
        return response.data;
    }

    /**
     * @deprecated Use getVersions instead, remove it after frontend will be updated
     * @param pageId - ID of the page to get versions for
     * @returns List of page versions
     * @throws {UnauthorizedException} When the API key is invalid or expired
     * @throws {NotFoundException} When the page is not found
     * @throws {ForbiddenException} When the page does not belong to the site
     * @throws {ServerException} When the server encounters an error
     * @throws {TimeoutException} When the request times out
     */
    async getPageVersions(pageId: number): Promise<PageVersionListResponse> {
        const response = await this.api.get<PageVersionListResponse>(`/sites/${ this.siteId }/pages/${ pageId }/versions`);
        return response.data;
    }

    /**
     * Get a specific page version
     * @param pageId - ID of the page
     * @param versionId - ID of the version to get or 'published' to get the published version
     * @returns The requested page version with data
     * @throws {UnauthorizedException} When the API key is invalid or expired
     * @throws {NotFoundException} When the page or version is not found
     * @throws {ForbiddenException} When the page does not belong to the site
     * @throws {ServerException} When the server encounters an error
     * @throws {TimeoutException} When the request times out
     */
    async getVersion(pageId: number, versionId: number | 'published'): Promise<PageVersionDataResponse> {
        const response = await this.api.get<PageVersionDataResponse>(`/sites/${ this.siteId }/pages/${ pageId }/versions/${ versionId }`);
        return response.data;
    }

    /**
     * Get the published version of a page
     * @param pageId - ID of the page
     * @returns The published page version with data
     * @throws {UnauthorizedException} When the API key is invalid or expired
     * @throws {NotFoundException} When the page is not found or has no published version
     * @throws {ForbiddenException} When the page does not belong to the site
     * @throws {ServerException} When the server encounters an error
     * @throws {TimeoutException} When the request times out
     */
    async getPublishedVersion(pageId: number): Promise<PageVersionDataResponse> {
        return this.getVersion(pageId, 'published');
    }

    /**
     * Create a new page version
     * @param pageId - ID of the page to create version for
     * @param data - Version data including:
     * - data: Page data structure containing blocks, modals, widgets, etc.
     * - assets: Optional page assets (images, files, screenshot)
     * - publish: Whether to publish this version immediately (default: true)
     * @returns The created page version with data
     * @throws {UnauthorizedException} When the API key is invalid or expired
     * @throws {NotFoundException} When the page is not found
     * @throws {ForbiddenException} When the page does not belong to the site
     * @throws {BadRequestException} When the version data is invalid
     * @throws {ServerException} When the server encounters an error
     * @throws {TimeoutException} When the request times out
     */
    async createVersion(
        pageId: number,
        data: CreatePageVersionParams
    ): Promise<PageVersionDataResponse> {
        const response = await this.api.post<PageVersionDataResponse>(
            `/sites/${ this.siteId }/pages/${ pageId }/versions`,
            data
        );
        return response.data;
    }
}
