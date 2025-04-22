import { FlexbeAuthType, FlexbeConfig } from '../types';
import { ApiClient } from './api-client';
import { SiteApi } from './site-api';
import { MetaApi } from './meta-api';
import { TokenManager } from './token-manager';

export class FlexbeClient {
    private readonly config: FlexbeConfig;
    private readonly api: ApiClient;
    private readonly siteApis: Map<number, SiteApi> = new Map();
    public readonly meta: MetaApi;

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
            authType: config?.authType || FlexbeAuthType.API_KEY,
        };

        if (this.config.authType === 'apiKey' && !this.config.apiKey) {
            throw new Error('API key is required when using apiKey authentication. Please provide it either through config or FLEXBE_API_KEY environment variable.');
        }

        this.api = new ApiClient(this.config);
        this.meta = new MetaApi(this.api);
    }

    /**
     * Get a SiteApi instance for a specific site
     * @param siteId - The ID of the site to get an API instance for
     * @returns A SiteApi instance for the specified site
     */
    public getSiteApi(siteId: number): SiteApi {
        let siteApi = this.siteApis.get(siteId);
        if (!siteApi) {
            siteApi = new SiteApi(this.api, siteId);
            this.siteApis.set(siteId, siteApi);
        }
        return siteApi;
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