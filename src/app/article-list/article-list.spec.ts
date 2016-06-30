import { TestComponentBuilder } from '@angular/compiler/testing';
import { ElementRef } from '@angular/core';
import { GLOBAL_PROVIDERS } from '../../global.providers';
import { ArticleService, Article, SearchResult } from '../article-service';
import { beforeEachProviders, describe, inject, async, it } from '@angular/core/testing';
import * as Rx from 'rxjs';
import { ArticleListComponent } from './article-list.component';

describe('Article list Component', () => {
  let result = <SearchResult<Article>>{
    pageSize: 10,
    pageIndex: 1,
    result: [
      {
        title: 'Article title 1'
      },
      {
        title: 'Article title 2'
      }
    ]
  };
  let articleService = jasmine.createSpyObj('articleService', ['getArticles']);
  beforeEachProviders(() => [
    {
      provide: ElementRef,
      useValue: new ElementRef(document.body)
    },
    {
      provide: ArticleService,
      useValue: articleService
    },
    ArticleListComponent,
    ...GLOBAL_PROVIDERS,
  ]);

  it('should render article list from service response', async(inject([TestComponentBuilder],
    (tcb: TestComponentBuilder) => {
      articleService.getArticles.and.returnValue(Rx.Observable.of(result));
      tcb.createAsync(ArticleListComponent)
        .then((fixture) => {
          fixture.detectChanges();

          let elm: HTMLElement = fixture.nativeElement;
          let titleElms = elm.querySelectorAll(".article-title");
          expect(titleElms[0].textContent).toContain('Article title 1');
          expect(titleElms[1].textContent).toContain('Article title 2');
        });
    })));
});
