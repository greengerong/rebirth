import { StateReader } from 'angular-ssr';
import { Injectable } from '@angular/core';

@Injectable()
export class RebirthStateReader implements StateReader<any> {
  constructor() {
  }

  getState(): Promise<any> {
    return Promise.resolve({
      a: 1
    });
  }
}
