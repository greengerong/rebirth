import { Observable } from 'rxjs/Observable';
import { CurrentUser } from './CurrentUser';
import { Injectable } from '@angular/core';
import { AuthorizationService } from 'rebirth-permission';
import { RebirthHttpProvider, RebirthHttp, POST, Body } from 'rebirth-http/dist/index';
import { Http } from '@angular/http';

@Injectable()
export class LoginService extends RebirthHttp {

  constructor(http: Http,
              rebirthHttpProvider: RebirthHttpProvider,
              private authorizationService: AuthorizationService) {
    super({ http, rebirthHttpProvider });
  }

  login(loginInfo: {email: string; password: string }): Observable<CurrentUser> {
    const authorizationService = this.authorizationService;
    const rebirthHttpProvider = this.rebirthHttpProvider;

    return this.innerLogin(loginInfo)
      .map(user => {
        authorizationService.setCurrentUser(user);
        rebirthHttpProvider.headers({ Authorization: user.token });
        return user;
      });
  }


  logout(): void {
    this.authorizationService.logout();
  }

  @POST('login')
  private innerLogin(@Body body): Observable<CurrentUser> {
    return null;
  }


}
