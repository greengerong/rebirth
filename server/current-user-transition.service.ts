import { LoginService } from '../src/app/core/login/login.service';
import { StateTransition } from 'angular-ssr';
import { Injectable } from '@angular/core';

@Injectable()
export class CurrentUserTransition implements StateTransition<string> {
  constructor(private loginService: LoginService) {
  }

  transition(currentUser: string) {
    this.loginService.setupAuth(currentUser);
  }
}

