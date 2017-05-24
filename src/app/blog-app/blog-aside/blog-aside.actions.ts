import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class BlogAsideAction {
  static RECENTLY_ARTICLE_LIST = '[Article-List]:recently';

  recentlyArticleList(articleList): Action {
    return {
      type: BlogAsideAction.RECENTLY_ARTICLE_LIST,
      payload: articleList
    };
  }
}
