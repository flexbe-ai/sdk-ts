import type { ApiClient } from './api-client';
import type { CreateSandboxRequest, SandboxResponse } from '../types/sandbox';

export class Sandbox {
    constructor(
        private readonly api: ApiClient,
        private readonly siteId: number
    ) {}

    /**
     * Create or get existing sandbox
     * @param branch - Git branch name for the sandbox
     * @returns Promise with sandbox details including URLs and token
     * @throws {UnauthorizedException} When the API key is invalid or expired
     * @throws {ForbiddenException} When the user does not have permission to access this site
     * @throws {BadRequestException} When the request is invalid or failed to create sandbox
     * @throws {ServerException} When the server encounters an error
     * @throws {TimeoutException} When the request times out
     */
    async create(branch: string): Promise<SandboxResponse> {
        const request: CreateSandboxRequest = { branch };
        const response = await this.api.post<SandboxResponse>(`/sites/${ this.siteId }/app/sandbox`, request);
        return response.data;
    }

    /**
     * Delete sandbox
     * @param sandboxId - The sandbox ID to delete
     * @throws {UnauthorizedException} When the API key is invalid or expired
     * @throws {ForbiddenException} When the user does not have permission to access this site
     * @throws {BadRequestException} When the request is invalid or failed to delete sandbox
     * @throws {NotFoundException} When the sandbox is not found
     * @throws {ServerException} When the server encounters an error
     * @throws {TimeoutException} When the request times out
     */
    async delete(sandboxId: string): Promise<void> {
        await this.api.delete(`/sites/${ this.siteId }/app/sandbox/${ sandboxId }`);
    }
}
