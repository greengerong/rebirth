import {
  beforeEachProviders,
  inject,
  it
} from '@angular/core/testing';

import { ArticleItemComponent } from './article-item.component';
import { Article } from '../article-service';

describe('App', () => {
  beforeEachProviders(() => [
    ArticleItemComponent
  ]);

  it('should get random tag style', inject([ArticleItemComponent],
    (articleItemComponent: ArticleItemComponent) => {
      articleItemComponent.articleItem = <Article>{};
      expect(articleItemComponent.getTagStyle(1)).not.toBeUndefined();
    }));

});
