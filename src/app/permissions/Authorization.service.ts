import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from  './User';
import { StorageType, StorageService } from  'rebirth-storage';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { PermissionConfig, AuthTokenConfig } from './PermissionConfig';
import { RebirthHttpProvider } from 'rebirth-http';

const isBlank = (obj) => {
  return obj === null || obj === undefined;
};

@Injectable()
export class AuthorizationService {
  private static STORAGE_POOL_KEY = "rebirth-authorization";
  private static STORAGE_KEY = "current-user";
  private storageType: StorageType;
  private currentUser: User;

  constructor(private storageService: StorageService,
              private http: Http,
              private permissionConfig: PermissionConfig,
              @Optional() private  rebirthHttpProvider: RebirthHttpProvider) {
    this.storageType = isBlank(permissionConfig.storageType) ?
      StorageType.localStorage : permissionConfig.storageType;
  }

  setStorageType(storageType: StorageType) {
    this.storageType = storageType;
  }

  setCurrentUser(currentUser: User): void {
    this.storageService.put({
      pool: AuthorizationService.STORAGE_POOL_KEY,
      key: AuthorizationService.STORAGE_KEY,
      storageType: this.storageType
    }, currentUser);

    this.setRequestTokenHeader(currentUser);
    this.currentUser = currentUser;
  }

  getCurrentUser<T extends User>(): T {
    if (this.currentUser) {
      return <T>this.currentUser;
    }

    return this.currentUser = <T>this.storageService.get({
      pool: AuthorizationService.STORAGE_POOL_KEY,
      key: AuthorizationService.STORAGE_KEY,
      storageType: this.storageType
    });
  }

  login<T extends User>(url: string, body: any, options?: RequestOptionsArgs): Observable<T> {
    return this.http.post(url, body, options)
      .map(res => {
        const user = res.json();
        this.setCurrentUser(user);
        return user;
      });
  }

  logout(url?: string, options?: RequestOptionsArgs): Observable<any> {
    const user = this.clearToken();

    if (url) {
      return this.logoutFromServer(user, url, options);
    }

    return fromPromise(Promise.resolve(null));
  }

  public clearToken() {
    const result = this.getCurrentUser();
    this.storageService.remove({
      pool: AuthorizationService.STORAGE_POOL_KEY,
      key: AuthorizationService.STORAGE_KEY,
      storageType: this.storageType
    });

    this.currentUser = null;
    return result;
  }

  isLogin() {
    return !!this.getCurrentUser();
  }

  hasRight(roles: any | any[]): Observable<boolean>| boolean {
    if (!this.getCurrentUser()) {
      return false;
    }

    if (!Array.isArray(roles)) {
      roles = [roles];
    }

    return roles.some(role => this.currentUser.roles.indexOf(role) !== -1);
  }

  private logoutFromServer(user: User, url: string, options: RequestOptionsArgs) {
    if (user.token) {
      options = options || {
          headers: new Headers()
        };

      const auth: AuthTokenConfig = this.permissionConfig.auth || new AuthTokenConfig();
      options.headers.set(auth.tokenHeader, user.token);
    }

    return this.http.delete(url, options);
  }

  private setRequestTokenHeader(currentUser: User) {
    if (currentUser.token && this.rebirthHttpProvider) {
      const auth: AuthTokenConfig = this.permissionConfig.auth || new AuthTokenConfig();
      const headers = {};
      headers[auth.tokenHeader] = auth.getToken(currentUser.token);
      this.rebirthHttpProvider.headers(headers);
    }
  }
}
