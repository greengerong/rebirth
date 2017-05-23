import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SearchResult } from './search-result.model';
import { Article } from './article.model';
import { Observable } from 'rxjs/Observable';
import { Cacheable, StorageType } from 'rebirth-storage';
import { RebirthHttp, RebirthHttpProvider, GET, POST, DELETE, Query, Path, Body } from 'rebirth-http';
import { environment } from '../../../environments/environment';
import { SSRStateService } from "../ssr-state";
import 'rxjs/add/operator/do';
import { of } from 'rxjs/observable/of';

export interface IArticleService {

  getArticles(pageIndex, pageSize, keyword?: string): Observable<SearchResult<Article>>;

  getArticleByUrl(articleUrl: string): Observable<Article>;

  updateMarkdown(articleUrl: string, article: Article): Observable<any> ;

  deleteArticle(articleUrl: string): Observable<any> ;
}


@Injectable()
export class OnlineArticleService extends RebirthHttp implements IArticleService {

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

@Injectable()
export class GithubArticleService extends RebirthHttp implements IArticleService {

  constructor(protected http: Http, protected rebirthHttpProvider: RebirthHttpProvider) {
    super();
  }

  getArticles(pageIndex = 1, pageSize = 10, keyword?: string): Observable<SearchResult<Article>> {
    return this.innerGetArticles()
      .map(res => {
        const result = res.result || [];
        const startIndex = (pageIndex - 1 ) * pageSize;
        return {
          pageSize,
          pageIndex,
          total: result.length,
          result: result.slice(startIndex, startIndex + pageSize)
        };
      });
  }

  getArticleByUrl(articleUrl: string): Observable<Article> {
    return this.innerGetArticles()
      .map(res => {
        const result = res.result || [];
        return result.find(item => item.url === articleUrl);
      });
  }

  updateMarkdown(articleUrl: string, article: Article): Observable<any> {
    return null;
  }

  deleteArticle(articleUrl: string): Observable<any> {
    return null;
  }

  @Cacheable({ pool: 'articles' })
  @GET('articles.json')
  private  innerGetArticles(): Observable<SearchResult<Article>> {
    return null;
  }


}

// Use factory service are same;

@Injectable()
export class ArticleService {

  private articleService: IArticleService;

  constructor(githubArticleService: GithubArticleService,
              onlineArticleService: OnlineArticleService,
              private ssrStateService: SSRStateService) {
    this.articleService = environment.deploy === 'github' ? githubArticleService : onlineArticleService;
  }

  getArticles(pageIndex, pageSize, keyword?: string): Observable<SearchResult<Article>> {
    const key = `articles-${pageIndex}--${pageSize}--${keyword}`;

    const state = this.ssrStateService.getState(key);

    if (state) {
      return of(state);
    }

    return this.articleService.getArticles(pageIndex, pageSize, keyword)
      .do((res) => {
        this.ssrStateService.setState(key, res);
      });
  }

  getArticleByUrl(articleUrl: string): Observable<Article> {
    return this.articleService.getArticleByUrl(articleUrl);
  }

  updateMarkdown(articleUrl: string, article: Article): Observable<any> {
    return this.articleService.updateMarkdown(articleUrl, article);
  }

  deleteArticle(articleUrl: string): Observable<any> {
    return this.articleService.deleteArticle(articleUrl);
  }
}


export const REBIRTH_ARTICLE_SERVICE_PROVIDERS: Array<any> = [
  {
    provide: GithubArticleService,
    useClass: GithubArticleService
  },
  {
    provide: OnlineArticleService,
    useClass: OnlineArticleService
  },
  {
    provide: ArticleService,
    useClass: ArticleService
  },
];

