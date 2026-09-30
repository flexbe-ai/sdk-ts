export enum ProductListStatus {
    VISIBLE = 'visible',
    HIDDEN = 'hidden',
    REMOVED = 'removed'
}

export interface ProductOptionValue {
    id: number;
    name: string;
    data: unknown;
    sortIndex: number;
}

export interface ProductOption {
    id: number;
    name: string;
    sortIndex: number;
    values: ProductOptionValue[];
    data: Record<string, unknown> | null;
}

export interface VariantOptionValueRef {
    optionId: number;
    valueId: number;
}

export interface ProductVariant {
    id: number;
    productId: number;
    name: string[];
    optionValues: VariantOptionValueRef[];
    vendorCode: string;
    quantity: number | null;
    price: number | null;
    priceOld: number | null;
    images: unknown[];
    defaultImageId: string | null;
    visible: number;
    isDefault: number;
    notLimited: number;
    deletedAt: string | null;
}

export interface ProductPrice {
    min: number;
    max: number;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    visible: number;
    taxable: boolean;
    available: boolean;
    images: unknown[];
    categoryIds: number[];
    options: ProductOption[];
    variants: ProductVariant[];
    usePriceOld: number;
    displayImage: string;
    price: ProductPrice;
    variantsQuantity: number;
    defaultVariantId: number;
    settings: Record<string, unknown>;
    sortIndex: number;
    isDemo: boolean;
    deletedAt: string | null;
}

export interface ProductListResponse {
    list: Product[];
    pagination: {
        limit: number;
        offset: number;
        total: number;
    };
}

export interface ListProductsParams {
    page?: number;
    limit?: number;
    categoryId?: number;
    search?: string;
    productIds?: number[];
    status?: ProductListStatus;
    priceMin?: number;
    priceMax?: number;
}

export interface Category {
    id: number;
    name: string;
    sortIndex: number;
    visible: number;
    isDemo: boolean;
    productCount: number;
}

export interface CategoryListResponse {
    list: Category[];
    total: number;
    productCount: number;
}

export interface ListCategoriesParams {
    includeHidden?: boolean;
}

export interface CreateCategoryParams {
    name: string;
    visible?: number;
}

export interface UpdateCategoryParams {
    name?: string;
    visible?: number;
}

export interface SortCategoriesParams {
    categoryId: number;
    afterId?: number;
}

export interface DeleteCategoryParams {
    deleteProducts?: boolean;
}

export interface DeleteCategoryResult {
    result: true;
}

export interface ProductOptionValueInput {
    id?: number | string;
    name: string;
    data?: unknown;
}

export interface ProductOptionInput {
    id?: number | string;
    name: string;
    data?: Record<string, unknown> | null;
    values: ProductOptionValueInput[];
}

export interface ProductVariantInput {
    id?: number | string;
    optionValues?: { optionId: number | string; valueId: number | string }[];
    vendorCode?: string;
    quantity?: number | null;
    price?: number | null;
    priceOld?: number | null;
    images?: unknown[];
    defaultImageId?: string | null;
    visible?: number;
    isDefault?: number;
    notLimited?: number;
}

export interface ProductWriteParams {
    name: string;
    description?: string;
    visible?: number;
    taxable?: boolean;
    images?: unknown[];
    categoryIds?: number[];
    usePriceOld?: number;
    displayImage?: string;
    settings?: Record<string, unknown>;
    options?: ProductOptionInput[];
    variants?: ProductVariantInput[];
}

export interface ProductUpsertItem extends ProductWriteParams {
    id?: number;
}

export interface ProductUpsertHit {
    index: number;
    product: Product;
}

export interface ProductUpsertError {
    index: number;
    message: string;
}

export interface ProductUpsertResult {
    created: ProductUpsertHit[];
    updated: ProductUpsertHit[];
    errors: ProductUpsertError[];
}

export type BulkProductAction = 'hide' | 'show' | 'remove' | 'restore';

export interface BulkProductsParams {
    action: BulkProductAction;
    ids: number[];
}

export interface BulkProductResult {
    id: number;
    result: true;
}

export interface BulkProductsResult {
    results: BulkProductResult[];
}

export interface MoveProductParams {
    categoryId?: number;
    beforeId?: number;
    afterId?: number;
}

export interface MoveProductResult {
    result: true;
}

export interface ChangeProductCategoriesParams {
    productIds: number[];
    categoryIds: number[];
}

export interface VariantProduct {
    id: number;
    name: string;
    options: ProductOption[];
    images: unknown[];
    displayImage: string;
}

export interface VariantLookup {
    product: VariantProduct;
    variant: ProductVariant;
}

export interface Promotion {
    id: number;
    type: 'discount' | 'promocode';
    discountType: 'money' | 'percent' | 'delivery';
    code: string | null;
    discountAmount: string;
    deliveryFree: boolean | null;
    activeFrom: string;
    dateFrom: string | null;
    dateTo: string | null;
    availableCount: number | null;
    usageWithAnyDiscount: boolean | null;
    active: boolean;
    deletedAt: string | null;
}

export interface PromotionListResponse {
    list: Promotion[];
}

export interface PromotionWriteParams {
    type: Promotion['type'];
    discountType: Promotion['discountType'];
    code?: string | null;
    discountAmount: string;
    deliveryFree?: boolean | number | null;
    activeFrom?: string | null;
    dateFrom?: string | null;
    dateTo?: string | null;
    availableCount?: number | null;
    usageWithAnyDiscount?: boolean | number | null;
    active: boolean | number;
}
