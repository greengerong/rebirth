import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './Login.service';
import { BlogFooterComponent, BlogHeaderComponent } from '../../shared';

@Component({
  selector: 'login',
  pipes: [],
  providers: [LoginService],
  directives: [BlogHeaderComponent, BlogFooterComponent],
  styles: [
    require('./login.scss')
  ],
  template: require('./login.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private model: any;
  private error: any;

  constructor(private route: Router, private loginService: LoginService) {
    this.model = {};
  }

  onSubmit(loginForm) {
    this.loginService.login(loginForm.value)
      .subscribe(
        user => this.route.navigateByUrl('/manage/home'),
        error => this.error = error
      );
  };
}
