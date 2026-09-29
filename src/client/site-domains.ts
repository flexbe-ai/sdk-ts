import type { ApiClient } from './api-client';
import type {
    BindSiteDomainParams,
    GetSiteDomainsParams,
    SiteDomain,
    SiteDomainListResponse,
} from '../types/domains';

/**
 * Domains bound to a site.
 * Nest: GET/POST/DELETE /sites/:siteId/domains...
 * Does not wrap PHP check_alias / whois.
 */
export class SiteDomains {
    constructor(
        private readonly api: ApiClient,
        private readonly siteId: number
    ) {}

    /** List domains bound to the site. */
    async list(params?: GetSiteDomainsParams): Promise<SiteDomainListResponse> {
        const response = await this.api.get<SiteDomainListResponse>(this.basePath(), { params });

        return response.data;
    }

    /**
     * Bind-execute: third-party alias or own unbound / internal move.
     * Call after client-side check_alias (PHP). Does not register free names.
     */
    async bind(params: BindSiteDomainParams): Promise<SiteDomain> {
        const response = await this.api.post<SiteDomain>(this.basePath(), params);

        return response.data;
    }

    /**
     * Unbind/remove from site.
     * Flexbe-registered: removes d_domains only (reg stays on account).
     * Third-party: deletes the row.
     */
    async remove(domainId: number): Promise<Record<string, never>> {
        const response = await this.api.delete<Record<string, never>>(
            this.basePath(`/${ domainId }`)
        );

        return response.data;
    }

    private basePath(suffix = ''): string {
        return `/sites/${ this.siteId }/domains${ suffix }`;
    }
}
