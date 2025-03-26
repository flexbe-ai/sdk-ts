import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { FlexbeConfig, FlexbeResponse, FlexbeError, FlexbeErrorResponse } from '../types';

export class FlexbeClient {
    private readonly client: AxiosInstance;
    private readonly config: FlexbeConfig;

    constructor(config?: Partial<FlexbeConfig>) {
        this.config = {
            baseUrl: config?.baseUrl || process.env.FLEXBE_API_URL || 'https://api.flexbe.com',
            timeout: config?.timeout || 30000,
            apiKey: config?.apiKey || process.env.FLEXBE_API_KEY || '',
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

    protected async request<T>(config: AxiosRequestConfig): Promise<FlexbeResponse<T>> {
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

    protected get<T>(url: string, config?: AxiosRequestConfig): Promise<FlexbeResponse<T>> {
        return this.request<T>({ ...config, method: 'GET', url });
    }

    protected post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<FlexbeResponse<T>> {
        return this.request<T>({ ...config, method: 'POST', url, data });
    }

    protected put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<FlexbeResponse<T>> {
        return this.request<T>({ ...config, method: 'PUT', url, data });
    }

    protected delete<T>(url: string, config?: AxiosRequestConfig): Promise<FlexbeResponse<T>> {
        return this.request<T>({ ...config, method: 'DELETE', url });
    }
}