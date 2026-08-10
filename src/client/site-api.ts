import { Pages } from './pages';
import { Redirects } from './redirects';
import { Sandbox } from './sandbox';
import { Stat } from './stat';

import type { ApiClient } from './api-client';

export class SiteApi {
    public readonly pages: Pages;
    public readonly redirects: Redirects;
    public readonly sandbox: Sandbox;
    public readonly stat: Stat;

    constructor(
        api: ApiClient,
        siteId: number
    ) {
        this.pages = new Pages(api, siteId);
        this.redirects = new Redirects(api, siteId);
        this.sandbox = new Sandbox(api, siteId);
        this.stat = new Stat(api, siteId);
    }
}
