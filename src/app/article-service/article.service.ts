import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SearchResult } from './SearchResult';
import { Article } from './article';
import { Observable } from 'rxjs/Observable';
import { Cacheable, StorageType, RebirthHttp, RebirthHttpProvider, BaseUrl, GET, Query, Path } from 'rebirth-common';

@Injectable()
export class ArticleService extends RebirthHttp {

  constructor(http: Http, rebirthHttpProvider: RebirthHttpProvider) {
    super(http, rebirthHttpProvider);
  }

  @Cacheable({ pool: 'articles', storageType: StorageType.memory })
  @GET('article')
  getArticles( @Query('pageIndex') pageIndex = 1,
    @Query('pageSize') pageSize = 10): Observable<SearchResult<Article>> {
    return null;
  }

  @GET('article/:id')
  getArticleByUrl( @Path('id') articleUrl: string): Observable<Article> {
    return null;
  }
}
