import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthorizationService } from './Authorization.service';
import { Router } from '@angular/router';
import { PermissionConfig } from './PermissionConfig';


@Injectable()
export class AuthRolePermission implements CanActivate {

    constructor(private authorizationService: AuthorizationService,
                private router: Router,
                private permissionConfig: PermissionConfig) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        const hasRight = this.authorizationService.hasRight((<any>route.data).roles);
        const loginPage = this.permissionConfig.loginPage;
        if (!hasRight && loginPage) {
            this.router.navigateByUrl(loginPage);
        }

        return hasRight;
    }

}

