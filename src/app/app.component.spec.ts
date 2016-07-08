import {
  addProviders
  inject,
  it
} from '@angular/core/testing';
import { ViewContainerRef } from '@angular/core';
import { AppComponent } from './app.component';
import { RebirthHttpProvider } from 'rebirth-common';
import { LoadService } from './loading';

describe('App', () => {
  beforeEach(() => addProviders([
    AppComponent,
    { provide: ViewContainerRef, useValue: {} },
    RebirthHttpProvider,
    LoadService
  ]));

  it('should init http interceptors', inject([AppComponent, RebirthHttpProvider],
    (appComponent, rebirthHttpProvider: RebirthHttpProvider) => {
      expect(rebirthHttpProvider.getInterceptors().length).toEqual(3);
    }));

});
