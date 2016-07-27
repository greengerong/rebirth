import { Component, Input } from '@angular/core';
import { Article } from 'common';

@Component({
  selector: 'article-item',
  styles: [require('./article-item.scss')],
  template: require('./article-item.html')
})
export class ArticleItemComponent {

  @Input() articleItem: Article = <Article> {};

}
