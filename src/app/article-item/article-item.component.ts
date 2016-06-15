
import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import {Article} from '../article-service';

@Component({
  selector: 'article-item',
  providers: [],
  directives: [],
  pipes: [],
  styles: [require('./article-item.scss')],
  template: require('./article-item.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleItem {
  @Input() private articleItem: Article;
  private static TAG_CLOUD_STYLE: string[] = ['primary', 'success', 'info', 'warning', 'danger'];

  getTagStyle(tagIndex) {
    return ArticleItem.TAG_CLOUD_STYLE[Math.floor(((tagIndex + 1) * Math.random() * 100)) % ArticleItem.TAG_CLOUD_STYLE.length];
  }
}
