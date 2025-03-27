import { FlexbeConfig, FlexbeError, FlexbeErrorResponse, TokenResponse } from '../types';
import { TokenManager } from './token-manager';

export class FlexbeAuth {
    private readonly config: FlexbeConfig;
    private readonly tokenManager: TokenManager;
    private initialized: boolean = false;
    private initializing: boolean = false;

    constructor(config: FlexbeConfig) {
        this.config = config;
        this.tokenManager = TokenManager.getInstance();

        if (this.config.authType === 'bearer') {
            // Check if we have a valid token in storage
            const existingToken = this.tokenManager.getToken();
            if (existingToken) {
                this.initialized = true;
            } else {
                void this.initializeBearerAuth();
            }
        } else {
            this.initialized = true;
        }
    }

    private async initializeBearerAuth(): Promise<void> {
        if (this.initializing) {
            return;
        }

        try {
            this.initializing = true;
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

            const response = await fetch('/oauth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    grant_type: 'client_credentials',
                }),
                credentials: 'include',
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

            const data = await response.json() as TokenResponse;
            this.tokenManager.setToken(data);
            this.initialized = true;
        } catch (error) {
            console.error('Failed to initialize bearer authentication:', error);
            throw error;
        } finally {
            this.initializing = false;
        }
    }

    public async ensureInitialized(): Promise<void> {
        if (!this.initialized && this.config.authType === 'bearer') {
            await this.initializeBearerAuth();
        }
    }

    public getAuthHeaders(): Record<string, string> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (this.config.authType === 'apiKey') {
            headers['x-api-key'] = this.config.apiKey as string;
        } else if (this.config.authType === 'bearer') {
            const token = this.tokenManager.getToken();
            if (!token) {
                throw new Error('No valid bearer token available');
            }
            headers['Authorization'] = `Bearer ${token}`;
        }

        return headers;
    }

    public isInitialized(): boolean {
        return this.initialized;
    }
}