import { Component } from '@angular/core';
import { AuthorizationService } from 'rebirth-permission';
import { RebirthHttpProvider } from 'rebirth-http';
import { CurrentUser } from './login/current-user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'manage-app',
  styleUrls: [
    './manage-app.scss'
  ],
  templateUrl: './manage-app.html'
})
export class ManageAppComponent {
  constructor(authorizationService: AuthorizationService,
              router: Router,
              rebirthHttpProvider: RebirthHttpProvider) {
    const currentUser = <CurrentUser>authorizationService.getCurrentUser();
    if (currentUser && currentUser.token) {
      rebirthHttpProvider.headers({ Authorization: currentUser.token });
    }

    rebirthHttpProvider.addResponseErrorInterceptor((err) => {
      if (err.status === 401 && (err.url.indexOf('/manage/login') === -1)) {
        router.navigateByUrl('/manage/login');
      }
    });
  }
}
