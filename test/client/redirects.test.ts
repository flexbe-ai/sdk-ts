import { Redirects } from '../../src/client/redirects';

import type { ApiClient } from '../../src/client/api-client';
import type { Redirect, RedirectListResponse } from '../../src/types/redirects';

describe('Redirects', () => {
    const siteId = 42;
    const basePath = `/sites/${ siteId }/redirects`;
    const mockRedirect: Redirect = {
        id: 1,
        type: 'standard',
        enabled: true,
        fromAllPages: false,
        regularFromPage: false,
        fromPage: '/old',
        toPage: '/new',
        redirectType: 301,
        saveQuery: true,
        sortIndex: 10,
    };
    const mockList: RedirectListResponse = { list: [ mockRedirect ] };

    let api: {
        get: jest.Mock;
        post: jest.Mock;
        patch: jest.Mock;
        put: jest.Mock;
        delete: jest.Mock;
    };
    let redirects: Redirects;

    beforeEach(() => {
        api = {
            get: jest.fn(),
            post: jest.fn(),
            patch: jest.fn(),
            put: jest.fn(),
            delete: jest.fn(),
        };
        redirects = new Redirects(api as unknown as ApiClient, siteId);
    });

    it('routes list/get through GET /sites/:siteId/redirects', async() => {
        api.get
            .mockResolvedValueOnce({ data: mockList })
            .mockResolvedValueOnce({ data: mockList })
            .mockResolvedValueOnce({ data: mockRedirect });

        await expect(redirects.getRedirects()).resolves.toBe(mockList);
        await expect(redirects.getRedirects({ type: 'geo' })).resolves.toBe(mockList);
        await expect(redirects.getRedirect(1)).resolves.toBe(mockRedirect);

        expect(api.get.mock.calls).toEqual([
            [ basePath, { params: undefined } ],
            [ basePath, { params: { type: 'geo' } } ],
            [ `${ basePath }/1` ],
        ]);
    });

    it('routes create/update/delete/replace with the correct method, path, and body', async() => {
        const createBody = {
            type: 'standard' as const,
            fromPage: '/old',
            toPage: '/new',
            redirectType: 301 as const,
            saveQuery: true,
        };
        const patch = { toPage: '/updated' };
        const replaceItems = [
            {
                fromPage: '/old',
                toPage: '/new',
                redirectType: 301 as const,
                saveQuery: true,
            },
        ];
        const updated = { ...mockRedirect, toPage: '/updated' };

        api.post.mockResolvedValue({ data: mockRedirect });
        api.patch.mockResolvedValue({ data: updated });
        api.delete.mockResolvedValue({ data: undefined });
        api.put.mockResolvedValue({ data: mockList });

        await expect(redirects.createRedirect(createBody)).resolves.toBe(mockRedirect);
        await expect(redirects.updateRedirect(1, patch)).resolves.toBe(updated);
        await expect(redirects.deleteRedirect(1)).resolves.toBeUndefined();
        await expect(redirects.replaceRedirects('standard', replaceItems)).resolves.toBe(mockList);

        expect(api.post).toHaveBeenCalledWith(basePath, createBody);
        expect(api.patch).toHaveBeenCalledWith(`${ basePath }/1`, patch);
        expect(api.delete).toHaveBeenCalledWith(`${ basePath }/1`);
        expect(api.put).toHaveBeenCalledWith(`${ basePath }/standard`, { items: replaceItems });
    });
});
