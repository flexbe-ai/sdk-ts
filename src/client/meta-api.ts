import { ApiClient } from './api-client';
import { SiteCurrency, SiteLanguage, UserLanguage } from '../types/meta';

export class MetaApi {
    constructor(private readonly api: ApiClient) {}

    /**
     * Get list of available site languages
     * @returns Promise with list of site languages
     */
    public async getSiteLanguages(): Promise<SiteLanguage[]> {
        const response = await this.api.get<SiteLanguage[]>('/meta/site-languages', {
            headers: { 'Authorization': '' }
        });
        return response.data;
    }

    /**
     * Get list of available user interface languages
     * @returns Promise with list of user languages
     */
    public async getUserLanguages(): Promise<UserLanguage[]> {
        const response = await this.api.get<UserLanguage[]>('/meta/user-languages', {
            headers: { 'Authorization': '' }
        });
        return response.data;
    }

    /**
     * Get list of available currencies
     * @returns Promise with list of currencies
     */
    public async getSiteCurrencies(): Promise<SiteCurrency[]> {
        const response = await this.api.get<SiteCurrency[]>('/meta/site-currencies', {
            headers: { 'Authorization': '' }
        });
        return response.data;
    }
}