import { FlexbeAuthType, FlexbeConfig } from '../types';
import { Pages } from './pages';
import { ApiClient } from './api-client';

export class FlexbeClient {
    private readonly config: FlexbeConfig;
    public readonly pages: Pages;
    public readonly api: ApiClient;

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
            authType: config?.authType || FlexbeAuthType.API_KEY,
        };

        if (this.config.authType === 'apiKey' && !this.config.apiKey) {
            throw new Error('API key is required when using apiKey authentication. Please provide it either through config or FLEXBE_API_KEY environment variable.');
        }

        this.api = new ApiClient(this.config);
        this.pages = new Pages(this.api);
    }
}