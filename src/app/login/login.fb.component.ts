import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import config from 'config';
import { AuthorizationService } from 'rebirth-permission';

@Component({
  selector: 'login',
  pipes: [],
  providers: [],
  directives: [],
  styles: [
    require('./login.scss')
  ],
  template: require('./login.fb.html')
})
export class LoginComponent {
  private error: any;
  private loginForm: FormGroup;

  constructor(fb: FormBuilder, private authorizationService: AuthorizationService, private route: Router) {
    this.loginForm = fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  onSubmit() {
    this.authorizationService.login(`${config.api.host}/login`, this.loginForm.value)
      .subscribe(
        user => this.route.navigateByUrl('/manage/home'),
        error => this.error = error
      );
  };
}
