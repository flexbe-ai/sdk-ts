import { JwtToken, TokenResponse } from '../types';

const TOKEN_STORAGE_KEY = 'flexbe_jwt_token';
const REFRESH_THRESHOLD = 0.8; // Refresh when 80% of token lifetime has passed
const REFRESH_CHECK_INTERVAL = 30 * 1000; // Check every 30 seconds
const MAX_REFRESH_DELAY = 10000; // Maximum random delay of 10 seconds

interface JwtPayload {
    sub: number;
    type: string;
    sessionId: number;
    iat: number;
    exp: number;
}

export class TokenManager {
    private static instance: TokenManager;
    private token: JwtToken | null = null;
    private refreshInterval: number | null = null;
    private refreshTimeout: number | null = null;
    private tokenPromise: Promise<void> | null = null;
    private debug: boolean = false;

    private constructor() {
        this.initializeFromStorage();
        this.setupStorageListener();
    }

    public static getInstance(): TokenManager {
        if (!TokenManager.instance) {
            TokenManager.instance = new TokenManager();
        }
        return TokenManager.instance;
    }

    private initializeFromStorage(): void {
        if (typeof window === 'undefined') return;

        const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
        if (!storedToken) return;

        try {
            this.token = JSON.parse(storedToken) as JwtToken;
            if (this.token.expiresAt > Date.now()) {
                this.logTokenStatus('Token loaded from storage');
                this.startRefreshInterval();
            } else {
                this.clearToken();
            }
        } catch (error) {
            console.error('Failed to parse stored token:', error);
            this.clearToken();
        }
    }

    private setupStorageListener(): void {
        if (typeof window === 'undefined') return;

        window.addEventListener('storage', (event) => {
            if (event.key !== TOKEN_STORAGE_KEY) return;

            if (!event.newValue) {
                this.clearToken();
                void this.retrieveToken();
                return;
            }

            try {
                const newToken = JSON.parse(event.newValue) as JwtToken;
                // Skip if the new token is exactly the same as current token
                if (this.token &&
                    this.token.accessToken === newToken.accessToken &&
                    this.token.expiresAt === newToken.expiresAt) {
                    return;
                }

                if (newToken.expiresAt > Date.now()) {
                    this.token = newToken;
                    this.logTokenStatus('Token updated from storage');
                    this.startRefreshInterval();
                } else {
                    this.clearToken();
                    void this.retrieveToken();
                }
            } catch (error) {
                console.error('Failed to parse token from storage event:', error);
                this.clearToken();
                void this.retrieveToken();
            }
        });
    }

    private getExpirationFromToken(token: string): number {
        try {
            const [, payload] = token.split('.');
            const decodedPayload = JSON.parse(atob(payload)) as JwtPayload;
            return decodedPayload.exp * 1000; // Convert to milliseconds
        } catch (error) {
            console.error('Failed to parse token expiration:', error);
            return Date.now() + (4 * 60 * 1000); // Default to 4 minutes if parsing fails
        }
    }

    public async getToken(): Promise<string | null> {
        const token = this.token;
        if (token && token.expiresAt && token.expiresAt > Date.now()) {
            return token.accessToken;
        }

        await this.retrieveToken();
        return this.token?.accessToken ?? null;
    }

    private async retrieveToken(): Promise<void> {
        if (this.tokenPromise) {
            await this.tokenPromise;
            return;
        }

        this.tokenPromise = this.doRetrieveToken();
        try {
            await this.tokenPromise;
        } finally {
            this.tokenPromise = null;
        }
    }

