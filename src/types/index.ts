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
    hooks?: {
        onUnauthorized?: () => void;
    };
}

export interface FlexbeResponse<T> {
    data: T;
    status: number;
    statusText: string;
}

export interface FlexbeErrorResponse {
    message: string | string[];
    error: string;
    statusCode: number;
    errors?: FlexbeBulkError[];
}

export interface FlexbeError {
    message: string | string[];
    error: string;
    statusCode: number;
    errors?: FlexbeBulkError[];
}

export interface FlexbeBulkError {
    id: number;
    message: string;
    error: string;
    code: number;
}


export interface JwtToken {
    accessToken: string;
    expiresAt: number;
}

export interface TokenResponse {
    accessToken: string;
}

export interface Pagination {
    limit: number;
    offset: number;
    total: number;
}

export class NotFoundException extends Error {
    public readonly statusCode = 404;
    public readonly errors?: FlexbeBulkError[];
    public readonly error: string;

    constructor(message: string | string[], error?: string, errors?: FlexbeBulkError[]) {
        super(Array.isArray(message) ? message.join(', ') : message);
        this.name = 'NotFoundException';
        this.error = error || 'not_found';
        this.errors = errors;
    }
}

export class ForbiddenException extends Error {
    public readonly statusCode = 403;
    public readonly errors?: FlexbeBulkError[];
    public readonly error: string;

    constructor(message: string | string[], error?: string, errors?: FlexbeBulkError[]) {
        super(Array.isArray(message) ? message.join(', ') : message);
        this.name = 'ForbiddenException';
        this.error = error || 'forbidden';
        this.errors = errors;
    }
}

export class BadRequestException extends Error {
    public readonly statusCode = 400;
    public readonly errors?: FlexbeBulkError[];
    public readonly error: string;

    constructor(message: string | string[], error?: string, errors?: FlexbeBulkError[]) {
        super(Array.isArray(message) ? message.join(', ') : message);
        this.name = 'BadRequestException';
        this.error = error || 'bad_request';
        this.errors = errors;
    }
}

export class UnauthorizedException extends Error {
    public readonly statusCode = 401;
    public readonly errors?: FlexbeBulkError[];
    public readonly error: string;

    constructor(message: string | string[], error?: string, errors?: FlexbeBulkError[]) {
        super(Array.isArray(message) ? message.join(', ') : message);
        this.name = 'UnauthorizedException';
        this.error = error || 'unauthorized';
        this.errors = errors;
    }
}

export class ServerException extends Error {
    public readonly statusCode: number;
    public readonly errors?: FlexbeBulkError[];
    public readonly error: string;

    constructor(message: string | string[], error?: string, statusCode: number = 500, errors?: FlexbeBulkError[]) {
        super(Array.isArray(message) ? message.join(', ') : message);
        this.name = 'ServerException';
        this.error = error || 'server_error';
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

export class TimeoutException extends Error {
    public readonly statusCode = 408;
    public readonly errors?: FlexbeBulkError[];
    public readonly error: string;

    constructor(message: string | string[], error?: string, errors?: FlexbeBulkError[]) {
        super(Array.isArray(message) ? message.join(', ') : message);
        this.name = 'TimeoutException';
        this.error = error || 'timeout';
        this.errors = errors;
    }
}

export type SiteApi = import('../client/site-api').SiteApi;
