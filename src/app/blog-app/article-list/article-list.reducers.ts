import { SearchResult } from '../../core/article-service/search-result.model';
import { Article } from '../../core/article-service/article.model';
import { Action } from '@ngrx/store';
import { ArticleListAction } from './article-list.actions';

export const initialState: SearchResult<Article> = {
  pageSize: 10,
  pageIndex: 1,
  total: 0,
  result: []
};

export function fetchArticleListReducer(state: SearchResult<Article> = initialState, action: Action) {

  switch (action.type) {
    case ArticleListAction.ARTICLE_LIST:
      return action.payload;
    default:
      return state;

  }
}
