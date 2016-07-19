export class AuthTokenConfig {
  tokenHeader = 'Authorization';
  tokenPrefix = 'Bearer';

  getToken(token): string {
    return tokenPrefix ? `${this.tokenPrefix} ${token}` : token;
  }
}

export class PermissionConfig {
  loginPage: string;
  auth?: AuthTokenConfig;
}
;

