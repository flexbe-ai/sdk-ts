import type { ApiClient } from './api-client';
import type { AbTest, CreateAbTestRequest } from '../types/stat';

export class Stat {
    constructor(
        private readonly api: ApiClient,
        private readonly siteId: number
    ) {}

    async getAbTest(testId: number): Promise<AbTest> {
        const response = await this.api.get<AbTest>(`/sites/${ this.siteId }/stat-abtests/${ testId }`);
        return response.data;
    }

    async createAbTest(pageId: number): Promise<AbTest> {
        const request: CreateAbTestRequest = { pageId };
        const response = await this.api.post<AbTest>(`/sites/${ this.siteId }/stat-abtests`, request);
        return response.data;
    }
}
