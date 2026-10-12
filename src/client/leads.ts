import type { ApiClient } from './api-client';
import type {
    ApplyLeadPromotionParams,
    Lead,
    LeadListResponse,
    LeadReservationListResponse,
    ListLeadsParams,
    ReplaceLeadProductsParams,
    SetLeadShippingParams,
    UpdateLeadParams,
} from '../types/leads';

export class Leads {
    constructor(
        private readonly api: ApiClient,
        private readonly siteId: number
    ) {}

    /** Filtered page of leads. Deleted leads stay hidden unless `showDeleted` is set. */
    async list(params?: ListLeadsParams): Promise<LeadListResponse> {
        const response = await this.api.get<LeadListResponse>(
            `/sites/${ this.siteId }/leads`,
            { params: toListQuery(params) }
        );

        return response.data;
    }

    /** One lead card. */
    async get(leadId: number): Promise<Lead> {
        const response = await this.api.get<Lead>(`/sites/${ this.siteId }/leads/${ leadId }`);

        return response.data;
    }

    /** Status, read flag, note, contacts and payment status. Products stay on the order calls. */
    async update(leadId: number, data: UpdateLeadParams): Promise<Lead> {
        const response = await this.api.patch<Lead>(`/sites/${ this.siteId }/leads/${ leadId }`, data);

        return response.data;
    }

    /** Same fields as `update`, applied to each id. */
    async updateMany(ids: number[], data: UpdateLeadParams): Promise<LeadListResponse> {
        const response = await this.api.post<LeadListResponse>(
            `/sites/${ this.siteId }/leads/bulk`,
            { ids, ...data }
        );

        return response.data;
    }

    /** Soft-delete: the row stays, status becomes `deleted`. */
    async remove(leadId: number): Promise<Lead> {
        const response = await this.api.delete<Lead>(`/sites/${ this.siteId }/leads/${ leadId }`);

        return response.data;
    }

    /** Replace products. Totals ignore the stored tax snapshot. */
    async replaceProducts(leadId: number, data: ReplaceLeadProductsParams): Promise<Lead> {
        const response = await this.api.put<Lead>(`/sites/${ this.siteId }/leads/${ leadId }/products`, data);

        return response.data;
    }

    /** Apply a catalog discount or promocode. Repeating the same id does not consume the limit again. */
    async applyPromotion(leadId: number, data: ApplyLeadPromotionParams): Promise<Lead> {
        const response = await this.api.post<Lead>(`/sites/${ this.siteId }/leads/${ leadId }/promotions`, data);

        return response.data;
    }

    /** Remove the discount or the promocode. A promocode limit is restored. */
    async removePromotion(leadId: number, type: 'discount' | 'promocode'): Promise<Lead> {
        const response = await this.api.delete<Lead>(`/sites/${ this.siteId }/leads/${ leadId }/promotions/${ type }`);

        return response.data;
    }

    /** Set shipping. The payment total includes the stored tax snapshot. */
    async setShipping(leadId: number, data: SetLeadShippingParams): Promise<Lead> {
        const response = await this.api.post<Lead>(`/sites/${ this.siteId }/leads/${ leadId }/shipping`, data);

        return response.data;
    }

    /** Reserve every product line. A second call returns the current rows and does not reserve more. */
    async createReservations(leadId: number): Promise<LeadReservationListResponse> {
        const response = await this.api.post<LeadReservationListResponse>(
            `/sites/${ this.siteId }/leads/${ leadId }/reservations`
        );

        return response.data;
    }

    /** Release every reservation on the lead and return the pieces to stock. */
    async removeReservations(leadId: number): Promise<LeadReservationListResponse> {
        const response = await this.api.delete<LeadReservationListResponse>(
            `/sites/${ this.siteId }/leads/${ leadId }/reservations`
        );

        return response.data;
    }

    /** Top reservations up to the quantities stored on the lead. */
    async refillReservation(reservationId: number): Promise<LeadReservationListResponse> {
        const response = await this.api.put<LeadReservationListResponse>(
            `/sites/${ this.siteId }/reservations/${ reservationId }`
        );

        return response.data;
    }
}

function toListQuery(params?: ListLeadsParams): Record<string, string | number | boolean> {
    if (!params) {
        return {};
    }

    const query: Record<string, string | number | boolean> = {};

    assign(query, 'page', params.page);
    assign(query, 'limit', params.limit);
    assign(query, 'showDeleted', params.showDeleted);
    assignSorting(query, params.sorting);
    assign(query, 'filter[LeadStatus]', params.status);
    assign(query, 'filter[PaymentStatus]', params.paymentStatus);
    assignRead(query, params.isRead);
    assign(query, 'filter[ClientNameContains]', params.clientName);
    assign(query, 'filter[ClientEmailContains]', params.clientEmail);
    assign(query, 'filter[ClientPhoneContains]', params.clientPhone);
    assign(query, 'filter[DateFrom]', params.dateFrom);
    assign(query, 'filter[DateTo]', params.dateTo);
    assign(query, 'filter[numberMin]', params.numberMin);
    assign(query, 'filter[numberMax]', params.numberMax);
    assign(query, 'filter[amountMin]', params.amountMin);
    assign(query, 'filter[amountMax]', params.amountMax);

    return query;
}

function assign(query: Record<string, string | number | boolean>, key: string, value: string | number | boolean | undefined): void {
    if (value !== undefined) {
        query[key] = value;
    }
}

function assignRead(query: Record<string, string | number | boolean>, isRead: boolean | undefined): void {
    if (isRead === undefined) {
        return;
    }

    query['filter[Read]'] = isRead ? '1' : '0';
}

function assignSorting(query: Record<string, string | number | boolean>, sorting: string | undefined): void {
    if (!sorting) {
        return;
    }

    const [field, direction] = sorting.split(':');

    query[`sorting[${ field || 'date' }]`] = (direction || 'DESC').toUpperCase();
}
