import type { ApiClient } from './api-client';
import type {
    BulkProductsParams,
    BulkProductsResult,
    Category,
    CategoryListResponse,
    ChangeProductCategoriesParams,
    CreateCategoryParams,
    DeleteCategoryParams,
    DeleteCategoryResult,
    ListCategoriesParams,
    ListProductsParams,
    MoveProductParams,
    MoveProductResult,
    Product,
    ProductListResponse,
    ProductWriteParams,
    SortCategoriesParams,
    UpdateCategoryParams,
    VariantLookup,
} from '../types/ecommerce';

export class Ecommerce {
    constructor(
        private readonly api: ApiClient,
        private readonly siteId: number
    ) {}

    /** List catalog products. `productIds` are sent as a comma-separated query. */
    async listProducts(params?: ListProductsParams): Promise<ProductListResponse> {
        const response = await this.api.get<ProductListResponse>(this.basePath('/products'), {
            params: this.listParams(params),
        });

        return response.data;
    }

    /** Get one non-deleted product. */
    async getProduct(productId: number): Promise<Product> {
        const response = await this.api.get<Product>(this.basePath(`/products/${ productId }`));

        return response.data;
    }

    /** List categories. Hidden ones are included unless `includeHidden` is false. */
    async listCategories(params?: ListCategoriesParams): Promise<CategoryListResponse> {
        const response = await this.api.get<CategoryListResponse>(this.basePath('/categories'), { params });

        return response.data;
    }

    /** Create a category at the end of the list. `visible` defaults to 1. */
    async createCategory(data: CreateCategoryParams): Promise<Category> {
        const response = await this.api.post<Category>(this.basePath('/categories'), data);

        return response.data;
    }

    /** Update name or visibility. A category from another site is not changed. */
    async updateCategory(categoryId: number, data: UpdateCategoryParams): Promise<Category> {
        const response = await this.api.patch<Category>(this.basePath(`/categories/${ categoryId }`), data);

        return response.data;
    }

    /** Move a category after `afterId`. Omit `afterId` to move it to the start. */
    async sortCategories(data: SortCategoriesParams): Promise<Category[]> {
        const response = await this.api.put<Category[]>(this.basePath('/categories/sort'), data);

        return response.data;
    }

    /** Delete a category. `deleteProducts` also soft-deletes products placed in it. */
    async deleteCategory(categoryId: number, params?: DeleteCategoryParams): Promise<DeleteCategoryResult> {
        const response = await this.api.delete<DeleteCategoryResult>(
            this.basePath(`/categories/${ categoryId }`),
            params ? { params } : undefined
        );

        return response.data;
    }

    /** Create a product with nested options and variants. */
    async createProduct(data: ProductWriteParams): Promise<Product> {
        const response = await this.api.post<Product>(this.basePath('/products'), data);

        return response.data;
    }

    /** Update a product. A product from another site is not changed. */
    async updateProduct(productId: number, data: ProductWriteParams): Promise<Product> {
        const response = await this.api.patch<Product>(this.basePath(`/products/${ productId }`), data);

        return response.data;
    }

    /** Hide, show, remove or restore products. A product from another site is not changed. */
    async bulkProducts(data: BulkProductsParams): Promise<BulkProductsResult> {
        const response = await this.api.post<BulkProductsResult>(this.basePath('/products/bulk'), data);

        return response.data;
    }

    /** Move a product before or after another. `categoryId` reorders that category; omit it to reorder the site list. */
    async moveProduct(productId: number, data: MoveProductParams): Promise<MoveProductResult> {
        const response = await this.api.put<MoveProductResult>(this.basePath(`/products/${ productId }/position`), data);

        return response.data;
    }

    /** Add products to categories. A missing product or category is not applied. */
    async bindProductCategories(data: ChangeProductCategoriesParams): Promise<BulkProductsResult> {
        const response = await this.api.post<BulkProductsResult>(this.basePath('/products/categories/bind'), data);

        return response.data;
    }

    /** Remove products from categories. */
    async unbindProductCategories(data: ChangeProductCategoriesParams): Promise<BulkProductsResult> {
        const response = await this.api.post<BulkProductsResult>(this.basePath('/products/categories/unbind'), data);

        return response.data;
    }

    /** Resolve picker variants by id. Variants from another site are omitted by the API. */
    async queryVariants(ids: number[]): Promise<VariantLookup[]> {
        const response = await this.api.post<VariantLookup[]>(this.basePath('/variants/query'), { ids });

        return response.data;
    }

    private listParams(params?: ListProductsParams): object | undefined {
        if (!params) {
            return undefined;
        }

        return {
            ...params,
            productIds: params.productIds?.join(','),
        };
    }

    private basePath(suffix = ''): string {
        return `/sites/${ this.siteId }/ecommerce${ suffix }`;
    }
}
