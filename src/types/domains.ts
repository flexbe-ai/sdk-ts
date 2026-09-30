import type { Pagination } from './index';

/** Bound site on an account-owned (Success) registration. */
export type AccountDomainProjectAccess = 'owner' | 'shared' | 'lost';

export type AccountDomainProject = {
    id: number;
    name: string;
    imgId: number | null;
    access: AccountDomainProjectAccess;
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
 * Account registration status in API (DB stores int).
 * Frontend splits: success → owned list; queued | wrongData | error | waitingPayment → applications.
 */
export type AccountDomainRegStatus =
  | 'queued'
  | 'success'
  | 'wrongData'
  | 'error'
  | 'waitingPayment';

/** Profile alarm only — not site DNS / active. */
export type AccountDomainAlarmCode = 'expired' | 'banned';

export type AccountDomainStatus = {
    code: AccountDomainAlarmCode;
};

/**
 * Light list item: GET /account/:accountId/domains
 * No contacts/ns — those are on get(regId).
 */
export type AccountDomainListItem = {
    regId: number;
    name: string;
    nameDecoded: string;
    regStatus: AccountDomainRegStatus;
    /** Alarm only; null when ok / pending */
    status: AccountDomainStatus | null;
    project: AccountDomainProject | null;
    isFree: boolean;
    allowRenewal: boolean;
    expireTimestamp: number | null;
    expireAt: string | null;
};

/**
 * Full card: GET /account/:accountId/domains/:regId (Success only).
 */
export type AccountDomain = AccountDomainListItem & {
    contacts: AccountDomainContacts;
    ns: AccountDomainNs;
};

export type AccountDomainsStatusFilter = 'registered' | 'pending';

export type GetAccountDomainsParams = {
    offset?: number;
    limit?: number;
    /** registered = Success only; pending = queued / wrong_data / error / waiting_payment. Omit = both. */
    status?: AccountDomainsStatusFilter;
};

export type AccountDomainListResponse = {
    list: AccountDomainListItem[];
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
