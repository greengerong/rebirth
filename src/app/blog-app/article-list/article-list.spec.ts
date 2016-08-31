import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ElementRef } from '@angular/core';
import { Http, ConnectionBackend, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { ArticleListComponent } from './article-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RebirthHttpProvider } from 'rebirth-http';
import { Article, SearchResult, REBIRTH_WINDOW_PROVIDERS } from '../../common';

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        RouterModule.forRoot({})
      ],
      declarations: [ArticleListComponent],
      providers: [
        MockBackend,
        BaseRequestOptions,
        RebirthHttpProvider,
        ...REBIRTH_WINDOW_PROVIDERS,
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        {
          provide: ElementRef,
          useValue: new ElementRef(document.body)
        }
      ]
    });

  });


  it('should render article list from service response', async(inject([MockBackend],
    (mockBackend: MockBackend) => {
      mockBackend.connections.subscribe((con: MockConnection) => {
        con.mockRespond(<any>result);
      });

      let fixture = TestBed.createComponent(ArticleListComponent);
      fixture.whenStable().then(() => {
        fixture.detectChanges();

        let elm: HTMLElement = fixture.nativeElement;
        let titleElms = elm.querySelectorAll(".article-title");
        expect(titleElms[0].textContent).toContain('Article title 1');
        expect(titleElms[1].textContent).toContain('Article title 2');
      });

    })));
});