    private async doRetrieveToken(): Promise<void> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        try {
            const response = await fetch('/oauth/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ grant_type: 'client_credentials' }),
                credentials: 'include',
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: response.statusText })) as { message: string };
                throw new Error(errorData.message || response.statusText);
            }

            const data = await response.json() as TokenResponse;
            this.setToken(data);
        } catch (error) {
            console.error('Failed to retrieve token:', error);
            this.clearToken();

            // Schedule a retry after REFRESH_CHECK_INTERVAL
            setTimeout(() => {
                void this.retrieveToken();
            }, REFRESH_CHECK_INTERVAL);

            throw error;
        }
    }

    private startRefreshInterval(): void {
        this.clearRefreshTimers();

        if (!this.token) return;

        const tokenLifetime = this.token.expiresAt - Date.now();
        const refreshThreshold = Math.round(tokenLifetime * REFRESH_THRESHOLD);
        const timeUntilRefresh = refreshThreshold - (Math.random() * MAX_REFRESH_DELAY);

        this.logTokenStatus('Starting refresh interval', {
            tokenLifetime: `${Math.round(tokenLifetime / 1000)} seconds`,
            refreshThreshold: `${Math.round(refreshThreshold / 1000)} seconds`,
            timeUntilRefresh: `${Math.round(timeUntilRefresh / 1000)} seconds`,
        });
        this.scheduleRefresh(timeUntilRefresh);

        this.refreshInterval = window.setInterval(() => {
            if (!this.token) return;

            const timeUntilExpiry = this.token.expiresAt - Date.now();
            if (timeUntilExpiry <= 0) {
                this.logTokenStatus('Token expired');
                this.clearToken();
                void this.retrieveToken();
                return;
            }

            const refreshThreshold = Math.round(timeUntilExpiry * REFRESH_THRESHOLD);
            if (timeUntilExpiry <= refreshThreshold) {
                this.logTokenStatus('Refreshing token', {
                    timeUntilExpiry: `${Math.round(timeUntilExpiry / 1000)} seconds`,
                    refreshThreshold: `${Math.round(refreshThreshold / 1000)} seconds`,
                });
                this.scheduleRefresh(refreshThreshold - (Math.random() * MAX_REFRESH_DELAY));
            }
        }, REFRESH_CHECK_INTERVAL);
    }

    private scheduleRefresh(delay: number): void {
        if (this.refreshTimeout) {
            window.clearTimeout(this.refreshTimeout);
        }

        this.refreshTimeout = window.setTimeout(() => {
            const token = this.token;
            if (token && token.expiresAt - Date.now() <= token.expiresAt * REFRESH_THRESHOLD) {
                void this.retrieveToken();
            }
        }, delay);
    }

    private clearRefreshTimers(): void {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
        }
        if (this.refreshTimeout) {
            window.clearTimeout(this.refreshTimeout);
            this.refreshTimeout = null;
        }
    }

    private logTokenStatus(message: string, additionalInfo: Record<string, string> = {}): void {
        if (!this.debug) return;

        const token = this.token;
        if (!token) return;

        console.log(message, {
            expiresIn: `${Math.round((token.expiresAt - Date.now()) / 1000)} seconds`,
            expiresAt: new Date(token.expiresAt).toISOString(),
            ...additionalInfo,
        });
    }

    public setToken(tokenResponse: TokenResponse): void {
        const expiresAt = this.getExpirationFromToken(tokenResponse.accessToken);
        this.token = {
            accessToken: tokenResponse.accessToken,
            expiresAt,
        };

        this.logTokenStatus('Token set', {
            expiresAt: new Date(expiresAt).toISOString(),
        });

        if (typeof window !== 'undefined') {
            localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(this.token));
        }

        this.startRefreshInterval();
    }

    public clearToken(): void {
        this.token = null;
        this.clearRefreshTimers();

        if (typeof window !== 'undefined') {
            localStorage.removeItem(TOKEN_STORAGE_KEY);
        }
    }

    public async revokeToken(): Promise<void> {
        const token = this.token;
        this.clearToken();

        if (!token) return;

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000);

            await fetch('/oauth/revoke', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.accessToken}`
                },
                body: JSON.stringify({ token: token.accessToken }),
                credentials: 'include',
                signal: controller.signal,
            });

            clearTimeout(timeoutId);
        } catch (error) {
            console.error('Failed to revoke token:', error);
            // Even if revocation fails, we still want to clear the local token
        }
    }
}