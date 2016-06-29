import { TestComponentBuilder } from '@angular/compiler/testing';
import { Component, provide } from '@angular/core';
import { Http, ResponseOptions, Response } from '@angular/http';
import { GLOBAL_PROVIDERS} from '../../global.providers';
import { ArticleItemComponent } from '../article-item';
import {
  beforeEachProviders,
  describe,
  inject,
  async,
  it
} from '@angular/core/testing';

import { AboutComponent } from './about.component';

describe('About Component', () => {
  beforeEachProviders(() => [
    ...GLOBAL_PROVIDERS,
    AboutComponent
  ]);

  it('should get about me article', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

    tcb.createAsync(AboutComponent)
      .then((fixture) => {
        fixture.detectChanges();
        let elm: HTMLElement = fixture.nativeElement;
        expect(elm.querySelector(".article-title").textContent.trim()).toEqual("破狼简介");
      });
  })));

});
