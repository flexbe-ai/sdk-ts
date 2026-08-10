export type RedirectKind = 'standard' | 'geo';
export type RedirectTypeCode = 301 | 302 | 200;

export type RedirectCondition = {
    enabled: boolean;
    exclude: boolean;
    list: string[];
};

type RedirectWritableFields = {
    enabled?: boolean;
    fromAllPages?: boolean;
    regularFromPage?: boolean;
    fromPage?: string;
    toPage: string;
    redirectType?: RedirectTypeCode;
    saveQuery?: boolean;
    country?: RedirectCondition;
    language?: RedirectCondition;
};

export type Redirect = {
    id: number;
    type: RedirectKind;
    enabled: boolean;
    fromAllPages: boolean;
    regularFromPage: boolean;
    fromPage: string;
    toPage: string;
    redirectType: RedirectTypeCode;
    saveQuery: boolean;
    sortIndex: number;
    country?: RedirectCondition;
    language?: RedirectCondition;
};

export type RedirectListResponse = {
    list: Redirect[];
};

export type GetRedirectsParams = {
    type?: RedirectKind;
};

export type CreateRedirectParams = RedirectWritableFields & {
    type: RedirectKind;
};

export type UpdateRedirectParams = Partial<CreateRedirectParams>;

/**
 * Item for PUT replace. Arrays of redirects fully replace the list for that type;
 * omitted existing ids are deleted.
 */
export type ReplaceRedirectItem = Omit<CreateRedirectParams, 'type'> & {
    id?: number;
};
