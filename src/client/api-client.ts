import { FlexbeConfig, FlexbeResponse, FlexbeError, FlexbeErrorResponse } from '../types';
import { FlexbeAuth } from './auth';

export class ApiClient {
    private readonly config: FlexbeConfig;
    private readonly auth: FlexbeAuth;

    constructor(config: FlexbeConfig) {
        this.config = config;
        this.auth = new FlexbeAuth(config);
    }

    private replaceSiteId(url: string): string {
        if (!this.config.siteId) {
            return url;
        }
        return url.replace(/:siteId:/g, this.config.siteId);
    }

    private buildUrl(path: string, params?: Record<string, unknown>): string {
        const processedPath = this.replaceSiteId(path);
        const searchParams = new URLSearchParams();
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    searchParams.append(key, String(value));
                }
            });
        }
        return `${processedPath}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    }

    private async request<T>(config: RequestInit & { url: string; params?: Record<string, unknown> }): Promise<FlexbeResponse<T>> {
        try {
            await this.auth.ensureInitialized();

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

            const url = this.buildUrl(config.url, config.params);
            const headers = {
                ...(await this.auth.getAuthHeaders()),
                ...config.headers,
            };

            const response = await fetch(this.config.baseUrl + url, {
                ...config,
                headers,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const defaultError: FlexbeErrorResponse = { message: response.statusText };
                const errorData = await response.json().catch(() => defaultError) as FlexbeErrorResponse;
                const error: FlexbeError = {
                    message: errorData.message || response.statusText,
                    code: errorData.code,
                    status: response.status,
                    details: errorData.details,
                };
                throw error;
            }

            const data = await response.json() as T;
            return {
                data,
                status: response.status,
                statusText: response.statusText,
            };
        } catch (error) {
            if (error instanceof Error && error.name === 'AbortError') {
                const timeoutError: FlexbeError = {
                    message: 'Request timeout',
                    status: 408,
                };
                throw timeoutError;
            }
            throw error as FlexbeError;
        }
    }

    public get<T>(url: string, config?: RequestInit & { params?: Record<string, unknown> }): Promise<FlexbeResponse<T>> {
        return this.request<T>({ ...config, method: 'GET', url });
    }

    public post<T>(url: string, data?: unknown, config?: RequestInit & { params?: Record<string, unknown> }): Promise<FlexbeResponse<T>> {
        return this.request<T>({ ...config, method: 'POST', url, body: JSON.stringify(data) });
    }

    public put<T>(url: string, data?: unknown, config?: RequestInit & { params?: Record<string, unknown> }): Promise<FlexbeResponse<T>> {
        return this.request<T>({ ...config, method: 'PUT', url, body: JSON.stringify(data) });
    }

    public delete<T>(url: string, config?: RequestInit & { params?: Record<string, unknown> }): Promise<FlexbeResponse<T>> {
        return this.request<T>({ ...config, method: 'DELETE', url });
    }
}