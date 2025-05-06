import { FlexbeConfig, FlexbeResponse, FlexbeError, FlexbeErrorResponse, NotFoundException, ForbiddenException, BadRequestException, UnauthorizedException, ServerException, TimeoutException, FlexbeAuthType } from '../types';
import { TokenManager } from './token-manager';

export class ApiClient {
    private readonly config: FlexbeConfig;
    private readonly tokenManager: TokenManager;

    constructor(config: FlexbeConfig) {
        this.config = config;
        this.tokenManager = TokenManager.getInstance();

        if (this.config.authType === FlexbeAuthType.BEARER) {
            // Start initialization but don't wait for it
            void this.tokenManager.getToken(); // just warm up the token manager before any request
        }
    }

    private async getAuthHeaders(): Promise<Record<string, string>> {
        const headers: Record<string, string> = {};

        if (this.config.authType === FlexbeAuthType.API_KEY) {
            headers['x-api-key'] = this.config.apiKey as string;
        } else if (this.config.authType === FlexbeAuthType.BEARER) {
            const token = await this.tokenManager.getToken();
            if (!token) {
                throw new Error('No valid bearer token available');
            }
            headers['Authorization'] = `Bearer ${token}`;
        }

        return headers;
    }

    private buildUrl(path: string, params?: object): string {
        const searchParams = new URLSearchParams();
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    searchParams.append(key, String(value));
                }
            });
        }
        return `${path}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    }

    private async request<T>(config: RequestInit & { url: string; params?: object }): Promise<FlexbeResponse<T>> {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

            const url = this.buildUrl(config.url, config.params);
            const headers = {
                'Content-Type': 'application/json',
                ...(await this.getAuthHeaders()),
                ...config.headers,
            };

            const response = await fetch(this.config.baseUrl + url, {
                ...config,
                headers,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const defaultError: FlexbeErrorResponse = {
                    message: response.statusText,
                    error: response.statusText,
                    statusCode: response.status
                };
                const errorData = await response.json().catch(() => defaultError) as FlexbeErrorResponse;

                switch (errorData.statusCode) {
                    case 400:
                        throw new BadRequestException(errorData.message, errorData.error, errorData.errors);
                    case 401:
                        throw new UnauthorizedException(errorData.message, errorData.error, errorData.errors);
                    case 403:
                        throw new ForbiddenException(errorData.message, errorData.error, errorData.errors);
                    case 404:
                        throw new NotFoundException(errorData.message, errorData.error, errorData.errors);
                    case 500:
                    case 502:
                    case 503:
                    case 504:
                        throw new ServerException(errorData.message, errorData.error, errorData.statusCode, errorData.errors);
                    default:
                        throw {
                            message: errorData.message,
                            error: errorData.error,
                            statusCode: errorData.statusCode,
                            errors: errorData.errors
                        } as FlexbeError;
                }
            }

            // Handle 204 No Content response
            if (response.status === 204) {
                return {
                    data: null as T,
                    status: response.status,
                    statusText: response.statusText,
                };
            }

            const data = await response.json() as T;
            return {
                data,
                status: response.status,
                statusText: response.statusText,
            };
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                this.config.hooks?.onUnauthorized?.();
            }

            if (error instanceof Error && error.name === 'AbortError') {
                throw new TimeoutException('Request timeout');
            }
            throw error;
        }
    }

    public get<T>(url: string, config?: RequestInit & { params?: object }): Promise<FlexbeResponse<T>> {
        return this.request<T>({ ...config, url, method: 'GET' });
    }

    public post<T>(url: string, data?: unknown, config?: RequestInit & { params?: object }): Promise<FlexbeResponse<T>> {
        return this.request<T>({ ...config, url, method: 'POST', body: JSON.stringify(data) });
    }

    public put<T>(url: string, data?: unknown, config?: RequestInit & { params?: object }): Promise<FlexbeResponse<T>> {
        return this.request<T>({ ...config, url, method: 'PUT', body: JSON.stringify(data) });
    }

    public patch<T>(url: string, data?: unknown, config?: RequestInit & { params?: object }): Promise<FlexbeResponse<T>> {
        return this.request<T>({ ...config, url, method: 'PATCH', body: JSON.stringify(data) });
    }

    public delete<T>(url: string, config?: RequestInit & { params?: object }): Promise<FlexbeResponse<T>> {
        return this.request<T>({ ...config, url, method: 'DELETE' });
    }
}