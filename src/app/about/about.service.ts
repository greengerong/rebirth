import { Injectable } from '@angular/core';
import { Article } from '../article-service';
import { Observable }     from 'rxjs/Observable';
import * as Rx from 'rxjs/rx';
// import { Cacheable, StorageType} from 'rebirth-common';

@Injectable()
export class AboutService {

  // @Cacheable({ pool: 'articles', storageType: StorageType.memory })
  getArticle(): Observable<Article> {
    const article = new Article();
    article.title = '破狼简介';
    article.categories = ['破狼', '简介'];
    article.layout = 'post';
    article.html = require('./polang.html');
    return Rx.Observable.of(article);
  }
}
