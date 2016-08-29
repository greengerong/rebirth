import { Component, OnInit } from "@angular/core";
import { ManageArticleItemComponent } from "../manage-article-item";
import { ArticleService, Article, SearchResult, PagerComponent } from "common";
import config from 'config';
import { ArticleSearchComponent } from '../article-search';

@Component({
  selector: 'article-list',
  template: require('./article-list.html'),
  styles: [require('./article-list.scss')],
  directives: [ManageArticleItemComponent, PagerComponent, ArticleSearchComponent],
  providers: [ArticleService]
})
export class ArticleListComponent implements OnInit {
  private article: SearchResult<Article> = <SearchResult<Article>> {};
  private pageIndex = 1;
  private keyword: string;

  constructor(private articleService: ArticleService) {
  }


  ngOnInit() {
    this.queryArticles();
  }

  searchArticle(keyword): void {
    this.keyword = keyword;
    this.pageIndex = 1;
    this.queryArticles();
  }

  pageChange(pageIndex): void {
    this.pageIndex = pageIndex;
    this.queryArticles();
  }

  deleteArticle($index): void {
    if ($index !== -1) {
      this.article.result.splice($index, 1);
    }
  }

  private queryArticles() {
    this.articleService.getArticles(this.pageIndex, config.article.pageSize, this.keyword)
      .subscribe((result) => {
        this.article = result;
      });
  }

}
