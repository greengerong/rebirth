import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Article } from '../article-service';

@Component({
  selector: 'article-item',
  providers: [],
  directives: [],
  pipes: [],
  styles: [require('./article-item.scss')],
  template: require('./article-item.html'),
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ArticleItemComponent {
  private static TAG_CLOUD_STYLE: string[] = ['primary', 'success', 'info', 'warning', 'danger'];
  @Input() private articleItem: Article;

  getTagStyle(tagIndex) {
    let index = Math.floor(((tagIndex + 1) * Math.random() * 100)) % ArticleItemComponent.TAG_CLOUD_STYLE.length;
    return ArticleItemComponent.TAG_CLOUD_STYLE[index];
  }
}
