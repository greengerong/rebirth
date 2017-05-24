import { SearchResult } from '../../core/article-service/search-result.model';
import { Article } from '../../core/article-service/article.model';
import { Action } from '@ngrx/store';
import { BlogAsideAction } from './blog-aside.actions';

export const initialState: SearchResult<Article> = {
  pageSize: 5,
  pageIndex: 1,
  total: 0,
  result: []
};

export function blogAsideReducer(state: SearchResult<Article> = initialState, action: Action) {

  switch (action.type) {
    case BlogAsideAction.RECENTLY_ARTICLE_LIST:
      return action.payload;
    default:
      return state;

  }
}
