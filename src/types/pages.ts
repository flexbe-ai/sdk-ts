import { Pagination } from './index';

export interface GridConfig {
    color?: string;
    desktop?: {
        columns: number;
        containerWidth: number;
        columnWidth: number;
        gap: number;
    };
    mobile?: {
        columns: number;
        containerWidth: number;
        columnWidth: number;
        gap: number;
    };
}

export interface Screenshot {
    id: number | null;
    ext: string;
    url: string | null;
}

export interface PageMeta {
    title: string | null;
    description: string | null;
    keywords: string | null;
    ogImage: string | null;
    ogTitle: string | null;
    ogDescription: string | null;
    noindex: boolean;
}

export enum PageType {
    PAGE = 'page',
    FILE = 'file',
    GLOBAL = 'global',
    AI = 'ai',
    CMS = 'cms',
    ECOMMERCE_PRODUCT = 'ecommerce_product',
    ECOMMERCE_CATEGORY = 'ecommerce_category'
}

export enum PageStatus {
    PUBLISHED = 'published',
    DRAFTED = 'drafted',
    REMOVED = 'removed',
    DELETED = 'deleted'
}

export interface Page {
    id: number;
    type: PageType;
    status: PageStatus;
    name: string;
    uri: string | null;
    language: string;
    folderId: number;
    sortIndex: number;
    updatedAt?: Date;
    deletedAt: Date | null;
    screenshot: Screenshot | null;
    meta: PageMeta | null;
}

export interface GetPagesParams {
    offset?: number;
    limit?: number;
    type?: PageType | PageType[];
    status?: PageStatus | PageStatus[];
    uri?: string;
    folderId?: number;
}

export interface PageListResponse {
    list: Page[];
    pagination: Pagination;
}

export interface PageFolder {
    id: number;
    title: string;
    sortIndex: number;
}

export interface PageFolderListResponse {
    list: PageFolder[];
}

export interface UpdateFolderParams {
    title?: string;
    sortIndex?: number;
}

export interface CreateFolderParams {
    title: string;
    sortIndex?: number;
}

export interface UpdatePageParams {
    status?: PageStatus;
    name?: string;
    uri?: string;
    language?: string;
    folderId?: number;
    sortIndex?: number;
    meta?: {
        title?: string;
        description?: string;
        keywords?: string;
        ogImage?: string;
        ogTitle?: string;
        ogDescription?: string;
        noindex?: boolean;
    };
}

export interface BulkUpdatePageItem extends UpdatePageParams {
    pageId: number;
}

export interface BulkUpdateError {
    pageId: number;
    code: number;
    message: string;
}

export interface BulkUpdateResponse {
    updated: Page[];
    errors: BulkUpdateError[];
}

export interface BulkUpdateFolderItem extends UpdateFolderParams {
    folderId: number;
}

export interface BulkUpdateFolderError {
    folderId: number;
    code: number;
    message: string;
}

export interface BulkUpdateFolderResponse {
    updated: PageFolder[];
    errors: BulkUpdateFolderError[];
}

export interface BulkDeletePagesDto {
    pageIds: number[];
}

export interface BulkDeleteError {
    pageId: number;
    code: number;
    message: string;
}

export interface BulkDeleteResponseDto {
    deleted: number[];
    errors: BulkDeleteError[];
}