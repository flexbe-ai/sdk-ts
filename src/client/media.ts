import type { ApiClient } from './api-client';
import type {
    ClaimImagesParams,
    CopyFilesParams,
    CopyFilesResponse,
    FileAsset,
    Image,
    UploadFromUrlParams,
} from '../types/media';

export type UploadBinary = Blob | File | Buffer | ArrayBuffer | Uint8Array;

function toBlob(data: UploadBinary, contentType?: string): Blob {
    if (typeof Blob !== 'undefined' && data instanceof Blob) {
        return contentType && data.type !== contentType
            ? new Blob([data], { type: contentType })
            : data;
    }

    // Buffer is a Uint8Array subclass in Node; ArrayBuffer needs a view
    const bytes = data instanceof ArrayBuffer
        ? new Uint8Array(data)
        : data instanceof Uint8Array
            ? data
            : null;

    if (!bytes) {
        throw new TypeError('Unsupported upload binary type');
    }

    // Copy into a plain ArrayBuffer-backed view for Blob compatibility across TS DOM libs
    const copy = new Uint8Array(bytes.byteLength);

    copy.set(bytes);

    return new Blob([copy], contentType ? { type: contentType } : undefined);
}

async function postMultipartFile<T>(
    api: ApiClient,
    path: string,
    file: UploadBinary,
    filename: string,
    contentType?: string
): Promise<T> {
    const formData = new FormData();

    formData.append('file', toBlob(file, contentType), filename);

    const response = await api.postForm<T>(path, formData);

    return response.data;
}

export class Images {
    constructor(
        private readonly api: ApiClient,
        private readonly siteId: number
    ) {}

    async upload(file: UploadBinary, filename = 'image.bin', contentType?: string): Promise<Image> {
        return postMultipartFile(this.api, `/sites/${ this.siteId }/images`, file, filename, contentType);
    }

    async uploadFromUrl(params: UploadFromUrlParams): Promise<Image> {
        const response = await this.api.post<Image>(`/sites/${ this.siteId }/images/from-url`, params);

        return response.data;
    }

    /** Claim existing image ids for this site account (cross-account paste). */
    async claim(params: ClaimImagesParams): Promise<void> {
        await this.api.post(`/sites/${ this.siteId }/images/claim`, params);
    }

    async get(imageId: number): Promise<Image> {
        const response = await this.api.get<Image>(`/sites/${ this.siteId }/images/${ imageId }`);

        return response.data;
    }

    async remove(imageId: number): Promise<void> {
        await this.api.delete(`/sites/${ this.siteId }/images/${ imageId }`);
    }
}

export class Files {
    constructor(
        private readonly api: ApiClient,
        private readonly siteId: number
    ) {}

    async upload(
        file: UploadBinary,
        filename: string,
        contentType = 'application/octet-stream'
    ): Promise<FileAsset> {
        return postMultipartFile(this.api, `/sites/${ this.siteId }/files`, file, filename, contentType);
    }

    async uploadFromUrl(params: UploadFromUrlParams): Promise<FileAsset> {
        const response = await this.api.post<FileAsset>(`/sites/${ this.siteId }/files/from-url`, params);

        return response.data;
    }

    async copy(params: CopyFilesParams): Promise<CopyFilesResponse> {
        const response = await this.api.post<CopyFilesResponse>(`/sites/${ this.siteId }/files/copy`, params);

        return response.data;
    }

    async remove(fileId: number): Promise<void> {
        await this.api.delete(`/sites/${ this.siteId }/files/${ fileId }`);
    }
}
