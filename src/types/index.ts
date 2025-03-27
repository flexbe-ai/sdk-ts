export enum FlexbeAuthType {
    API_KEY = 'apiKey',
    BEARER = 'bearer'
}

export interface FlexbeConfig {
    apiKey?: string;
    baseUrl?: string;
    timeout?: number;
    siteId?: string;
    authType?: FlexbeAuthType;
}

export interface FlexbeResponse<T> {
    data: T;
    status: number;
    statusText: string;
}

export interface FlexbeErrorResponse {
    message: string;
    code?: string;
    details?: unknown;
}

export interface FlexbeError {
    message: string;
    code?: string;
    status?: number;
    details?: unknown;
}

export interface JwtToken {
    accessToken: string;
    expiresAt: number;
}

export interface TokenResponse {
    accessToken: string;
}