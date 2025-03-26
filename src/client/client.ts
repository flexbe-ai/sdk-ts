import { FlexbeConfig, FlexbeResponse, FlexbeError, FlexbeErrorResponse } from '../types';
import { Pages } from './pages';

export class FlexbeClient {
    private readonly config: FlexbeConfig;
    public readonly pages: Pages;

    constructor(config?: Partial<FlexbeConfig>) {
        const getEnvVar = (key: string): string | undefined => {
            if (typeof process !== 'undefined' && process.env) {
                return process.env[key];
            }
            return undefined;
        };

        this.config = {
            baseUrl: config?.baseUrl || getEnvVar('FLEXBE_API_URL') || 'https://api.flexbe.com',
            timeout: config?.timeout || 30000,
            apiKey: config?.apiKey || getEnvVar('FLEXBE_API_KEY') || '',
            siteId: config?.siteId || getEnvVar('FLEXBE_SITE_ID'),
        };

        if (!this.config.apiKey) {
            throw new Error('API key is required. Please provide it either through config or FLEXBE_API_KEY environment variable.');
        }

        this.pages = new Pages(this);
    }

    private buildUrl(path: string, params?: Record<string, unknown>): string {
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

    private async request<T>(config: RequestInit & { url: string; params?: Record<string, unknown> }): Promise<FlexbeResponse<T>> {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

            const url = this.buildUrl(config.url, config.params);
            const response = await fetch(this.config.baseUrl + url, {
                ...config,
                headers: {
                    'Authorization': `Bearer ${this.config.apiKey}`,
                    'Content-Type': 'application/json',
                    ...config.headers,
                },
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

    private get<T>(url: string, config?: RequestInit & { params?: Record<string, unknown> }): Promise<FlexbeResponse<T>> {
        return this.request<T>({ ...config, method: 'GET', url });
    }

    private post<T>(url: string, data?: unknown, config?: RequestInit & { params?: Record<string, unknown> }): Promise<FlexbeResponse<T>> {
        return this.request<T>({ ...config, method: 'POST', url, body: JSON.stringify(data) });
    }

    private put<T>(url: string, data?: unknown, config?: RequestInit & { params?: Record<string, unknown> }): Promise<FlexbeResponse<T>> {
        return this.request<T>({ ...config, method: 'PUT', url, body: JSON.stringify(data) });
    }

    private delete<T>(url: string, config?: RequestInit & { params?: Record<string, unknown> }): Promise<FlexbeResponse<T>> {
        return this.request<T>({ ...config, method: 'DELETE', url });
    }

    private getSiteUrl(path: string): string {
        if (!this.config.siteId) {
            return path;
        }
        return `/sites/${this.config.siteId}${path}`;
    }

    public sitesGet<T>(path: string, config?: RequestInit & { params?: Record<string, unknown> }): Promise<FlexbeResponse<T>> {
        return this.get<T>(this.getSiteUrl(path), config);
    }

    public sitesPost<T>(path: string, data?: unknown, config?: RequestInit & { params?: Record<string, unknown> }): Promise<FlexbeResponse<T>> {
        return this.post<T>(this.getSiteUrl(path), data, config);
    }

    public sitesPut<T>(path: string, data?: unknown, config?: RequestInit & { params?: Record<string, unknown> }): Promise<FlexbeResponse<T>> {
        return this.put<T>(this.getSiteUrl(path), data, config);
    }

    public sitesDelete<T>(path: string, config?: RequestInit & { params?: Record<string, unknown> }): Promise<FlexbeResponse<T>> {
        return this.delete<T>(this.getSiteUrl(path), config);
    }
}