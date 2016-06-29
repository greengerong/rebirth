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

console.log(ArticleItemComponent, 'ArticleItemComponent');
// let mockHttp = jasmine.createSpyObj('mockHttp', ['request']);
describe('About Component', () => {
  beforeEachProviders(() => [
    ...GLOBAL_PROVIDERS,
    AboutComponent,
    // provide(Http, {
    //   useValue: mockHttp
    // })
  ]);

  it('should get about me article', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

    tcb.createAsync(AboutComponent)
      .then((fixture) => {
        fixture.detectChanges();
        let elm: HTMLElement = fixture.nativeElement;
        expect(elm.querySelector(".article-title").textContent.trim()).toEqual("破狼简介");
      });

    // let result = <Article>{
    //   title: 'Article title'
    // };
    // let resposne = new Response(new ResponseOptions({ body: JSON.stringify(result) }));
    // mockHttp.request.and.returnValue(Rx.Observable.of(resposne));
    // about.ngOnInit();

    // expect(about.article.title).toEqual('破狼简介');
  })));

});
