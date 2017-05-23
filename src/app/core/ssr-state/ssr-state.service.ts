import { Injectable } from '@angular/core';

declare const bootstrapApplicationState: any;

@Injectable()
export class SSRStateService {
  storages: { [key: string]: object } = {};
  platform: 'server' | 'browser' = 'browser';

  setState(key, value) {
    if (this.platform === 'server') {
      this.storages[key] = value;
    }
  }

  getAllStates() {
    return this.platform === 'server' ? this.storages : null;
  }

  getState(key) {
    if (this.platform === 'browser' && bootstrapApplicationState) {
      return bootstrapApplicationState[key];
    }
  }
}

