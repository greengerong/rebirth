import { Component, OnInit } from '@angular/core';
import { ArticleService, SearchResult, Article } from '../../core';
import { AppState } from '../../app-state.model';
import { Store } from '@ngrx/store';
import { BlogAsideAction } from './blog-aside.actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'blog-aside',
  styleUrls: [
    './blog-aside.scss'
  ],
  templateUrl: './blog-aside.html'
})
export class BlogAsideComponent implements OnInit {
  article: Observable<SearchResult<Article>>;

  constructor(private articleService: ArticleService,
              private store: Store<AppState>,
              private blogAsideAction: BlogAsideAction) {

  }


  ngOnInit() {
    this.article = this.store.select((s) => s.blogAside);

    this.articleService.fetchArticles(1, 5)
      .subscribe(result => {
        this.store.dispatch(this.blogAsideAction.recentlyArticleList(result));
      });
  }
}
