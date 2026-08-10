import type { ApiClient } from './api-client';
import type {
    CreateRedirectParams,
    GetRedirectsParams,
    Redirect,
    RedirectKind,
    RedirectListResponse,
    ReplaceRedirectItem,
    UpdateRedirectParams,
} from '../types/redirects';

export class Redirects {
    constructor(
        private readonly api: ApiClient,
        private readonly siteId: number
    ) {}

    /** List redirects for a site. Optionally filter by type. */
    async getRedirects(params?: GetRedirectsParams): Promise<RedirectListResponse> {
        const response = await this.api.get<RedirectListResponse>(this.basePath(), { params });

        return response.data;
    }

    /** Get a single redirect by ID. */
    async getRedirect(redirectId: number): Promise<Redirect> {
        const response = await this.api.get<Redirect>(this.basePath(`/${ redirectId }`));

        return response.data;
    }

    /** Create a redirect. */
    async createRedirect(body: CreateRedirectParams): Promise<Redirect> {
        const response = await this.api.post<Redirect>(this.basePath(), body);

        return response.data;
    }

    /** Patch a redirect. */
    async updateRedirect(redirectId: number, patch: UpdateRedirectParams): Promise<Redirect> {
        const response = await this.api.patch<Redirect>(this.basePath(`/${ redirectId }`), patch);

        return response.data;
    }

    /** Delete a redirect. */
    async deleteRedirect(redirectId: number): Promise<void> {
        await this.api.delete(this.basePath(`/${ redirectId }`));
    }

    /**
     * Replace all redirects of a type. Items without id are created;
     * existing ids omitted from the list are deleted. Array order sets sortIndex.
     */
    async replaceRedirects(
        type: RedirectKind,
        items: ReplaceRedirectItem[]
    ): Promise<RedirectListResponse> {
        const response = await this.api.put<RedirectListResponse>(
            this.basePath(`/${ type }`),
            { items }
        );

        return response.data;
    }

    private basePath(suffix = ''): string {
        return `/sites/${ this.siteId }/redirects${ suffix }`;
    }
}
