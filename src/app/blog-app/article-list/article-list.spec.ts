import { TestBed, inject } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { ArticleListComponent } from './article-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { RebirthHttpProvider } from 'rebirth-http';
import {
  Article,
  SearchResult,
  REBIRTH_WINDOW_PROVIDERS,
  REBIRTH_ARTICLE_SERVICE_PROVIDERS
} from '../../core';
import { BlogAppModule } from '../blog-app.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('Article list Component', () => {
  const result = <SearchResult<Article>>{
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
        HttpClientTestingModule,
        BlogAppModule
      ],
      declarations: [],
      providers: [
        RebirthHttpProvider,
        ...REBIRTH_WINDOW_PROVIDERS,
        {
          provide: ElementRef,
          useValue: new ElementRef(document.body)
        },
        ...REBIRTH_ARTICLE_SERVICE_PROVIDERS
      ]
    });

  });


  fit('should render article list from service response', inject([HttpTestingController],
    (httpMock: HttpTestingController) => {

      const fixture = TestBed.createComponent(ArticleListComponent);
      fixture.whenStable().then(() => {
        httpMock.match(req2 => {
          console.log(req2.url);
          return false;
        });

        const req = httpMock.expectOne('article');
        req.flush(result);
        fixture.detectChanges();

        const elm: HTMLElement = fixture.nativeElement;
        const titleElms = elm.querySelectorAll('.article-title');
        expect(titleElms[0].textContent).toContain('Article title 1');
        expect(titleElms[1].textContent).toContain('Article title 2');
      });

    })
  )
  ;
})
;
