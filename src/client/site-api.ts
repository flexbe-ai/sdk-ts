import { Files, Images } from './media';
import { Pages } from './pages';
import { Redirects } from './redirects';
import { Sandbox } from './sandbox';
import { Settings } from './settings';
import { Stat } from './stat';

import type { ApiClient } from './api-client';

export class SiteApi {
    public readonly pages: Pages;
    public readonly redirects: Redirects;
    public readonly sandbox: Sandbox;
    public readonly settings: Settings;
    public readonly stat: Stat;
    public readonly images: Images;
    public readonly files: Files;

    constructor(
        api: ApiClient,
        siteId: number
    ) {
        this.pages = new Pages(api, siteId);
        this.redirects = new Redirects(api, siteId);
        this.sandbox = new Sandbox(api, siteId);
        this.settings = new Settings(api, siteId);
        this.stat = new Stat(api, siteId);
        this.images = new Images(api, siteId);
        this.files = new Files(api, siteId);
    }
}
