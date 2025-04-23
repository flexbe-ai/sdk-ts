export interface AbTest {
    id: number;
    pageId: number;
    createdAt: string;
    aCountView: number;
    aCountLead: number;
    bCountView: number;
    bCountLead: number;
}

export interface CreateAbTestRequest {
    pageId: number;
}
