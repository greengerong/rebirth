import { Observable } from 'rxjs/Observable';
import { CurrentUser } from './current-user.model';
import { Injectable } from '@angular/core';
import { AuthorizationService } from 'rebirth-permission';
import { RebirthHttpProvider, RebirthHttp, POST, Body } from 'rebirth-http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService extends RebirthHttp {

  constructor(http: HttpClient,
              protected rebirthHttpProvider: RebirthHttpProvider,
              private authorizationService: AuthorizationService) {
    super(http);
  }

  login(loginInfo: { email: string; password: string }): Observable<CurrentUser> {
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
