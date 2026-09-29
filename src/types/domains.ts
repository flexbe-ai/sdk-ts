import type { Pagination } from './index';

/** Bound site on an account-owned (Success) registration. */
export type AccountDomainProjectAccess = 'owner' | 'shared' | 'lost';

export type AccountDomainProject = {
    id: number;
    name: string;
    imgId: number | null;
    access: AccountDomainProjectAccess;
};

export type AccountDomainStatus = {
    /** Runtime status (expired, banned, active, …). Null for pending applications. */
    code: string | null;
};

export type AccountDomainContacts = {
    email: string;
    phone: string;
    country: string;
    addressZip: string;
    addressCity: string;
    addressStreet: string;
};

export type AccountDomainNsHost = {
    host: string;
    ip: string | null;
};

export type AccountDomainNs = {
    enabled: boolean;
    list: AccountDomainNsHost[];
};

/**
 * Unified account domain / registration list item.
 * Frontend splits by regStatus: Success (1) → owned list; pending → applications.
 * regStatus: 0 queued, 1 success, 3 wrong_data, 4 error, 10 waiting_payment.
 */
export type AccountDomain = {
    regId: number;
    name: string;
    nameDecoded: string;
    regStatus: number;
    status: AccountDomainStatus | null;
    project: AccountDomainProject | null;
    isFree: boolean;
    allowRenewal: boolean;
    expireTimestamp: number | null;
    expireAt: string | null;
    contacts: AccountDomainContacts | null;
    ns: AccountDomainNs | null;
};

export type AccountDomainsStatusFilter = 'registered' | 'pending';

export type GetAccountDomainsParams = {
    offset?: number;
    limit?: number;
    /** registered = Success only; pending = queued / wrong_data / error / waiting_payment. Omit = both. */
    status?: AccountDomainsStatusFilter;
};

export type AccountDomainListResponse = {
    list: AccountDomain[];
    pagination: Pagination;
};

export type SiteDomainType = 'primary' | 'alias' | 'tech';

export type SiteDomainStatus = {
    code: string;
};

export type SiteDomainRegistration = {
    /** d_domains_reg.reg_id when registered via Flexbe; 0 for third-party */
    regId: number;
    isFree: boolean;
    expireTimestamp: number | null;
    expireAt: string | null;
};

export type SiteDomainSsl = {
    active: boolean;
    enabled: boolean;
};

/** One domain bound to a site (d_domains row). */
export type SiteDomain = {
    id: number;
    name: string;
    nameDecoded: string;
    type: SiteDomainType;
    isRedirectToPrimary: boolean;
    status: SiteDomainStatus;
    registration: SiteDomainRegistration;
    ssl: SiteDomainSsl;
};

export type GetSiteDomainsParams = {
    offset?: number;
    limit?: number;
};

export type SiteDomainListResponse = {
    list: SiteDomain[];
    pagination: Pagination;
};

export type BindSiteDomainParams = {
    name: string;
};
