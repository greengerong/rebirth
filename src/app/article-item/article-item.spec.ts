import { TestComponentBuilder } from '@angular/compiler/testing';
import { GLOBAL_PROVIDERS} from '../../global.providers';
import { Article } from '../article-service';
import {
  beforeEachProviders,
  describe,
  inject,
  async,
  it
} from '@angular/core/testing';

import { ArticleItemComponent } from './article-item.component';

describe('About Component', () => {
  beforeEachProviders(() => [
    ...GLOBAL_PROVIDERS,
    ArticleItemComponent
  ]);

  it('should render article ', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

    tcb.createAsync(ArticleItemComponent)
      .then((fixture) => {
        let component: ArticleItemComponent = fixture.componentInstance;
        let title = 'article title';
        component.articleItem = <Article>{ title };
        fixture.detectChanges();
        let elm: HTMLElement = fixture.nativeElement;
        expect(elm.querySelector(".article-title").textContent.trim()).toEqual(title);
      });
  })));

  it('should get random tag style', inject([ArticleItemComponent],
    (articleItemComponent: ArticleItemComponent) => {
      articleItemComponent.articleItem = <Article>{};
      expect(articleItemComponent.getTagStyle(1)).not.toBeUndefined();
    }));

});
