import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-state.model';
import { Observable } from 'rxjs/Observable';
import { SearchResult } from '../../core/article-service/search-result.model';
import { Article } from '../../core/article-service/article.model';

@Component({
  selector: 'home',
  styleUrls: ['./home.scss'],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  articleList: Observable<SearchResult<Article>>;

  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.articleList = this.store.select(s => s.articleList);
  }

}
