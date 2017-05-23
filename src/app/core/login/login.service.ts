import { Observable } from 'rxjs/Observable';
import { CurrentUser } from '../../manage-app/login/current-user.model';
import { Injectable } from '@angular/core';
import { AuthorizationService } from 'rebirth-permission';
import { RebirthHttpProvider, RebirthHttp, POST, Body } from 'rebirth-http';
import { Http } from '@angular/http';
import { CookieService } from '../';

@Injectable()
export class LoginService extends RebirthHttp {

  constructor(protected  http: Http,
              protected rebirthHttpProvider: RebirthHttpProvider,
              private authorizationService: AuthorizationService,
              private cookieService: CookieService) {
    super();
  }

  login(loginInfo: { email: string; password: string }): Observable<CurrentUser> {

    return this.innerLogin(loginInfo)
      .map(user => {
        this.setupAuth(user);
        return user;
      });
  }

  setupAuth(user) {
    this.authorizationService.setCurrentUser(user);
    this.cookieService.set('currentUser', JSON.stringify(user));
    this.rebirthHttpProvider.headers({ Authorization: user.token });
  }


  logout(): void {
    this.authorizationService.logout();
  }

  @POST('login')
  private innerLogin(@Body body): Observable<CurrentUser> {
    return null;
  }


}
