import { TestBed, inject } from '@angular/core/testing';
import { Article } from '../../core';
import { RouterModule } from '@angular/router';
import { ArticleItemComponent } from './article-item.component';
import { CommonModule, APP_BASE_HREF } from '@angular/common';

describe('Article item Component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterModule
      ],
      declarations: [ArticleItemComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
  });

  it('should render article ', inject([], () => {

    const fixture = TestBed.createComponent(ArticleItemComponent);
    fixture.whenStable().then(() => {

      const component = fixture.componentInstance as ArticleItemComponent;
      const title = 'article title';
      component.articleItem = <Article>{ title };

      fixture.detectChanges();

      const elm: HTMLElement = fixture.nativeElement;
      expect(elm.querySelector('.article-title').textContent.trim()).toEqual(title);
    });

  }));

  it('should get random tag style', inject([], () => {
    const fixture = TestBed.createComponent(ArticleItemComponent);
    fixture.whenStable().then(() => {
      const articleItemComponent = fixture.componentInstance as ArticleItemComponent;
      articleItemComponent.articleItem = <Article>{};
      expect(articleItemComponent.getTagStyle(1)).not.toBeUndefined();
    });

  }));

});
