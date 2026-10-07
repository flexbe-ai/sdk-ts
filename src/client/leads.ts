import type { ApiClient } from './api-client';
import type { LeadReservationListResponse } from '../types/leads';

export class Leads {
    constructor(
        private readonly api: ApiClient,
        private readonly siteId: number
    ) {}

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
