import { Component, OnInit } from '@angular/core';
import {ArticleService, Article} from '../article-service';
import {ArticleItem} from '../article-item';
import {Observable} from "rxjs/Observable";
import {RouteParams} from "@angular/router-deprecated";

@Component({
  selector: 'blog-article',
  providers: [ArticleService],
  directives: [ArticleItem],
  pipes: [],
  styles: [require('./blog-article.scss')],
  template: require('./blog-article.html')
})
export class BlogArticle implements OnInit {
  private articleUrl: string;
  private article: Article;
  constructor(private articleService: ArticleService, private routeParams: RouteParams) {
    this.articleUrl = routeParams.get('id');
  }

  ngOnInit() {
    this.articleService.getArticleByUrl(this.articleUrl)
      .subscribe(result => {
        this.article = result;
      });
  }
}
