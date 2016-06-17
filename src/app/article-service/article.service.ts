import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response, RequestOptions } from '@angular/http';
import {SearchResult} from './SearchResult';
import {Article} from './article';
import { Observable }     from 'rxjs/Observable';
import { Cacheable, StorageType, RebirthHttp, RebirthHttpInterceptor} from 'rebirth-common';

@Injectable()
export class ArticleService {
  constructor(private http: RebirthHttp) {

  }

  @Cacheable({ pool: 'articles', storageType: StorageType.memory })
  getArticles(pageIndex: number = 1, pageSize: number = 10): Observable<SearchResult<Article>> {

    let search = new URLSearchParams();
    search.set('pageSize', pageSize.toString());
    search.set('pageIndex', pageIndex.toString());
    let options = new RequestOptions({ search });
    return this.http.get('http://localhost:8000/api/article', options);
  }

  getArticleByUrl(articleUrl: string): Observable<Article> {
    return this.http.get(`http://localhost:8000/api/article/${articleUrl}`);
  }
}
