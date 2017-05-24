import { Component, OnInit, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { ArticleService, SearchResult, Article, RebirthWindow } from '../../core';
import { environment } from '../../../environments/environment';
import { AppState } from '../../app-state.model';
import { Store } from '@ngrx/store';
import { ArticleListAction } from "./article-list.actions";

@Component({
  selector: 'article-list',
  styleUrls: ['./article-list.scss'],
  templateUrl: './article-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleListComponent implements OnInit {
  @Input() articleList: SearchResult<Article>;

  constructor(private articleService: ArticleService,
              private elmRef: ElementRef,
              private rebirthWindow: RebirthWindow,
              private store: Store<AppState>,
              private articleListAction: ArticleListAction) {

  }

  ngOnInit() {
    this.pageChange(1);
  }

  pageChange(pageIndex) {

    this.articleService.fetchArticles(pageIndex, environment.article.pageSize)
      .subscribe((result) => {
        this.store.dispatch(this.articleListAction.articleList(result));
        this.rebirthWindow.scrollToTop(this.elmRef);
      }, (e) => console.log(e, 'ArticleListComponent error'));
  }

}
