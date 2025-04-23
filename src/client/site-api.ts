import { ApiClient } from './api-client';
import { Pages } from './pages';
import { Stat } from './stat';

export class SiteApi {
    public readonly pages: Pages;
    public readonly stat: Stat;

    constructor(
        api: ApiClient,
        siteId: number
    ) {
        this.pages = new Pages(api, siteId);
        this.stat = new Stat(api, siteId);
    }
}