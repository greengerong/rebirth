import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export interface CurrentUser {
  id: string;
  name: string;
  roles: string[];
}

@Injectable()
export class PermissionsService {
  hasRight(roles: string[]): Observable<boolean> {
    return true;
  }
}

@Injectable()
export class AuthorizationService {

  login<T extends CurrentUser>(loginRequest: any): Observable<T> {
    return null;
  }

  loinout(): Observable<any> {
    return null;
  }

}


@Injectable()
export class ManagePermissions implements CanActivate {

  constructor(private permissionsService: PermissionsService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.permissionsService.hasRight(route.data.roles);
  }

}

export const PERMISSIONS_PROVIDERS: any[] = [
  PermissionsService,
  AuthorizationService,
  ManagePermissions
];
