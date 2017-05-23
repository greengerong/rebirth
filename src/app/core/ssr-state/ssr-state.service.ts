import { Injectable } from '@angular/core';

@Injectable()
export class SSRStateService {
  storages: { [key: string]: object } = {};
  platform: 'server' | 'browser';

  setState(key, value) {
    if (this.platform === 'server') {
      this.storages[key] = value;
    }
  }

  getState() {
    return this.platform === 'server' ? this.storages : null;
  }


}
