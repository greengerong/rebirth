import { Component, OnInit, ElementRef } from '@angular/core';
import { ArticleItemComponent } from '../article-item';
import { PagerComponent, ArticleService, SearchResult, Article, RebirthWindow } from '../../shared';
import { environment } from 'environments';

@Component({
  selector: 'article-list',
  styleUrls: ['./article-list.scss'],
  templateUrl: './article-list.html'
})
export class ArticleListComponent implements OnInit {
  private article: SearchResult<Article>;

  constructor(private articleService: ArticleService, private elmRef: ElementRef, private rebirthWindow: RebirthWindow) {

  }

  ngOnInit() {
    this.pageChange(1);
  }

  pageChange(pageIndex) {
    this.articleService.getArticles(pageIndex, environment.article.pageSize)
      .subscribe(result => {
        this.article = result;
        this.rebirthWindow.scrollToTop(this.elmRef);
      }, (e) => console.log(e, 'ArticleListComponent error'));
  }

}
