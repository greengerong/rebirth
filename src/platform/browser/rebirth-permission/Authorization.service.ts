import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StorageType, StorageService } from  'rebirth-storage';
import { PermissionConfig } from './PermissionConfig';

const isBlank = (obj) => {
  return obj === null || obj === undefined;
};

@Injectable()
export class AuthorizationService {
  private static STORAGE_POOL_KEY = "rebirth-authorization";
  private static STORAGE_KEY = "current-user";
  private storageType: StorageType;
  private currentUser: any;

  constructor(private storageService: StorageService,
              private permissionConfig: PermissionConfig) {
    this.storageType = isBlank(permissionConfig.storageType) ?
      StorageType.localStorage : permissionConfig.storageType;
  }

  setStorageType(storageType: StorageType) {
    this.storageType = storageType;
  }

  setCurrentUser(currentUser: any): void {
    this.storageService.put({
      pool: AuthorizationService.STORAGE_POOL_KEY,
      key: AuthorizationService.STORAGE_KEY,
      storageType: this.storageType
    }, currentUser);

    this.currentUser = currentUser;
  }

  getCurrentUser(): any {
    if (this.currentUser) {
      return this.currentUser;
    }

    return this.currentUser = this.storageService.get({
      pool: AuthorizationService.STORAGE_POOL_KEY,
      key: AuthorizationService.STORAGE_KEY,
      storageType: this.storageType
    });
  }

  logout() {
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

    return this.currentUser.roles && roles.some(role => this.currentUser.roles.indexOf(role) !== -1);
  }
}
