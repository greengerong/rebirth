import { Component, OnInit } from "@angular/core";
import { ArticleItemComponent } from "../article-item";
import { ArticleService, Article, SearchResult, PagerComponent } from "common";
import config from 'config';
import { ArticleSearchComponent } from '../article-search';

@Component({
  selector: 'article-list',
  template: require('./article-list.html'),
  styles: [require('./article-list.scss')],
  directives: [ArticleItemComponent, PagerComponent, ArticleSearchComponent],
  providers: [ArticleService]
})
export class ArticleListComponent implements OnInit {
  private article: SearchResult<Article> = [];

  constructor(private articleService: ArticleService) {
  }


  ngOnInit() {
    this.queryArticles(1);
  }

  searchArticle(keyword): void {
    this.queryArticles(1, keyword);
  }

  private queryArticles(pageIndex: number, keyword?: any) {
    this.articleService.getArticles(pageIndex, config.article.pageSize, keyword)
      .subscribe((result) => {
        this.article = result;
      });
  }

}
