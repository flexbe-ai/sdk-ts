import { AccountDomains } from './account-domains';

import type { ApiClient } from './api-client';

/**
 * Account-scoped API surface (mirrors {@link SiteApi}).
 */
export class AccountApi {
    public readonly domains: AccountDomains;

    constructor(api: ApiClient, accountId: number) {
        this.domains = new AccountDomains(api, accountId);
    }
}
