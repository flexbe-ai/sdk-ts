export interface Image {
    id: number;
    ext: string;
    name: string;
    width: number;
    height: number;
    proportion: number;
    url: string;
    previewUrl?: string | null;
    average?: string | null;
    transparent?: boolean;
    animated?: boolean;
    border?: string | null;
}

export interface FileAsset {
    id: number;
    name: string;
    originalName?: string | null;
    ext: string;
    url: string;
}

export interface UploadFromUrlParams {
    url: string;
}

export interface ClaimImagesParams {
    imageIds: number[];
}

export interface CopyFilesParams {
    sourceAccountId: number;
    /** Paths like `/files/foo.mp4` or `foo.mp4` */
    paths: string[];
}

export interface CopyFilesResponse {
    files: Array<FileAsset | null>;
}
