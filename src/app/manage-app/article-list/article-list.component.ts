import { Component, OnInit } from "@angular/core";
import { ArticleItemComponent } from "../article-item";
import { ArticleService, Article, SearchResult, PagerComponent } from "common";
import config from 'config';

@Component({
  selector: 'article-list',
  template: require('./article-list.html'),
  styles: [require('./article-list.scss')],
  directives: [ArticleItemComponent, PagerComponent],
  providers: [ArticleService]
})
export class ArticleListComponent implements OnInit {
  private article: SearchResult<Article> = [];

  constructor(private articleService: ArticleService) {
  }


  ngOnInit() {
    this.queryArticles(1);
  }

  private queryArticles(pageIndex: number) {
    this.articleService.getArticles(pageIndex, config.article.pageSize)
      .subscribe((result) => {
        this.article = result;
      });
  }


}
