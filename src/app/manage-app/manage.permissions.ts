import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export interface CurrentUser {
  id: string;
  name: string;
  roles: any[];
}

@Injectable()
export class AuthorizationService {
  private currentUser: CurrentUser;

  setCurrentUser(currentUser: CurrentUser) {
    console.log(currentUser, 'currentUsercurrentUser');
    this.currentUser = currentUser;
  }

  getCurrentUser<T extends CurrentUser>(): T {
    return <T>this.currentUser;
  }

  hasRight(roles: any | any[]): Observable<boolean>| boolean {

    if (!Array.isArray(roles)) {
      roles = [roles];
    }
    console.log(this.currentUser, '--------', roles);
    return roles.some(role => (this.currentUser || { roles: [] }).roles.indexOf(role) !== -1);
  }
}

@Injectable()
export class ManagePermissions implements CanActivate {

  constructor(private authorizationService: AuthorizationService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return true; //this.authorizationService.hasRight((<any>route.data).roles);
  }

}

export const PERMISSIONS_PROVIDERS: any[] = [
  AuthorizationService,
  ManagePermissions
];
