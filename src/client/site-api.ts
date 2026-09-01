import { Files, Images } from './media';
import { Pages } from './pages';
import { Redirects } from './redirects';
import { Sandbox } from './sandbox';
import { Settings } from './settings';
import { Stat } from './stat';

import type { ApiClient } from './api-client';
import type { Site, UpdateSiteParams } from '../types/sites';

export class SiteApi {
    public readonly pages: Pages;
    public readonly redirects: Redirects;
    public readonly sandbox: Sandbox;
    public readonly settings: Settings;
    public readonly stat: Stat;
    public readonly images: Images;
    public readonly files: Files;

    constructor(
        private readonly api: ApiClient,
        private readonly siteId: number
    ) {
        this.pages = new Pages(api, siteId);
        this.redirects = new Redirects(api, siteId);
        this.sandbox = new Sandbox(api, siteId);
        this.settings = new Settings(api, siteId);
        this.stat = new Stat(api, siteId);
        this.images = new Images(api, siteId);
        this.files = new Files(api, siteId);
    }

    public async get(): Promise<Site> {
        const response = await this.api.get<Site>(`/sites/${ this.siteId }`);

        return response.data;
    }

    public async update(patch: UpdateSiteParams): Promise<Site> {
        const response = await this.api.patch<Site>(`/sites/${ this.siteId }`, patch);

        return response.data;
    }
}

