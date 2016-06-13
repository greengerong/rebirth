import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response, RequestOptions } from '@angular/http';
import {SearchResult} from './SearchResult';
import {Article} from './article';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class ArticleService {
  constructor(private http: Http) {
  }

  // TODO: 封装自己的http服务
  getArticles(pageIndex: number = 1, pageSize: number = 10): Observable<SearchResult<Article>> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let search = new URLSearchParams();
    search.set('pageSize', pageSize.toString());
    search.set('pageIndex', pageIndex.toString());
    let options = new RequestOptions({ headers, search });
    return this.http.get('http://localhost:8000/api/article', options)
      .map(res => res.json());
  }
  getArticleByUrl(articleUrl: string): Observable<Article> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers });
    return this.http.get(`http://localhost:8000/api/article/${articleUrl}`, options)
      .map(res => res.json());
  }
}
