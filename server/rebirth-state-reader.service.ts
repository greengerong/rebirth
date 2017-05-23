import { StateReader } from 'angular-ssr';
import { Injectable } from '@angular/core';
import { SSRStateService } from '../src/app/core';

@Injectable()
export class RebirthStateReader implements StateReader<any> {
  constructor(private ssrStateService: SSRStateService) {

  }

  getState(): Promise<any> {
    let allStates = this.ssrStateService.getAllStates();
    return Promise.resolve(allStates || {});
  }
}
