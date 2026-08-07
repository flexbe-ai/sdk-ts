import { Pages } from './pages';
import { Sandbox } from './sandbox';
import { Settings } from './settings';
import { Stat } from './stat';

import type { ApiClient } from './api-client';

export class SiteApi {
    public readonly pages: Pages;
    public readonly sandbox: Sandbox;
    public readonly settings: Settings;
    public readonly stat: Stat;

    constructor(
        api: ApiClient,
        siteId: number
    ) {
        this.pages = new Pages(api, siteId);
        this.sandbox = new Sandbox(api, siteId);
        this.settings = new Settings(api, siteId);
        this.stat = new Stat(api, siteId);
    }
}
