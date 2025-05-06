import { JwtToken, TokenResponse, UnauthorizedException } from '../types';

const TOKEN_STORAGE_KEY = 'flexbe_jwt_token';
const TOKEN_REFRESH_THRESHOLD = 5*60*1000; // update token 5 minutes before expiration

interface JwtPayload {
    sub: number;
    type: string;
    sessionId: number;
    iat: number;
    exp: number;
}

export class TokenManager {
    private static instance: TokenManager;
    private tokenPromise: Promise<void> | null = null;

    public static getInstance(): TokenManager {
        if (!TokenManager.instance) {
            TokenManager.instance = new TokenManager();
        }
        return TokenManager.instance;
    }

    public async getToken(): Promise<string | null> {
        const token = this.getStoredToken();
        if (token && token.expiresAt > Date.now()) {
            // TODO check if token expire less that 1 minute
            // if so, retrieve a new token
            if (token.expiresAt - Date.now() < TOKEN_REFRESH_THRESHOLD) {
                void this.retrieveToken();
            }

            return token.accessToken;
        }

        await this.retrieveToken();
        const retrievedToken = this.getStoredToken();
        return retrievedToken?.accessToken ?? null;
    }

    public async revokeToken(): Promise<void> {
        const token = this.getStoredToken();
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
        }
    }

    private getStoredToken(): JwtToken | null {
        if (typeof window === 'undefined') return null;

        const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
        if (!storedToken) {
            return null;
        }

        try {
            const token = JSON.parse(storedToken) as JwtToken;
            return token;
        } catch (error) {
            console.error('getStoredToken: Failed to parse stored token:', error);
            return null;
        }
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
                if (response.status === 401) {
                    throw new UnauthorizedException(errorData.message || response.statusText);
                }
                throw new Error(errorData.message || response.statusText);
            }

            const data = await response.json() as TokenResponse;
            this.setToken(data);
        } catch (error) {
            throw error;
        }
    }

    private setToken(tokenResponse: TokenResponse): void {
        const expiresAt = this.getExpirationFromToken(tokenResponse.accessToken);
        const token: JwtToken = {
            accessToken: tokenResponse.accessToken,
            expiresAt,
        };

        if (typeof window !== 'undefined') {
            localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token));
        }
    }

    private getExpirationFromToken(token: string): number {
        try {
            const [, payload] = token.split('.');
            const decodedPayload = JSON.parse(atob(payload)) as JwtPayload;
            return decodedPayload.exp * 1000; // Convert to milliseconds
        } catch (error) {
            console.error('getExpirationFromToken: Failed to parse token expiration:', error);
            return Date.now() + (4 * 60 * 1000); // Default to 4 minutes if parsing fails
        }
    }

    private clearToken(): void {
        if (typeof window === 'undefined') {
            return;
        }

        localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
}