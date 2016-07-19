import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CurrentUser } from  './CurrentUser';
import { StorageType, StorageService } from  'rebirth-storage';
import { Http, RequestOptionsArgs } from '@angular/http';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { PermissionConfig } from './PermissionConfig';

const isBlank = (obj) => {
  return obj === null || obj === undefined;
};

@Injectable()
export class AuthorizationService {
  private static STORAGE_POOL_KEY = "rebirth-authorization";
  private static STORAGE_KEY = "current-user";
  private storageType: StorageType;
  private currentUser: CurrentUser;

  constructor(private storageService: StorageService,
              private http: Http,
              private permissionConfig: PermissionConfig) {
    this.storageType = isBlank(permissionConfig.storageType) ?
      StorageType.localStorage : permissionConfig.storageType;
  }

  setStorageType(storageType: StorageType) {
    this.storageType = storageType;
  }

  setCurrentUser(currentUser: CurrentUser): void {
    this.storageService.put({
      pool: AuthorizationService.STORAGE_POOL_KEY,
      key: AuthorizationService.STORAGE_KEY,
      storageType: this.storageType
    }, currentUser);

    this.currentUser = currentUser;
  }

  getCurrentUser<T extends CurrentUser>(): T {
    if (this.currentUser) {
      return <T>this.currentUser;
    }

    return this.currentUser = <T>this.storageService.get({
      pool: AuthorizationService.STORAGE_POOL_KEY,
      key: AuthorizationService.STORAGE_KEY,
      storageType: this.storageType
    });
  }

  login<T extends CurrentUser>(url: string, body: any, options?: RequestOptionsArgs): Observable<T> {
    return this.http.post(url, body, options)
      .map(res => {
        const user = res.json();
        this.setCurrentUser(user);
        return user;
      });
  }

  logout(url?: string, options?: RequestOptionsArgs): Observable<any> {
    this.clearToken();

    if (url) {
      return this.http.delete(url, options);
    }

    return fromPromise(Promise.resolve(null));
  }

  public clearToken() {
    return this.storageService.remove({
      pool: AuthorizationService.STORAGE_POOL_KEY,
      key: AuthorizationService.STORAGE_KEY,
      storageType: this.storageType
    });
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
}
