import { Injectable } from '@angular/core';
import { Article } from '../article-service';
import { Observable }     from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Injectable()
export class AboutService {

  getArticle(): Observable<Article> {
    const article = new Article();
    article.title = '破狼简介';
    article.categories = ['破狼', '简介'];
    article.layout = 'post';
    article.html = require('./polang.html');
    return fromPromise(Promise.resolve(article));
  }
}
