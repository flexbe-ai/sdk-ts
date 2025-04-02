import { ApiClient } from './api-client';
import { Pages } from './pages';

export class SiteApi {
    public readonly pages: Pages;

    constructor(
        api: ApiClient,
        siteId: number
    ) {
        this.pages = new Pages(api, siteId);
    }
}