export interface FlexbeConfig {
    apiKey: string;
    baseUrl?: string;
    timeout?: number;
}

export interface FlexbeResponse<T> {
    data: T;
    status: number;
    statusText: string;
}

export interface FlexbeError {
    message: string;
    code?: string;
    status?: number;
    details?: unknown;
}

export type FlexbeAuthType = 'apiKey' | 'bearer' | 'oauth2';