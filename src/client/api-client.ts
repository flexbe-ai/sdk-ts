import { FlexbeConfig, FlexbeResponse, FlexbeError, FlexbeErrorResponse, NotFoundException, ForbiddenException, BadRequestException, UnauthorizedException, ServerException, TimeoutException } from '../types';
import { FlexbeAuth } from './auth';

export class ApiClient {
    private readonly config: FlexbeConfig;
    private readonly auth: FlexbeAuth;

    constructor(config: FlexbeConfig) {
        this.config = config;
        this.auth = new FlexbeAuth(config);
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
                const defaultError: FlexbeErrorResponse = {
                    message: response.statusText,
                    error: response.statusText,
                    statusCode: response.status
                };
                const errorData = await response.json().catch(() => defaultError) as FlexbeErrorResponse;

                switch (errorData.statusCode) {
                    case 400:
                        throw new BadRequestException(errorData.message);
                    case 401:
                        throw new UnauthorizedException(errorData.message);
                    case 403:
                        throw new ForbiddenException(errorData.message);
                    case 404:
                        throw new NotFoundException(errorData.message);
                    case 500:
                    case 502:
                    case 503:
                    case 504:
                        throw new ServerException(errorData.message, errorData.statusCode);
                    default:
                        throw {
                            message: errorData.message,
                            error: errorData.error,
                            statusCode: errorData.statusCode
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