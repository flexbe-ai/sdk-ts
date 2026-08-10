import { Pages } from '../../src/client/pages';

import type { ApiClient } from '../../src/client/api-client';
import type { Page } from '../../src/types/pages';

describe('pages create/copy client', () => {
    const siteId = 42;
    const page: Page = {
        id: 10,
        versionId: 1,
        editorVersionId: 1,
        type: 'page' as Page['type'],
        status: 'published' as Page['status'],
        name: 'Page',
        uri: '/page/',
        language: 'en',
        folderId: 0,
        sortIndex: 10,
        themeId: 4,
        updatedAt: new Date().toISOString(),
        deletedAt: null,
        screenshot: null,
        meta: null,
    };

    let api: { post: jest.Mock };
    let pages: Pages;

    beforeEach(() => {
        api = {
            post: jest.fn().mockResolvedValue({ data: page, status: 201, statusText: 'Created' }),
        };
        pages = new Pages(api as unknown as ApiClient, siteId);
    });

    it('createPage posts to /pages', async() => {
        const body = { sourcePageId: 5, name: 'New', uri: '/new/' };
        const result = await pages.createPage(body);

        expect(result).toEqual(page);
        expect(api.post).toHaveBeenCalledWith(`/sites/${ siteId }/pages`, body);
    });

    it('createPage with type global posts to /pages', async() => {
        const body = { type: 'global' as const, blocks: [], modals: [], widgets: [] };

        await pages.createPage(body);

        expect(api.post).toHaveBeenCalledWith(`/sites/${ siteId }/pages`, body);
    });

    it('createPageFromAi posts to /pages/from-ai', async() => {
        const body = { pageUUID: 'uuid-1' };

        await pages.createPageFromAi(body);

        expect(api.post).toHaveBeenCalledWith(`/sites/${ siteId }/pages/from-ai`, body);
    });

    it('copyPage posts to /pages/:id/copy', async() => {
        const body = { name: 'Copy', uri: '/copy/' };

        await pages.copyPage(9, body);

        expect(api.post).toHaveBeenCalledWith(`/sites/${ siteId }/pages/9/copy`, body);
    });

    it('copyPages posts to /pages/copy', async() => {
        api.post.mockResolvedValue({ data: { pages: [ page ] }, status: 201, statusText: 'Created' });

        const body = { pageIds: [ 1, 2 ] };
        const result = await pages.copyPages(body);

        expect(result.pages).toHaveLength(1);
        expect(api.post).toHaveBeenCalledWith(`/sites/${ siteId }/pages/copy`, body);
    });
});
