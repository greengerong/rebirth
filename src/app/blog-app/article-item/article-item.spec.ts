import { TestBed, async, inject } from '@angular/core/testing';
import { Article } from '../../shared';
import { RouterModule } from '@angular/router';
import { ArticleItemComponent } from './article-item.component';
import { CommonModule } from '@angular/common';

describe('Article item Component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterModule.forRoot(<any>{})
      ],
      declarations: [ArticleItemComponent],
      providers: []
    });
  });

  it('should render article ', async(inject([], () => {

    let fixture = TestBed.createComponent(ArticleItemComponent);
    fixture.whenStable().then(() => {

      let component: ArticleItemComponent = fixture.componentInstance;
      let title = 'article title';
      component.articleItem = <Article>{ title };

      fixture.detectChanges();

      let elm: HTMLElement = fixture.nativeElement;
      expect(elm.querySelector(".article-title").textContent.trim()).toEqual(title);
    });

  })));

  it('should get random tag style', inject([], () => {
    let fixture = TestBed.createComponent(ArticleItemComponent);
    fixture.whenStable().then(() => {
      let articleItemComponent: ArticleItemComponent = fixture.componentInstance;
      articleItemComponent.articleItem = <Article>{};
      expect(articleItemComponent.getTagStyle(1)).not.toBeUndefined();
    });

  }));

});
