import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService, PermissionConfig } from 'rebirth-permission';

@Component({
  selector: 'manage-navbar',
  styleUrls: ['./manage-navbar.scss'],
  templateUrl: './manage-navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageNavbarComponent {
  showNavBar: boolean;

  constructor(private authorizationService: AuthorizationService,
              private router: Router,
              private  permissionConfig: PermissionConfig) {
  }

  toggleNavBarState($event: Event) {
    $event.stopPropagation();
    this.showNavBar = !this.showNavBar;
  }

  hideNavBar($event?: Event) {
    /* tslint:disable */
    $event && $event.stopPropagation();
    /* tslint:enable */
    this.showNavBar = false;
  }

  logout(): void {
    this.authorizationService.logout();
    this.router.navigateByUrl(this.permissionConfig.loginPage);
  }
}
