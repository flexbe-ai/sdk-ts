export type CurrencyFormatSettings = {
    str: string;
    t: string;
    d: string;
};

export type CurrencyDataSettings = {
    code: string;
    symbol: string;
    decimals: number;
};

export type CurrencySettings = {
    code: string;
    symbol: string;
    data: CurrencyDataSettings;
    format: CurrencyFormatSettings;
};

export type LocaleSettings = {
    language: string;
    country: string;
    timezone: string;
    currency: CurrencySettings;
};

export type FontsSettings = {
    myFonts: unknown[];
    set: unknown[];
};

export type BrandingSettings = {
    fonts: FontsSettings;
    seoFavicon: unknown | null;
    myColors: { colors: unknown[]; gradients: unknown[] };
    copyright: string;
    blockAnimation: { show: number | null; style: string | null };
    smoothingScroll: { enabled: number };
    adaptiveView: number | boolean;
};

export type SeoSettings = {
    robotsTxt: string;
    meta: string;
    canonical: number;
    trailingSlash: string;
};

export type PrivacySettings = {
    cookiesWarning: Record<string, unknown>;
    policyPersonalData: { show: number; file: string };
};

export type PerformanceSettings = {
    images: Record<string, unknown>;
    optimization: Record<string, unknown>;
    injectCode: { head: string; body: string };
};

export type EcommerceSettings = {
    delivery: unknown[];
    pickups: unknown[];
    tax: Record<string, unknown>;
    reserve: Record<string, unknown>;
    cart: Record<string, unknown>;
    pricelessRule: Record<string, unknown>;
    outOfStockAction: string;
    outOfStockStatus: string;
    inStockStatus: string;
    zeroPrice: string;
};

export type SecuritySettings = {
    flood: Record<string, unknown>;
    googleMapsApiKey: string;
    yandexMapsApiKey: string;
};

export type NotificationsSettings = {
    email: Array<{ id: string; email: string }>;
    notify: unknown[];
    emailSendUtm: number | boolean;
    telegramSendUtm: boolean;
    maxSendUtm: boolean;
    /** @deprecated SMS module removed; kept for group_data compatibility */
    sms: unknown[];
    /** @deprecated SMS module removed; kept for group_data compatibility */
    smsLight: boolean;
    visitorMail: Record<string, unknown>;
};

export type PlatformSettings = {
    ai: Record<string, unknown>;
    /** Includes hooks and opaque fields such as hash */
    api: Record<string, unknown>;
    /** Legacy payment provider map keyed by provider id (tinkoff, cash, …) */
    pays: Record<string, unknown>;
};

export type SiteSettings = {
    locale: LocaleSettings;
    branding: BrandingSettings;
    seo: SeoSettings;
    privacy: PrivacySettings;
    performance: PerformanceSettings;
    ecommerce: EcommerceSettings;
    security: SecuritySettings;
    notifications: NotificationsSettings;
    platform: PlatformSettings;
};

type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends (infer U)[]
        ? U[]
        : T[K] extends object | null
            ? DeepPartial<NonNullable<T[K]>> | null
            : T[K];
};

/**
 * Partial patch for site settings.
 * Array fields in PATCH are full replace.
 */
export type UpdateSiteSettingsParams = DeepPartial<SiteSettings>;
