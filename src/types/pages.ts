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
    themeId: number;
}

export interface GetPagesParams {
    offset?: number;
    limit?: number;
    type?: PageType | PageType[];
    status?: PageStatus | PageStatus[];
    uri?: string;
    folderId?: number;
    themeId?: number;
}

export interface PageListResponse {
    list: Page[];
    pagination: Pagination;
}

export interface PageFolder {
    id: number;
    name: string;
    sortIndex: number;
}

export interface PageFolderListResponse {
    list: PageFolder[];
}

export interface UpdateFolderParams {
    name?: string;
    sortIndex?: number;
}

export interface CreateFolderParams {
    name: string;
    sortIndex?: number;
}

export interface UpdatePageParams {
    status?: PageStatus;
    name?: string;
    uri?: string;
    language?: string;
    folderId?: number;
    sortIndex?: number;
    meta?: Partial<PageMeta>;
}

export interface BulkUpdatePageItem extends UpdatePageParams {
    id: number;
}

export interface BulkUpdateError {
    id: number;
    code: number;
    message: string;
}

export interface BulkUpdateResponse {
    updated: Page[];
    errors: BulkUpdateError[];
}

export interface BulkUpdateFolderItem extends UpdateFolderParams {
    id: number;
}

export interface BulkUpdateFolderError {
    id: number;
    code: number;
    message: string;
}

export interface BulkUpdateFolderResponse {
    updated: PageFolder[];
    errors: BulkUpdateFolderError[];
}

export interface BulkDeletePages {
    pageIds: number[];
}

export interface BulkDeleteError {
    id: number;
    code: number;
    message: string;
}

export interface BulkDeleteResponse {
    deleted: number[];
    errors: BulkDeleteError[];
}

export interface PageBackground {
    image: {
        id: number;
        ext: string;
        average: string;
        preview: string;
        width: number;
        height: number;
        proportion: number;
        border: string;
        animated: boolean;
        transparent: number;
    } | null;
    styles: {
        backgroundRepeat: string;
        backgroundPosition: string;
        backgroundSize: string;
        backgroundFixed: boolean;
        backgroundColor: string;
        contrast: string;
    };
}

export interface PageGrid {
    color: string;
    desktop: {
        columns: string;
        containerWidth: string;
        columnWidth: string;
        gap: string;
    };
    mobile: {
        columns: string;
        containerWidth: string;
        columnWidth: string;
        gap: string;
    };
}

export interface PageFont {
    set: Array<{
        id: string;
        uid: string;
        protected: boolean;
        title: string;
        style: {
            fontId: string;
            family: string;
            weight: number;
            size: string;
            line_height: number;
            letter_spacing: number;
            registry: string;
            decoration_italic: boolean;
            color: string;
            contrast: string;
            decoration_strike: boolean;
            decoration_underline: boolean;
            colors: {
                enable: boolean;
                light: {
                    color: string;
                    opacity: number;
                    contrast: string;
                };
                dark: {
                    color: string;
                    opacity: number;
                    contrast: string;
                };
            };
        };
        mobile: {
            weight: string;
            size: string;
            line_height: number;
            letter_spacing: string;
            fontId: string;
            family: string;
            registry: string;
            decoration_italic: string;
            decoration_strike: string;
            decoration_underline: string;
            colors: {
                light: string;
                dark: string;
            };
        };
        subsets: string[];
    }>;
}

export interface PageBlock {
    update_time: number;
    data: Record<string, unknown>;
    id: string;
    is: string;
    template_id: string;
    refPageId?: number;
    p_id: number;
    aboveTheFold?: boolean;
}

export interface PageElement {
    update_time: number;
    data: Record<string, unknown>;
    id: string;
    is: string;
    template_id: string;
    mod_id?: string;
    p_id: number;
    aboveTheFold?: boolean;
    hidden?: string;
}

export interface PageWidget {
    update_time: number;
    data: Record<string, unknown>;
    id: string;
    is: string;
    template_id: string;
    untouched?: boolean;
    p_id: number;
}

export interface PageABTest {
    a: string;
    b: string;
    current: 'a' | 'b';
    is_active: number;
    id: number;
}

export interface PageModal {
    update_time: number;
    data: Record<string, unknown>;
    id: string;
    is: string;
    template_id: string;
    mod_id: string;
    p_id: number;
    screenshot: {
        id: number;
        ext: string;
        average: string;
        preview: string;
        width: number;
        height: number;
        proportion: number;
        animated: boolean;
        transparent: number;
    };
}

export interface PageContent {
    blocks: PageBlock[];
    modals: PageModal[];
    elements: PageElement[];
    widgets: PageWidget[];
    codes: string[];
    background: PageBackground;
    fonts: PageFont;
    abtests: PageABTest[];
    responsive: string | boolean;
}