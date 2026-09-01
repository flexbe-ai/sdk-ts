export type AuthMe =
  | {
      authType: 'session';
      userId: number;
  }
  | {
      authType: 'apiKey';
      scope: 'site';
      siteId: number;
      accountId: number | null;
  }
  | {
      authType: 'apiKey';
      scope: 'account';
      accountId: number;
  };
