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
    siteId: number;
    type: PageType;
    uri: string;
    title: string | null;
    status: PageStatus;
    updatedAt?: Date;
    imgId: number | null;
    sortIndex: number;
}

export interface GetPagesParams {
    offset?: number;
    limit?: number;
    type?: PageType;
    status?: PageStatus;
    search?: string;
}

export interface Pagination {
    limit: number;
    offset: number;
    total: number;
}

export interface PageListResponse {
    pages: Page[];
    pagination: Pagination;
}