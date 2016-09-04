import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'login',
  styleUrls: [
    './login.scss'
  ],
  templateUrl: './login.fb.html',
  changeDetection: ChangeDetectionStrategy.OnPush
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
