import { TestComponentBuilder } from '@angular/compiler/testing';
import { Component, provide } from '@angular/core';
import {
  beforeEachProviders,
  describe,
  inject,
  injectAsync,
  it
} from '@angular/core/testing';

// Load the implementations that should be tested
import { AboutComponent } from './about.component';

describe('About', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    AboutComponent
  ]);

  it('should log ngOnInit', inject([ AboutComponent ], (about) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    about.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
