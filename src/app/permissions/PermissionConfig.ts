import { StorageType } from 'rebirth-storage/';

export class AuthTokenConfig {
  tokenHeader = 'Authorization';
  tokenPrefix = '';

  getToken(token): string {
    return tokenPrefix ? `${this.tokenPrefix.trim()} ${token}` : token;
  }
}

export class PermissionConfig {
  loginPage?: string;
  storageType?: StorageType;
  auth?: AuthTokenConfig;
}
;

