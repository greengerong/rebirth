import { Component, OnInit } from '@angular/core';
import { ManageArticleItemComponent } from '../manage-article-item';
import { ArticleService, Article, SearchResult, PagerComponent } from '../../shared';
import { environment } from 'environments';
import { ArticleSearchComponent } from '../article-search';

@Component({
  selector: 'manage-article-list',
  template: require('./manage-article-list.html'),
  styles: [require('./manage-article-list.scss')],
  directives: [ManageArticleItemComponent, PagerComponent, ArticleSearchComponent],
  providers: [ArticleService]
})
export class ManageArticleListComponent implements OnInit {
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
    this.articleService.getArticles(this.pageIndex, environment.article.pageSize, this.keyword)
      .subscribe((result) => {
        this.article = result;
      });
  }

}
