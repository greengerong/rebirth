import {Injectable, Inject, Optional} from '@angular/core';
import {Http} from '@angular/http';
import {SearchResult} from './SearchResult';
import {Article} from './article';
import {Observable} from 'rxjs/Observable';
import {Cacheable, StorageType, RebirthHttp, RebirthHttpProvider, BaseUrl, GET, Query, Path} from 'rebirth-common';

@Injectable()
export class ArticleService extends RebirthHttp {

  constructor(@Inject(Http) protected http:Http,
              @Inject(RebirthHttpProvider) @Optional() protected rebirthHttpProvider:RebirthHttpProvider) {
    super(http, rebirthHttpProvider);
  }

  @Cacheable({pool: 'articles', storageType: StorageType.memory})
  @GET('article')
  getArticles(@Query('pageIndex') pageIndex:number = 1,
              @Query('pageSize') pageSize:number = 10):Observable<SearchResult<Article>> {
    return null;
  }

  @GET('article/:id')
  getArticleByUrl(@Path('id') articleUrl:string):Observable<Article> {
    return null;
  }
}
