import { Component, Input, OnInit } from '@angular/core';
import {ArticleService, SearchResult, Article} from '../article-service';
import {ArticleItem} from '../article-item';
import {Observable} from "rxjs/Observable";
import {Pager} from '../pager';

@Component({
  selector: 'article-list',
  providers: [ArticleService],
  directives: [ArticleItem, Pager],
  pipes: [],
  styles: [require('./article-list.scss')],
  template: require('./article-list.html')
})
export class ArticleList implements OnInit {
  private article: SearchResult<Article>;

  constructor(private articleService: ArticleService) {

  }

  ngOnInit() {
    this.articleService.getArticles(1, 10)
      .subscribe(result => {
        this.article = result;
      });
  }
}
