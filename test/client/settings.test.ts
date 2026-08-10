import { Settings } from '../../src/client/settings';

import type { ApiClient } from '../../src/client/api-client';
import type { SiteSettings } from '../../src/types/site-settings';

describe('Settings', () => {
    const siteId = 42;
    const mockSettings = {
        locale: {
            language: 'en',
            country: 'US',
            timezone: 'UTC',
            currency: {
                code: 'USD',
                symbol: '$',
                data: { code: 'USD', symbol: '$', decimals: 2 },
                format: { str: ':symbol:value', t: ',', d: '.' },
            },
        },
    } as SiteSettings;

    let api: {
        get: jest.Mock;
        patch: jest.Mock;
    };
    let settings: Settings;

    beforeEach(() => {
        api = {
            get: jest.fn(),
            patch: jest.fn(),
        };
        settings = new Settings(api as unknown as ApiClient, siteId);
    });

    it('getSettings calls GET /sites/:siteId/settings and returns response.data', async() => {
        api.get.mockResolvedValue({ data: mockSettings, status: 200, statusText: 'OK' });

        const result = await settings.getSettings();

        expect(api.get).toHaveBeenCalledWith(`/sites/${ siteId }/settings`);
        expect(result).toBe(mockSettings);
    });

    it('updateSettings calls PATCH with body and returns response.data', async() => {
        const patch = { locale: { language: 'ru' } };
        const updated = {
            ...mockSettings,
            locale: { ...mockSettings.locale, language: 'ru' },
        };
        api.patch.mockResolvedValue({ data: updated, status: 200, statusText: 'OK' });

        const result = await settings.updateSettings(patch);

        expect(api.patch).toHaveBeenCalledWith(`/sites/${ siteId }/settings`, patch);
        expect(result).toBe(updated);
    });
});
