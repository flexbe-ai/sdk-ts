import { Pages } from './pages';
import { Stat } from './stat';

import type { ApiClient } from './api-client';

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
