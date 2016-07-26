import { Component } from '@angular/core';
import { BlogFooterComponent, BlogHeaderComponent } from 'common';
import { ManageNavbarComponent } from './manage-navbar';
import { AuthorizationService } from 'rebirth-permission';
import { RebirthHttpProvider } from 'rebirth-http';
import { CurrentUser } from './login/CurrentUser';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'manage-app',
  pipes: [],
  providers: [],
  directives: [BlogHeaderComponent, BlogFooterComponent, ManageNavbarComponent],
  styles: [
    require('./manage-app.scss')
  ],
  template: require('./manage-app.html')
})
export class ManageAppComponent {
  constructor(authorizationService: AuthorizationService,
              router: Router,
              rebirthHttpProvider: RebirthHttpProvider) {
    const currentUser = <CurrentUser>authorizationService.getCurrentUser();
    if (currentUser && currentUser.token) {
      rebirthHttpProvider.headers({ Authorization: currentUser.token });
    }

    rebirthHttpProvider.addResponseErrorInterceptor((err: Response) => {
      if (err.status === 401 && (err.url.indexOf('/manage/login') === -1)) {
        router.navigateByUrl('/manage/login');
        return Observable.empty();
      }

      return Observable.throw(err);
    });
  }
}
