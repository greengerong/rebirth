import {
  beforeEachProviders,
  inject,
  it
} from '@angular/core/testing';

import { AppComponent } from './app.component';
import { RebirthHttpProvider } from 'rebirth-common';

describe('App', () => {
  beforeEachProviders(() => [
    AppComponent,
    RebirthHttpProvider
  ]);

  it('should init http interceptors', inject([AppComponent, RebirthHttpProvider],
    (appComponent, rebirthHttpProvider: RebirthHttpProvider) => {
      expect(rebirthHttpProvider.getInterceptors().length).toEqual(3);
    }));

});
