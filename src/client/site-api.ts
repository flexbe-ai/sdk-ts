import { Files, Images } from './media';
import { Pages } from './pages';
import { Sandbox } from './sandbox';
import { Stat } from './stat';

import type { ApiClient } from './api-client';

export class SiteApi {
    public readonly pages: Pages;
    public readonly sandbox: Sandbox;
    public readonly stat: Stat;
    public readonly images: Images;
    public readonly files: Files;

    constructor(
        api: ApiClient,
        siteId: number
    ) {
        this.pages = new Pages(api, siteId);
        this.sandbox = new Sandbox(api, siteId);
        this.stat = new Stat(api, siteId);
        this.images = new Images(api, siteId);
        this.files = new Files(api, siteId);
    }
}
