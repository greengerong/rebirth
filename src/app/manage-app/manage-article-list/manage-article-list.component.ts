import { Component, OnInit } from '@angular/core';
import { ArticleService, Article, SearchResult } from '../../core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'manage-article-list',
  templateUrl: './manage-article-list.html',
  styleUrls: ['./manage-article-list.scss'],
})
export class ManageArticleListComponent implements OnInit {
   article: SearchResult<Article> = <SearchResult<Article>> {};
   pageIndex = 1;
   keyword: string;

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
    this.articleService.fetchArticles(this.pageIndex, environment.article.pageSize, this.keyword)
      .subscribe((result) => {
        this.article = result;
      });
  }

}
