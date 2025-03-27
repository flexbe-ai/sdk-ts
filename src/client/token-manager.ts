import { JwtToken, TokenResponse } from '../types';

const TOKEN_STORAGE_KEY = 'flexbe_jwt_token';
const REFRESH_THRESHOLD = 0.8; // Refresh when 80% of token lifetime has passed

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
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
            if (storedToken) {
                try {
                    this.token = JSON.parse(storedToken) as JwtToken;
                    if (this.token.expiresAt > Date.now()) {
                        console.log('Reusing stored token:', {
                            expiresIn: `${Math.round((this.token.expiresAt - Date.now()) / 1000)} seconds`,
                            expiresAt: new Date(this.token.expiresAt).toISOString(),
                        });
                        this.startRefreshInterval();
                    } else {
                        this.clearToken();
                    }
                } catch (error) {
                    console.error('Failed to parse stored token:', error);
                    this.clearToken();
                }
            }
        }
    }

    private setupStorageListener(): void {
        if (typeof window !== 'undefined') {
            window.addEventListener('storage', (event) => {
                if (event.key === TOKEN_STORAGE_KEY) {
                    if (event.newValue) {
                        try {
                            const newToken = JSON.parse(event.newValue) as JwtToken;
                            if (newToken.expiresAt > Date.now()) {
                                this.token = newToken;
                                console.log('Token updated from storage:', {
                                    expiresIn: `${Math.round((newToken.expiresAt - Date.now()) / 1000)} seconds`,
                                    expiresAt: new Date(newToken.expiresAt).toISOString(),
                                });
                                this.startRefreshInterval();
                            } else {
                                this.clearToken();
                            }
                        } catch (error) {
                            console.error('Failed to parse token from storage event:', error);
                            this.clearToken();
                        }
                    } else {
                        this.clearToken();
                    }
                }
            });
        }
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

    private startRefreshInterval(): void {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }

        if (this.token) {
            const tokenLifetime = this.token.expiresAt - (this.token.expiresAt - 4 * 60 * 1000); // 4 minutes in milliseconds
            const refreshTime = Math.round(tokenLifetime * REFRESH_THRESHOLD);

            console.log('Setting up token refresh:', {
                tokenLifetime: `${Math.round(tokenLifetime / 1000)} seconds`,
                refreshIn: `${Math.round(refreshTime / 1000)} seconds`,
                refreshAt: new Date(Date.now() + refreshTime).toISOString(),
            });

            this.refreshInterval = window.setInterval(() => {
                this.clearToken();
            }, refreshTime);
        }
    }

    public setToken(tokenResponse: TokenResponse): void {
        const expiresAt = this.getExpirationFromToken(tokenResponse.accessToken);
        this.token = {
            accessToken: tokenResponse.accessToken,
            expiresAt,
        };

        const expiresIn = Math.round((expiresAt - Date.now()) / 1000);
        console.log('New access token obtained:', {
            expiresIn: `${expiresIn} seconds`,
            expiresAt: new Date(expiresAt).toISOString(),
        });

        if (typeof window !== 'undefined') {
            localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(this.token));
        }

        this.startRefreshInterval();
    }

    public getToken(): string | null {
        if (this.token && this.token.expiresAt > Date.now()) {
            return this.token.accessToken;
        }
        this.clearToken();
        return null;
    }

    public clearToken(): void {
        this.token = null;
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
        }
        if (typeof window !== 'undefined') {
            localStorage.removeItem(TOKEN_STORAGE_KEY);
        }
    }
}