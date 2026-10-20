import type { ApiClient } from './api-client';
import type {
    AccountDomain,
    AccountDomainListResponse,
    AccountDomainRegFormResponse,
    AccountDomainRegMutationResponse,
    CreateAccountDomainRegParams,
    GetAccountDomainsParams,
    PatchAccountDomainRegParams,
} from '../types/domains';

/**
 * Account-owned domains and registration applications.
 * Nest: GET/POST/PATCH/DELETE /account/:accountId/domains...
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
     * Prefill form for a new registration (`?name=`).
     */
    async getRegForm(name: string): Promise<AccountDomainRegFormResponse> {
        const response = await this.api.get<AccountDomainRegFormResponse>(
            this.basePath('/reg/form'),
            { params: { name } }
        );

        return response.data;
    }

    /**
     * Prefill form for a pending application.
     */
    async getPendingRegForm(regId: number): Promise<AccountDomainRegFormResponse> {
        const response = await this.api.get<AccountDomainRegFormResponse>(
            this.basePath(`/reg/${ regId }`)
        );

        return response.data;
    }

    /**
     * Create application. Does not call registrar.
     */
    async createReg(
        params: CreateAccountDomainRegParams
    ): Promise<AccountDomainRegMutationResponse> {
        const response = await this.api.post<AccountDomainRegMutationResponse>(
            this.basePath('/reg'),
            params
        );

        return response.data;
    }

    /**
     * Update pending application contacts. Does not call registrar.
     */
    async patchReg(
        regId: number,
        params: PatchAccountDomainRegParams
    ): Promise<AccountDomainRegMutationResponse> {
        const response = await this.api.patch<AccountDomainRegMutationResponse>(
            this.basePath(`/reg/${ regId }`),
            params
        );

        return response.data;
    }

    /**
     * Cancel pending application.
     */
    async cancelReg(regId: number): Promise<Record<string, never>> {
        const response = await this.api.delete<Record<string, never>>(
            this.basePath(`/reg/${ regId }`)
        );

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
