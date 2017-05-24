import { RouterState } from '@ngrx/router-store';
import { Article, SearchResult } from './core';

export interface AppState {
  router: RouterState;
  articleList: SearchResult<Article>,
  blogAside: SearchResult<Article>,
}
