import type { ApiClient } from './api-client';
import type {
    AccountDomain,
    AccountDomainListResponse,
    GetAccountDomainsParams,
} from '../types/domains';

/**
 * Account-owned domains and registration applications.
 * Nest: GET/DELETE /account/:accountId/domains...
 */
export class AccountDomains {
    constructor(
        private readonly api: ApiClient,
        private readonly accountId: number
    ) {}

    /**
     * List Success + pending regs (`{ list, pagination }`).
     * Light items (no contacts/ns). Canceled never returned.
     * Filter with `status=registered|pending`.
     */
    async list(params?: GetAccountDomainsParams): Promise<AccountDomainListResponse> {
        const response = await this.api.get<AccountDomainListResponse>(this.basePath(), { params });

        return response.data;
    }

    /**
     * One Success (registered) domain by regId.
     * Pending / canceled → 404.
     */
    async get(regId: number): Promise<AccountDomain> {
        const response = await this.api.get<AccountDomain>(this.basePath(`/${ regId }`));

        return response.data;
    }

    /**
     * Unbind alias from its site. Registration stays on the account.
     * Path has no siteId — a Success reg has at most one binding.
     */
    async unbindSite(regId: number): Promise<Record<string, never>> {
        const response = await this.api.delete<Record<string, never>>(
            this.basePath(`/${ regId }/site`)
        );

        return response.data;
    }

    private basePath(suffix = ''): string {
        return `/account/${ this.accountId }/domains${ suffix }`;
    }
}
