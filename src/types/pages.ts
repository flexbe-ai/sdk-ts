import { Pagination } from './index';

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
    uri: string;
    title: string | null;
    status: PageStatus;
    updatedAt?: Date;
    imgId: number | null;
    folderId: number | null;
    sortIndex: number;
}

export interface GetPagesParams {
    offset?: number;
    limit?: number;
    type?: PageType;
    status?: PageStatus;
    search?: string;
    folderId?: number;
}

export interface PageListResponse {
    pages: Page[];
    pagination: Pagination;
}

export interface PageFolder {
    id: number;
    title: string;
    sortIndex: number;
}

export interface PageFolderListResponse {
    folders: PageFolder[];
}