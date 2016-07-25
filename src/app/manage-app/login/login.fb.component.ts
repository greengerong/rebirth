import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from './Login.service';

@Component({
  selector: 'login',
  pipes: [],
  providers: [LoginService],
  directives: [],
  styles: [
    require('./login.scss')
  ],
  template: require('./login.fb.html')
})
export class LoginComponent {
  private error: any;
  private loginForm: FormGroup;

  constructor(fb: FormBuilder, private loginService: LoginService, private route: Router) {
    this.loginForm = fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  onSubmit() {
    this.loginService.login(this.loginForm.value)
      .subscribe(
        user => this.route.navigateByUrl('/manage/home'),
        error => this.error = error
      );
  };
}
