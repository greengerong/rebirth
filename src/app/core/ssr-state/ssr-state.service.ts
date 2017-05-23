import { Injectable } from '@angular/core';

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
    let bootstrapApplicationState = (window as any).bootstrapApplicationState;
    if (this.platform === 'browser' && bootstrapApplicationState) {
      return bootstrapApplicationState[key];
    }
  }
}

