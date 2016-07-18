import { Component } from '@angular/core';
import { AuthorizationService } from '../permissions';

@Component({
  selector: 'login',
  pipes: [],
  providers: [],
  directives: [],
  styles: [
    require('./login.scss')
  ],
  template: require('./login.html')
})
export class LoginComponent {

  constructor(private authorizationService: AuthorizationService) {

    // this.authorizationService.setCurrentUser({
    //   id: '111111',
    //   token: '111111111111111111',
    //   name: 'greengerong',
    //   roles: ['Admin']
    // });

  }
}
