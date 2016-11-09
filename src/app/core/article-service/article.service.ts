import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SearchResult } from './search-result.model';
import { Article } from './article.model';
import { Observable } from 'rxjs/Observable';
import { Cacheable, StorageType } from 'rebirth-storage';
import { RebirthHttp, RebirthHttpProvider, BaseUrl, GET, POST, PUT, DELETE, Query, Path, Body } from  'rebirth-http';

@Injectable()
export class ArticleService extends RebirthHttp {

  constructor(protected http: Http, protected rebirthHttpProvider: RebirthHttpProvider) {
    super();
  }

  @Cacheable({ pool: 'articles' })
  @GET('article')
  getArticles(@Query('pageIndex') pageIndex = 1,
              @Query('pageSize') pageSize = 10,
              @Query('keyword') keyword?: string): Observable<SearchResult<Article>> {
    return null;
  }

  @GET('article/:id')
  getArticleByUrl(@Path('id') articleUrl: string): Observable<Article> {
    return null;
  }

  @POST('article/:id')
  updateMarkdown(@Path('id') articleUrl: string, @Body article: Article): Observable<any> {
    return null;
  }

  @DELETE('article/:id')
  deleteArticle(@Path('id') articleUrl: string): Observable<any> {
    return null;
  }

}
