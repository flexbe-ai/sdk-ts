import { Page, GetPagesParams, PageListResponse, PageFolder, PageFolderListResponse, UpdateFolderParams, CreateFolderParams } from '../types/pages';
import { ApiClient } from './api-client';

export class Pages {
    constructor(
        private readonly api: ApiClient,
    ) {}

    /**
     * Get list of pages for a site
     * @param params - Query parameters including:
     * - offset: Number of items to skip (default: 0)
     * - limit: Maximum number of items to return (default: 100)
     * - type: Filter by page type
     * - status: Filter by page status
     * - uri: Search by URI (exact match with '/' or partial match with '%word%')
     * - title: Search by title
     * - folderId: Filter by folder ID
     */
    async getPages(params?: GetPagesParams): Promise<PageListResponse> {
        const response = await this.api.get<PageListResponse>('/sites/:siteId:/pages', { params });
        return response.data;
    }

    /**
     * Get a single page by ID
     */
    async getPage(pageId: number): Promise<Page> {
        const response = await this.api.get<Page>(`/sites/:siteId:/pages/${pageId}`);
        return response.data;
    }

    /**
     * Get list of folders for a site
     */
    async getFolders(): Promise<PageFolderListResponse> {
        const response = await this.api.get<PageFolderListResponse>('/sites/:siteId:/pages-folders');
        return response.data;
    }

    /**
     * Get a single folder by ID
     */
    async getFolder(folderId: number): Promise<PageFolder> {
        const response = await this.api.get<PageFolder>(`/sites/:siteId:/pages-folders/${folderId}`);
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
        const response = await this.api.patch<PageFolder>(`/sites/:siteId:/pages-folders/${folderId}`, data);
        return response.data;
    }

    /**
     * Create a new folder
     * @param data - Create parameters:
     * - title: Title of the new folder (required)
     * - sortIndex: Position in the folder list (optional)
     */
    async createFolder(data: CreateFolderParams): Promise<PageFolder> {
        const response = await this.api.post<PageFolder>('/sites/:siteId:/pages-folders', data);
        return response.data;
    }

    /**
     * Delete a folder and its items
     * @throws {NotFoundException} When the folder is not found
     * @throws {ForbiddenException} When the folder does not belong to the site
     */
    async deleteFolder(folderId: number): Promise<void> {
        await this.api.delete(`/sites/:siteId:/pages-folders/${folderId}`);
    }
}