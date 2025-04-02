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
    grid?: GridConfig;
}

export interface GetPagesParams {
    offset?: number;
    limit?: number;
    type?: PageType;
    status?: PageStatus;
    uri?: string;
    title?: string;
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
    grid?: {
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
    };
}