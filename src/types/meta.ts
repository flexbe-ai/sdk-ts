export interface SiteCurrency {
    code: string;
    name: string;
    symbol: string;
    symbolVariants?: string[];
    decimals: number;
}

export interface SiteLanguage {
    code: string;
    nameEn: string;
    nameNative: string;
}

export interface UserLanguage {
    code: string;
    nameEn: string;
    nameNative: string;
}
