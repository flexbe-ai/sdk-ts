import { FlexbeAuthType } from '../types';
import { ApiClient } from './api-client';
import { MetaApi } from './meta-api';
import { SiteApi } from './site-api';
import { Sites } from './sites';
import { TokenManager } from './token-manager';

import type { AuthMe, FlexbeConfig } from '../types';

export class FlexbeClient {
    private readonly config: FlexbeConfig;

    public readonly api: ApiClient;
    public readonly meta: MetaApi;
    public readonly sites: Sites;

    constructor(config?: Partial<FlexbeConfig>) {
        const getEnvVar = (key: string): string | undefined => {
            if (typeof process !== 'undefined' && process.env) {
                return process.env[key];
            }

            return undefined;
        };

        const defaultConfig: FlexbeConfig = {
            baseUrl: getEnvVar('FLEXBE_API_URL') || 'https://api.flexbe.com',
            timeout: 30000,
            apiKey: getEnvVar('FLEXBE_API_KEY') || '',
            authType: FlexbeAuthType.API_KEY,
        };

        this.config = {
            ...defaultConfig,
            ...config,
        };

        if (this.config.authType === 'apiKey' && !this.config.apiKey) {
            throw new Error('API key is required when using apiKey authentication. Please provide it either through config or FLEXBE_API_KEY environment variable.');
        }

        this.api = new ApiClient(this.config);
        this.meta = new MetaApi(this.api);
        this.sites = new Sites(this.api);
    }

    /**
     * Get a SiteApi instance for a specific site.
     * Alias of `client.sites.getApi(siteId)`.
     */
    public getSiteApi(siteId: number): SiteApi {
        return this.sites.getApi(siteId);
    }

    public async getMe(): Promise<AuthMe> {
        const response = await this.api.get<AuthMe>('/auth/me');

        return response.data;
    }

    /**
     * Revokes the current authentication token and clears it from storage.
     * This should be called during logout to ensure proper cleanup.
     * @returns Promise that resolves when the token is revoked
     */
    public async revokeToken(): Promise<void> {
        if (this.config.authType !== FlexbeAuthType.BEARER) {
            return;
        }

        await TokenManager.getInstance().revokeToken();
    }
}
