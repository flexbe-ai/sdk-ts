import { Ecommerce } from '../../src/client/ecommerce';
import { ProductListStatus } from '../../src/types/ecommerce';

import type { ApiClient } from '../../src/client/api-client';
import type { Product, ProductListResponse } from '../../src/types/ecommerce';

describe('Ecommerce', () => {
    const siteId = 42;
    const basePath = `/sites/${ siteId }/ecommerce`;
    const product = { id: 10, name: 'Hat' } as Product;
    const list = {
        list: [product],
        pagination: { limit: 25, offset: 0, total: 1 },
    } as ProductListResponse;

    let api: {
        get: jest.Mock;
        post: jest.Mock;
        patch: jest.Mock;
        put: jest.Mock;
        delete: jest.Mock;
    };
    let ecommerce: Ecommerce;

    beforeEach(() => {
        api = {
            get: jest.fn(),
            post: jest.fn(),
            patch: jest.fn(),
            put: jest.fn(),
            delete: jest.fn(),
        };
        ecommerce = new Ecommerce(api as unknown as ApiClient, siteId);
    });

    it('reads products, one product, and categories', async() => {
        api.get
            .mockResolvedValueOnce({ data: list })
            .mockResolvedValueOnce({ data: product })
            .mockResolvedValueOnce({ data: { list: [], total: 0, productCount: 0 } });

        await expect(ecommerce.listProducts({
            page: 2,
            limit: 10,
            categoryId: 3,
            search: 'hat',
            productIds: [10, 11],
            status: ProductListStatus.VISIBLE,
        })).resolves.toBe(list);
        await expect(ecommerce.getProduct(10)).resolves.toBe(product);
        await expect(ecommerce.listCategories({ includeHidden: false })).resolves.toEqual({
            list: [],
            total: 0,
            productCount: 0,
        });

        expect(api.get.mock.calls).toEqual([
            [`${ basePath }/products`, {
                params: {
                    page: 2,
                    limit: 10,
                    categoryId: 3,
                    search: 'hat',
                    productIds: '10,11',
                    status: ProductListStatus.VISIBLE,
                },
            }],
            [`${ basePath }/products/10`],
            [`${ basePath }/categories`, { params: { includeHidden: false } }],
        ]);
    });

    it('posts variant ids to the picker query', async() => {
        const lookups = [{ product, variant: { id: 2 } }];

        api.post.mockResolvedValue({ data: lookups });

        await expect(ecommerce.queryVariants([2, 6])).resolves.toBe(lookups);
        expect(api.post).toHaveBeenCalledWith(`${ basePath }/variants/query`, { ids: [2, 6] });
    });

    it('creates, updates, sorts and deletes categories', async() => {
        const category = { id: 1, name: 'Hats' };

        api.post.mockResolvedValue({ data: category });
        api.patch.mockResolvedValue({ data: { ...category, name: 'Caps' } });
        api.put.mockResolvedValue({ data: [category] });
        api.delete.mockResolvedValue({ data: { result: true } });

        await expect(ecommerce.createCategory({ name: 'Hats' })).resolves.toBe(category);
        await expect(ecommerce.updateCategory(1, { name: 'Caps', visible: 0 })).resolves.toEqual({
            ...category,
            name: 'Caps',
        });
        await expect(ecommerce.sortCategories({ categoryId: 3, afterId: 1 })).resolves.toEqual([category]);
        await expect(ecommerce.deleteCategory(1, { deleteProducts: true })).resolves.toEqual({ result: true });

        expect(api.post).toHaveBeenCalledWith(`${ basePath }/categories`, { name: 'Hats' });
        expect(api.patch).toHaveBeenCalledWith(`${ basePath }/categories/1`, { name: 'Caps', visible: 0 });
        expect(api.put).toHaveBeenCalledWith(`${ basePath }/categories/sort`, { categoryId: 3, afterId: 1 });
        expect(api.delete).toHaveBeenCalledWith(`${ basePath }/categories/1`, { params: { deleteProducts: true } });
    });

    it('creates and updates a product', async() => {
        const product = { id: 10, name: 'Hat' } as Product;
        const body = {
            name: 'Hat',
            options: [{ id: 'color', name: 'Color', values: [{ id: 'red', name: 'Red' }] }],
            variants: [{ id: 'var1', optionValues: [{ optionId: 'color', valueId: 'red' }], price: 10 }],
        };

        api.post.mockResolvedValue({ data: product });
        api.patch.mockResolvedValue({ data: { ...product, name: 'Cap' } });

        await expect(ecommerce.createProduct(body)).resolves.toBe(product);
        await expect(ecommerce.updateProduct(10, { ...body, name: 'Cap' })).resolves.toEqual({
            ...product,
            name: 'Cap',
        });

        expect(api.post).toHaveBeenCalledWith(`${ basePath }/products`, body);
        expect(api.patch).toHaveBeenCalledWith(`${ basePath }/products/10`, { ...body, name: 'Cap' });
    });

    it('hides, moves and binds products', async() => {
        const bulk = { results: [{ id: 10, result: true as const }] };

        api.post
            .mockResolvedValueOnce({ data: bulk })
            .mockResolvedValueOnce({ data: bulk })
            .mockResolvedValueOnce({ data: bulk });
        api.put.mockResolvedValue({ data: { result: true } });

        await expect(ecommerce.bulkProducts({ action: 'hide', ids: [10] })).resolves.toEqual(bulk);
        await expect(ecommerce.moveProduct(10, { categoryId: 3, afterId: 9 })).resolves.toEqual({ result: true });
        await expect(ecommerce.bindProductCategories({ productIds: [10], categoryIds: [3] })).resolves.toEqual(bulk);
        await expect(ecommerce.unbindProductCategories({ productIds: [10], categoryIds: [3] })).resolves.toEqual(bulk);

        expect(api.post).toHaveBeenNthCalledWith(1, `${ basePath }/products/bulk`, { action: 'hide', ids: [10] });
        expect(api.put).toHaveBeenCalledWith(`${ basePath }/products/10/position`, { categoryId: 3, afterId: 9 });
        expect(api.post).toHaveBeenNthCalledWith(2, `${ basePath }/products/categories/bind`, {
            productIds: [10],
            categoryIds: [3],
        });
        expect(api.post).toHaveBeenNthCalledWith(3, `${ basePath }/products/categories/unbind`, {
            productIds: [10],
            categoryIds: [3],
        });
    });
});
