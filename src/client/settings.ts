import type { ApiClient } from './api-client';
import type { SiteSettings, UpdateSiteSettingsParams } from '../types/site-settings';

export class Settings {
    constructor(
        private readonly api: ApiClient,
        private readonly siteId: number
    ) {}

    /** Normalized public site settings (camelCase sections). */
    async getSettings(): Promise<SiteSettings> {
        const response = await this.api.get<SiteSettings>(`/sites/${ this.siteId }/settings`);

        return response.data;
    }

    /** JSON merge-patch; arrays in the patch fully replace. */
    async updateSettings(patch: UpdateSiteSettingsParams): Promise<SiteSettings> {
        const response = await this.api.patch<SiteSettings>(
            `/sites/${ this.siteId }/settings`,
            patch
        );

        return response.data;
    }
}
