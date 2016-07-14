import { Component } from '@angular/core';
import { BlogFooterComponent } from '../blog-footer';
import { BlogHeaderComponent } from '../blog-header';
import { Role } from './manage.routes';
import { AuthorizationService } from './manage.permissions';

@Component({
  selector: 'manage-app',
  pipes: [],
  providers: [],
  directives: [BlogHeaderComponent, BlogFooterComponent],
  styles: [
    require('./manage-app.scss')
  ],
  template: require('./manage-app.html')
})
export class ManageAppComponent {

  constructor(private authorizationService: AuthorizationService) {
    console.log('manage -app');
    authorizationService.setCurrentUser({
      id: '111111',
      name: 'greengerong',
      roles: [Role.Admin]
    });
  }
}
