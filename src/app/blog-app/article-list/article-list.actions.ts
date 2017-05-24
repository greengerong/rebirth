import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class ArticleListAction {
  static ARTICLE_LIST = '[Article-List]:fetch';
  static RECENTLY_ARTICLE_LIST = '[Article-List]:recently';

  articleList(articleList): Action {
    return {
      type: ArticleListAction.ARTICLE_LIST,
      payload: articleList
    };
  }

  recentlyArticleList(articleList): Action {
    return {
      type: ArticleListAction.RECENTLY_ARTICLE_LIST,
      payload: articleList
    };
  }
}
