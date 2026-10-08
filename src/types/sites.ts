import type { Pagination } from './index';

export type SiteAccess = 'owner' | 'share';
export type SiteRole = 'owner' | 'admin' | 'editor' | 'manager' | null;

export type Site = {
    id: number;
    accountId: number;
    name: string | null;
    isDraft: boolean;
    createdAt: string;
    role: SiteRole;
    access: SiteAccess;
    domainUrl: string | null;
    domainTitle: string | null;
    domainIsTech: boolean | null;
};

export type GetSitesParams = {
    offset?: number;
    limit?: number;
    accountId?: number;
    isDraft?: boolean;
};

export type SiteListResponse = {
    list: Site[];
    pagination: Pagination;
};

export type UpdateSiteParams = {
    name?: string;
    isDraft?: boolean;
};

export type CreateSiteParams = {
    name?: string;
    isDraft?: boolean;
};
