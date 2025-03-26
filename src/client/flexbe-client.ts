import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { FlexbeConfig, FlexbeResponse, FlexbeError, FlexbeErrorResponse } from '../types';
import { PagesClient } from './pages-client';

export class FlexbeClient {
    private readonly client: AxiosInstance;
    private readonly config: FlexbeConfig;
    public readonly pages: PagesClient;

    constructor(config?: Partial<FlexbeConfig>) {
        this.config = {
            baseUrl: config?.baseUrl || process.env.FLEXBE_API_URL || 'https://api.flexbe.com',
            timeout: config?.timeout || 30000,
            apiKey: config?.apiKey || process.env.FLEXBE_API_KEY || '',
            siteId: config?.siteId || process.env.FLEXBE_SITE_ID,
        };

        if (!this.config.apiKey) {
            throw new Error('API key is required. Please provide it either through config or FLEXBE_API_KEY environment variable.');
        }

        this.client = axios.create({
            baseURL: this.config.baseUrl,
            timeout: this.config.timeout,
            headers: {
                'Authorization': `Bearer ${this.config.apiKey}`,
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
        this.pages = new PagesClient(this);
    }

    private setupInterceptors(): void {
        this.client.interceptors.response.use(
            (response) => response,
            (error: AxiosError<FlexbeErrorResponse>) => {
                const flexbeError: FlexbeError = {
                    message: error.response?.data?.message || error.message,
                    code: error.response?.data?.code,
                    status: error.response?.status,
                    details: error.response?.data?.details,
                };
                return Promise.reject(flexbeError);
            }
        );
    }

    private async request<T>(config: AxiosRequestConfig): Promise<FlexbeResponse<T>> {
        try {
            const response = await this.client.request<T>(config);
            return {
                data: response.data,
                status: response.status,
                statusText: response.statusText,
            };
        } catch (error) {
            throw error as FlexbeError;
        }
    }

    private get<T>(url: string, config?: AxiosRequestConfig): Promise<FlexbeResponse<T>> {
        return this.request<T>({ ...config, method: 'GET', url });
    }

    private post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<FlexbeResponse<T>> {
        return this.request<T>({ ...config, method: 'POST', url, data });
    }

    private put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<FlexbeResponse<T>> {
        return this.request<T>({ ...config, method: 'PUT', url, data });
    }

    private delete<T>(url: string, config?: AxiosRequestConfig): Promise<FlexbeResponse<T>> {
        return this.request<T>({ ...config, method: 'DELETE', url });
    }

    private getSiteUrl(path: string): string {
        if (!this.config.siteId) {
            return path;
        }
        return `/sites/${this.config.siteId}${path}`;
    }

    public sitesGet<T>(path: string, config?: AxiosRequestConfig): Promise<FlexbeResponse<T>> {
        return this.get<T>(this.getSiteUrl(path), config);
    }

    public sitesPost<T>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<FlexbeResponse<T>> {
        return this.post<T>(this.getSiteUrl(path), data, config);
    }

    public sitesPut<T>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<FlexbeResponse<T>> {
        return this.put<T>(this.getSiteUrl(path), data, config);
    }

    public sitesDelete<T>(path: string, config?: AxiosRequestConfig): Promise<FlexbeResponse<T>> {
        return this.delete<T>(this.getSiteUrl(path), config);
    }
}