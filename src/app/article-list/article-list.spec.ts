import { TestComponentBuilder } from '@angular/compiler/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ElementRef } from '@angular/core';
import { GLOBAL_PROVIDERS } from '../../global.providers';
import { Article, SearchResult } from '../article-service';
import { addProviders, inject, async } from '@angular/core/testing';
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

  beforeEach(() => addProviders([
    ...GLOBAL_PROVIDERS,
    MockBackend,
    BaseRequestOptions,
    {
      provide: Http,
      useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    },
    {
      provide: ElementRef,
      useValue: new ElementRef(document.body)
    },
    ArticleListComponent,
  ]));

  it('should render article list from service response', async(inject([TestComponentBuilder, MockBackend],
    (tcb: TestComponentBuilder, mockBackend: MockBackend) => {
      mockBackend.connections.subscribe((con: MockConnection) => {
        con.mockRespond(<any>result);
      });

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
