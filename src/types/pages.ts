import type {
    PageEntityAnimation
} from './animations';
import type { FlexbeBulkError, Pagination } from './index';

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
    versionId: number | null;
    type: PageType;
    status: PageStatus;
    name: string;
    uri: string | null;
    language: string;
    folderId: number;
    sortIndex: number;
    themeId: number;
    updatedAt: string;
    deletedAt: string | null;
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
    versionId?: number;
    name?: string;
    uri?: string;
    language?: string;
    folderId?: number;
    sortIndex?: number;
    meta?: Partial<PageMeta>;
}

export interface CreatePageVersionParams {
    data: PageDataStructure;
    assets?: {
        images: number[];
        files: string[];
        screenshot?: number | null;
    };
    publish?: boolean;
}

export interface BulkUpdatePageItem extends UpdatePageParams {
    id: number;
}

export interface BulkUpdateResponse {
    updated: Page[];
    errors: FlexbeBulkError[];
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


export enum PageEntityType {
    Block = 'block',
    Modal = 'modal',
    Element = 'element',
    Widget = 'widget',
    Layout = 'layout'
}

export enum PageEntityHidden {
    All = 'all',
    Mobile = 'mobile',
    Desktop = 'desktop'
}

export type PageEntityEvent = {
    event: string;
    action: string;
    action_code: string;
    onlyFirst: boolean;
    state: 'all' | 'in' | 'out';
    [key: string]: any;
};

export type PageEntityData<T = Record<string, unknown>> = T;

export type PageEntityMultiVars<T> = Record<string, { data: PageEntityData<T> }>;

// Common base interface for page components
export interface PageEntity<T = Record<string, unknown>> {
    id: string;
    is: PageEntityType;
    template_id: string;
    mod_id?: string;
    source_id?: string;
    update_time: number;
    data: T;
    p_id?: number;
    untouched?: boolean;
    hidden?: 'none' | 'mobile' | 'desktop';
    className?: string;
    modals?: PageModal[];
    animation?: PageEntityAnimation;
    events?: PageEntityEvent[];
    multidata?: { enabled: boolean; vars: PageEntityMultiVars<T> };
}

export interface PageBlock<T = Record<string, unknown>> extends PageEntity<T> {
    is: PageEntityType.Block;
    refPageId?: number;
    aboveTheFold?: boolean;
    children?: Array<PageBlock | PageElement>;

    multisection?: { enabled: boolean; main_var: string; vars: PageEntityMultiVars<T> };
    geolanding?: { enabled: boolean; vars: Record<string, { city: string; data: PageEntityData<T> }> };
}

export interface PageWidget<T = Record<string, unknown>> extends PageEntity<T> {
    is: PageEntityType.Widget;
    children?: PageElement[];
}

export interface PageModal<T = Record<string, unknown>> extends PageEntity<T> {
    is: PageEntityType.Modal;
    screenshot: ImageObj | null;
    children?: PageElement[];
}

export interface PageElement<T = Record<string, unknown>> extends PageEntity<T> {
    is: PageEntityType.Element;
    aboveTheFold?: boolean;
    children?: PageElement[];
}

export interface PageABTest {
    id: number;
    a: string;
    b: string;
    isActive: boolean;
}

export interface PageHistoryItem {
    id: number;
    createdAt: string;
    selected?: boolean;
}

export interface PageHistoryListResponse {
    list: PageHistoryItem[];
}

export interface PageHistoryItemData extends PageHistoryItem {
    data: Record<string, unknown>;
}

export interface PageVersionItem {
    id: number;
    createdAt: string;
}

export interface PageVersionListResponse {
    list: PageVersionItem[];
}

export interface PageDataStructure {
    is: string;
    template_id: string;
    blocks: PageBlock[];
    modals: PageModal[];
    widgets: PageWidget[];
    abtests?: PageABTest[];
    codes?: string[];
    textStyles?: TextStyleItem[];
    background?: PageBackground;
    responsive?: 'auto' | boolean;
}

export interface PageVersionDataResponse extends PageVersionItem {
    data: PageDataStructure;
    abtests?: PageABTest[];
}

/**
 * @deprecated This type is deprecated and will be removed in a future release. Use PageDataStructure or related types instead.
 */
export interface PageContent {
    versionId: number;
    versionTime: number;
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

/**
 * @deprecated This type is deprecated and will be removed in a future release. Use PageDataStructure or related types instead.
 */
export type UpdatePageContentParams = Omit<PageContent, 'versionId' | 'versionTime'>;
