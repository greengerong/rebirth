import { Component, Input } from '@angular/core';
import {ArticleService, SearchResult, Article} from '../article-service';
import {ArticleItem} from '../article-item';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'article-list',
  providers: [ArticleService],
  directives: [ArticleItem],
  pipes: [],
  styles: [require('./article-list.scss')],
  template: require('./article-list.html')
})
export class ArticleList {
  private article: SearchResult<Article>;
  private results: Article[];
  // private  articleRx: Observable<SearchResult<Article>>;
  constructor(private articleService: ArticleService) {

  }

  ngOnInit() {
    this.articleService.getArticles(1, 10)
      .subscribe(result => {
          this.article = result;
      });
  }
}
