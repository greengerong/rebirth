import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLinkActive, Router } from '@angular/router';
import { DropdownDirective } from 'common';
import { AuthorizationService, PermissionConfig } from 'rebirth-permission';

@Component({
  selector: 'manage-navbar',
  providers: [],
  directives: [DropdownDirective, RouterLinkActive],
  pipes: [],
  styles: [require('./manage-navbar.scss')],
  template: require('./manage-navbar.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageNavbarComponent {
  private showNavBar: boolean;

  constructor(private authorizationService: AuthorizationService,
              private router: Router,
              private  permissionConfig: PermissionConfig) {
  }

  toggleNavBarState($event: Event) {
    $event.stopPropagation();
    this.showNavBar = !this.showNavBar;
  }

  hideNavBar($event: Event) {
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
