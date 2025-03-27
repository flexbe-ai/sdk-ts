import { FlexbeConfig, FlexbeAuthType } from '../types';
import { TokenManager } from './token-manager';

export class FlexbeAuth {
    private readonly config: FlexbeConfig;
    private readonly tokenManager: TokenManager;
    private initialized: boolean = false;
    private initializationPromise: Promise<void> | null = null;

    constructor(config: FlexbeConfig) {
        this.config = config;
        this.tokenManager = TokenManager.getInstance();

        if (this.config.authType === FlexbeAuthType.BEARER) {
            // Start initialization but don't wait for it
            this.initializationPromise = this.initialize();
        } else {
            this.initialized = true;
        }
    }

    private async initialize(): Promise<void> {
        try {
            const token = await this.tokenManager.getToken();
            this.initialized = !!token;
        } catch (error) {
            console.error('Failed to initialize auth:', error);
            this.initialized = false;
        } finally {
            this.initializationPromise = null;
        }
    }

    public async ensureInitialized(): Promise<void> {
        if (this.config.authType !== FlexbeAuthType.BEARER || this.initialized) {
            return;
        }

        // If initialization is in progress, wait for it
        if (this.initializationPromise) {
            await this.initializationPromise;
            return;
        }

        // If not initialized and no initialization in progress, start one
        await this.initialize();
    }

    public async getAuthHeaders(): Promise<Record<string, string>> {
        await this.ensureInitialized();

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

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
}