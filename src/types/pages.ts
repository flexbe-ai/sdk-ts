import type {
    PageEntityAnimation
} from './animations';
import type { FlexbeBulkError, Pagination } from './index';

export interface Screenshot {
    id: number | null;
    ext: string;
    url: string | null;
}

export interface PageSchemaMarkup {
    data: unknown;
    updatedAt: string | null;
    genProducts?: boolean;
}

export interface PageMeta {
    title: string | null;
    description: string | null;
    keywords: string | null;
    ogImage: string | null;
    ogTitle: string | null;
    ogDescription: string | null;
    noindex: boolean;
    schemaMarkup?: PageSchemaMarkup | null;
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
    /** Last version opened in the editor (draft or published); null on legacy pages */
    editorVersionId: number | null;
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
    /** Pin editor pointer without publishing */
    editorVersionId?: number;
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

export type PageContainerViewport = number | 'auto';

export interface PageContainerBreakpoint {
    width: number;
    gutter: number;
    minViewport: PageContainerViewport;
    viewport: PageContainerViewport;
    maxViewport: PageContainerViewport;
}

export interface PageContainerSettings {
    desktop: PageContainerBreakpoint;
    mobile: PageContainerBreakpoint;
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
    source: 'user' | 'google' | 'system' | 'flexbe';
    subsets?: string[];
    variants: FontVariant[];
    /** For Flexbe fonts */
    cssPath?: string;
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

export type PageCodeImage = {
    type: 'img';
    id: number;
    name: string;
    ext: string;
    average: string;
    proportion: number;
};

export type PageCodeFile = {
    type: 'file';
    id: number;
    name: string;
};

export type PageCodeModule = {
    id: string;
    path: string;
    content: string;
};

export type PageCodeSources = {
    html: string;
    js: string;
    css: string;
    modules: PageCodeModule[];
};

export type PageCodeAsset = PageCodeImage | PageCodeFile;

export interface PageCodeMeta {
    id: string;
    name: string;
    show_code: boolean;
    is_body: boolean;
}

export type PageCode = {
    html: string;
    js: string;
    css: string;
    files: PageCodeAsset[];
    sources: PageCodeSources;
};

export type PageCodeWithMeta = PageCodeMeta & PageCode;


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

export type PageEntityData<T = Record<string, any>> = T;

export type PageEntityMultiVars<T> = Record<string, { data: PageEntityData<T> }>;

// Common base interface for page components
export interface PageEntity<T = Record<string, any>> {
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

export interface PageBlock<T = Record<string, any>> extends PageEntity<T> {
    is: PageEntityType.Block;
    refPageId?: number;
    aboveTheFold?: boolean;
    children?: Array<PageBlock | PageElement>;

    multisection?: { enabled: boolean; main_var: string; vars: PageEntityMultiVars<T> };
    geolanding?: { enabled: boolean; vars: Record<string, { city: string; data: PageEntityData<T> }> };
}

export interface PageWidget<T = Record<string, any>> extends PageEntity<T> {
    is: PageEntityType.Widget;
    children?: PageElement[];
}

export interface PageModal<T = Record<string, any>> extends PageEntity<T> {
    is: PageEntityType.Modal;
    screenshot: ImageObj | null;
    children?: PageElement[];
}

export interface PageElement<T = Record<string, any>> extends PageEntity<T> {
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
    /** True if this version has never been published */
    isDraft: boolean;
}

export interface PageVersionListResponse {
    list: PageVersionItem[];
}

export type PageVisualGridItem = {
    columns: number;
    columnWidth: number | null;
    gap: number | null;
};

export type PageVisualGrid = {
    color?: string;
    desktop: PageVisualGridItem;
    mobile: PageVisualGridItem;
};

/**
 * Layout `entity.data` in page version JSON.
 * Known fields + arbitrary keys per `template_id`.
 */
export type PageLayoutData = {
    background?: PageBackground;
    responsive?: 'auto' | false;
    container?: PageContainerSettings;
    /** Editor visual grid overlay settings */
    visualGrid?: PageVisualGrid;
} & Record<string, any>;

/**
 * Page version JSON (`d_pages_versions.data`).
 */
export interface PageDataStructure {
    id?: string;
    is: PageEntityType.Layout;
    template_id: string;
    blocks: PageBlock[];
    modals: PageModal[];
    widgets: PageWidget[];
    abtests?: PageABTest[];
    codes?: PageCodeWithMeta[];
    textStyles?: TextStyleItem[];
    /** Layout settings (background, responsive) */
    data?: PageLayoutData;
    /**
     * @deprecated Moved to `data.background`
     */
    background?: PageBackground;
    /**
     * @deprecated Moved to `data.responsive`
     */
    responsive?: 'auto' | false | boolean;
}

export interface PageVersionDataResponse extends PageVersionItem {
    data: PageDataStructure;
    abtests?: PageABTest[];
}
