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

type HexColor = `#${ string }`;
type RGBColor = `rgb(${ string })`;
type RGBAColor = `rgba(${ string })`;
type HSLColor = `hsl(${ string })`;
type HSLAColor = `hsla(${ string })`;

type CSSLinearGradient = `linear-gradient(${ string })`;
type CSSRadialGradient = `radial-gradient(${ string })`;

type CSSColor = HexColor | RGBColor | RGBAColor | HSLColor | HSLAColor | string;
type ColorContrast = 'dark' | 'light';

export interface ImageObj {
    id: number;
    ext: string;
    name?: string;
    average?: string;
    preview?: string;
    width?: number;
    height?: number;
    proportion?: number;
    border?: 'none' | 'transparent' | 'mixed' | string;
    animated?: boolean;
    transparent?: number;
}

export interface PageBackgroundStyles {
    backgroundColor: CSSColor | CSSLinearGradient | CSSRadialGradient;
    backgroundFixed: boolean;
    backgroundRepeat: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat';
    backgroundPosition: string;
    backgroundSize: 'cover' | 'contain' | 'auto';
    contrast: ColorContrast;
}

export interface PageBackground {
    image: ImageObj | null;
    styles: PageBackgroundStyles;
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

// Text style (set[])
export interface TextStyleItem {
    uid: string; // Unique font id
    id: string; // Font type (content, title, ...)
    title: string; // User defined name
    protected?: boolean; // Protected from deletion
    source?: 'project' | 'page'; // Source of the style (for UI only)
    style: TextStyleProperties;
    mobile?: Pick<TextStyleProperties, 'size' | 'weight' | 'line_height' | 'letter_spacing'>;
}

export interface TextStyleProperties {
    fontId?: string;
    family?: string;

    size: 'inherit' | number | string; // Font size with unit (e.g., '16px', '1em'), default unit 'px'
    weight: 'inherit' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900; // Font weight
    line_height: 'inherit' | number; // Line height in % (e.g., 150 = 1.5)
    letter_spacing: 'inherit' | number | string; // Letter spacing with unit (e.g., '0.05em', '1px'), default unit 'px'

    registry?: 'inherit' | 'none' | 'capitalize' | 'uppercase' | 'lowercase'; // Text transform
    decoration_italic?: 'inherit' | 'italic' | 'normal' | false; // Italic font style

    color?: 'auto' | CSSColor; // Color css value
    contrast?: 'light' | 'dark'; // Contrast to color (if not auto)
}

// Catalogue font item
export interface FontFamilyItem {
    id?: string;
    name: string;
    source: 'user' | 'google' | 'system';
    subsets?: string[];
    variants: FontVariant[];
}

// Uploaded font
export type UploadedFont = {
    id: string;
    name: string;
    variants?: FontVariant[];
};

// Font face variant
export interface FontVariant {
    fileName?: string;
    fileExt?: string;
    format?: string;
    weight: number;
    style: 'normal' | 'italic';
}

export interface StylesDataRaw {
    uploadedFonts?: UploadedFont[];
    siteTextStyles: TextStyleItem[];
    pageTextStyles?: TextStyleItem[];
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
    is_active: boolean;
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
    screenshot: ImageObj | null;
}

export interface PageContent {
    blocks: PageBlock[];
    modals: PageModal[];
    elements: PageElement[];
    widgets: PageWidget[];
    codes: string[];
    settings: {
        background?: PageBackground;
        textStyles?: TextStyleItem[];
        responsive?: string | boolean;
    } | null;
    abtests: PageABTest[];
    assets: {
        images: number[];
        files: string[];
    };
}