import { SiteApi } from './site-api';

import type { ApiClient } from './api-client';
import type { GetSitesParams, SiteListResponse } from '../types/sites';

export class Sites {
    constructor(private readonly api: ApiClient) {}

    public async list(params?: GetSitesParams): Promise<SiteListResponse> {
        const response = await this.api.get<SiteListResponse>('/sites', { params });

        return response.data;
    }

    public getApi(siteId: number): SiteApi {
        return new SiteApi(this.api, siteId);
    }
}
