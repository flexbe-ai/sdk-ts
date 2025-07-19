export interface CreateSandboxRequest {
    branch: string;
}

export interface SandboxResponse {
    id: string;
    previewUrl: string;
    controllerUrl: string;
    ideUrl: string;
    token: string;
}
