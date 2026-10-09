export enum LeadStatus {
    NEW = 'new',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELED = 'canceled',
    DELETED = 'deleted'
}

export enum LeadPaymentStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    PAID = 'paid',
    ERROR = 'error'
}

export interface LeadMoney {
    value: number;
    unit: string;
    string: string | null;
}

export interface LeadCustomer {
    name: string;
    phone: string;
    email: string | null;
}

export interface LeadFormField {
    id: number | string;
    name: string;
    value: string | null;
    type: string;
}

export interface LeadOrderItem {
    id: string;
    productId: number;
    variantId: number;
    name: string;
    quantity: number;
    price: LeadMoney;
    rowTotal: LeadMoney;
    image: {
        id: number;
        ext: string;
    };
    reservation?: {
        id: number;
        quantity: number;
    } | null;
}

export interface LeadShipping {
    id: string;
    name: string;
    price: LeadMoney;
    isCustomQuote: boolean;
    type: string;
    fields: unknown[];
    address: {
        addressLine1: string;
        addressLine2?: string;
        region: string;
        city: string;
        zipCode: string;
    };
}

/** Snapshot stored on the lead. Not the catalog `Promotion`. */
export interface LeadOrderDiscount {
    id: number;
    type: 'discount' | 'promocode';
    discountType: 'percent' | 'money';
    discountAmount: string;
    deliveryFree: boolean | null;
    code: string | null;
}

export interface LeadPayment {
    id: number;
    amount: LeadMoney;
    status: LeadPaymentStatus;
    paymentProvider: string;
    isTestPayment: boolean;
    description: string | null;
    createdAt: string | null;
    payLink: string | null;
    completedAt?: string;
}

export interface LeadTracking {
    ip: string;
    deviceType: string;
    userAgent: string;
    visitorId: string;
    pageId: number;
}

export interface Lead {
    id: number;
    sequence: number;
    siteId: number;
    status: LeadStatus;
    isRead: boolean;
    formName: string;
    customer: LeadCustomer;
    formFields: LeadFormField[] | null;
    orderItems: LeadOrderItem[] | null;
    orderShipping: LeadShipping | null;
    orderDiscounts: LeadOrderDiscount[] | null;
    payment: LeadPayment | null;
    taxSnapshot: Record<string, unknown> | null;
    notes: string | null;
    custom: Record<string, unknown> | null;
    tracking: LeadTracking | null;
    trackingExtra: Record<string, unknown> | null;
    createdAt: string;
    updatedAt?: string;
}

export interface LeadListResponse {
    list: Lead[];
    pagination: {
        limit: number;
        offset: number;
        total: number;
    };
}

/**
 * CamelCase query. The client sends the admin keys:
 * `filter[LeadStatus]`, `filter[PaymentStatus]`, `filter[Read]`,
 * `filter[ClientNameContains]`, `filter[ClientEmailContains]`, `filter[ClientPhoneContains]`,
 * `filter[DateFrom]`, `filter[DateTo]`, `filter[numberMin]`,
 * `filter[numberMax]`, `filter[amountMin]`, `filter[amountMax]`.
 */
export interface ListLeadsParams {
    page?: number;
    limit?: number;
    showDeleted?: boolean;
    sorting?: string;
    status?: LeadStatus;
    paymentStatus?: LeadPaymentStatus;
    isRead?: boolean;
    clientName?: string;
    clientEmail?: string;
    clientPhone?: string;
    dateFrom?: string;
    dateTo?: string;
    numberMin?: number;
    numberMax?: number;
    amountMin?: number;
    amountMax?: number;
}

/** Fields of one lead. Products, shipping and discounts are separate calls. */
export interface UpdateLeadParams {
    status?: LeadStatus;
    isRead?: boolean;
    notes?: string | null;
    customer?: Partial<LeadCustomer>;
    payment?: {
        status?: LeadPaymentStatus;
        description?: string | null;
    };
}

export interface ReplaceLeadProductsParams {
    items: Array<{
        productId: number;
        variantId: number;
        name: string;
        quantity: number;
        price: number;
    }>;
}

export interface ApplyLeadPromotionParams {
    id: number;
}

export interface SetLeadShippingParams {
    id: string;
    name: string;
    price: number;
    isCustomQuote?: boolean;
    type?: string;
    address?: {
        country?: string;
        region?: string;
        city?: string;
        addressLine1?: string;
        addressLine2?: string;
        zipCode?: string;
    };
}

export interface LeadReservation {
    id: number;
    leadId: number;
    variantId: number;
    quantity: number;
}

export interface LeadReservationListResponse {
    list: LeadReservation[];
}
