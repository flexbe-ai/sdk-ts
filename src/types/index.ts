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
    message: string | string[];
    error: string;
    statusCode: number;
}

export interface FlexbeError {
    message: string | string[];
    error: string;
    statusCode: number;
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

    constructor(message: string | string[]) {
        super(Array.isArray(message) ? message.join(', ') : message);
        this.name = 'NotFoundException';
    }
}

export class ForbiddenException extends Error {
    public readonly statusCode = 403;

    constructor(message: string | string[]) {
        super(Array.isArray(message) ? message.join(', ') : message);
        this.name = 'ForbiddenException';
    }
}

export class BadRequestException extends Error {
    public readonly statusCode = 400;

    constructor(message: string | string[]) {
        super(Array.isArray(message) ? message.join(', ') : message);
        this.name = 'BadRequestException';
    }
}

export class UnauthorizedException extends Error {
    public readonly statusCode = 401;

    constructor(message: string | string[]) {
        super(Array.isArray(message) ? message.join(', ') : message);
        this.name = 'UnauthorizedException';
    }
}

export class ServerException extends Error {
    public readonly statusCode: number;

    constructor(message: string | string[], statusCode: number = 500) {
        super(Array.isArray(message) ? message.join(', ') : message);
        this.name = 'ServerException';
        this.statusCode = statusCode;
    }
}

export class TimeoutException extends Error {
    public readonly statusCode = 408;

    constructor(message: string | string[]) {
        super(Array.isArray(message) ? message.join(', ') : message);
        this.name = 'TimeoutException';
    }
}