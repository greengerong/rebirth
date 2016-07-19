import { Component } from '@angular/core';
import { AuthorizationService } from '../permissions';
import { Router } from '@angular/router';
import config from 'config';

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
  private model: any;
  private error: any;

  constructor(private authorizationService: AuthorizationService, private route: Router) {
    this.model = {};
  }

  onSubmit() {
    console.log(this.model, '=========');
    this.authorizationService.login(`${config.api.host}/login`, this.model)
      .subscribe(
        user => this.route.navigateByUrl('/manage/home'),
        error => this.error = error
      );
  };
}
