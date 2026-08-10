import { Files, Images } from '../../src/client/media';

import type { ApiClient } from '../../src/client/api-client';
import type { FileAsset, Image } from '../../src/types/media';

describe('media client', () => {
    const siteId = 42;

    function createApiMock() {
        return {
            postForm: jest.fn(),
            post: jest.fn(),
            get: jest.fn(),
            delete: jest.fn(),
        };
    }

    it('uploads an image via multipart postForm', async() => {
        const api = createApiMock();
        const image: Image = {
            id: 1,
            ext: 'png',
            name: 'a.png',
            width: 10,
            height: 10,
            proportion: 1,
            url: '/img/1.png',
        };

        api.postForm.mockResolvedValue({ data: image, status: 201, statusText: 'Created' });

        const images = new Images(api as unknown as ApiClient, siteId);
        const result = await images.upload(new Uint8Array([ 1, 2, 3 ]), 'a.png', 'image/png');

        expect(result).toEqual(image);
        expect(api.postForm).toHaveBeenCalledTimes(1);
        expect(api.postForm).toHaveBeenCalledWith(
            `/sites/${ siteId }/images`,
            expect.any(FormData)
        );

        const formData = api.postForm.mock.calls[0][1] as FormData;
        const part = formData.get('file');

        expect(part).toBeInstanceOf(Blob);
    });

    it('uploads a file via multipart postForm', async() => {
        const api = createApiMock();
        const file: FileAsset = {
            id: 7,
            name: 'demo.mp4',
            ext: 'mp4',
            url: '/files/demo.mp4',
        };

        api.postForm.mockResolvedValue({ data: file, status: 201, statusText: 'Created' });

        const files = new Files(api as unknown as ApiClient, siteId);
        const result = await files.upload(Buffer.from('abc'), 'demo.mp4', 'video/mp4');

        expect(result).toEqual(file);
        expect(api.postForm).toHaveBeenCalledWith(
            `/sites/${ siteId }/files`,
            expect.any(FormData)
        );
    });

    it('claims images with JSON body', async() => {
        const api = createApiMock();

        api.post.mockResolvedValue({ data: null, status: 204, statusText: 'No Content' });

        const images = new Images(api as unknown as ApiClient, siteId);

        await images.claim({ imageIds: [ 1, 2 ] });

        expect(api.post).toHaveBeenCalledWith(
            `/sites/${ siteId }/images/claim`,
            { imageIds: [ 1, 2 ] }
        );
    });

    it('rejects unsupported upload binary', async() => {
        const api = createApiMock();
        const images = new Images(api as unknown as ApiClient, siteId);

        await expect(images.upload({} as never, 'x.bin')).rejects.toThrow(TypeError);
        expect(api.postForm).not.toHaveBeenCalled();
    });
});
