import { StateTransition } from 'angular-ssr';
import { Injectable } from '@angular/core';
import { SSRStateService } from '../src/app/core';

@Injectable()
export class PlatformTransition implements StateTransition<string> {
  constructor(private ssrStateService: SSRStateService) {
  }

  transition(platform: any) {
    this.ssrStateService.platform = platform;
  }
}

