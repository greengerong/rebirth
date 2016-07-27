import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Article } from "common";
import keyword = ts.ScriptElementKind.keyword;

@Component({
  selector: 'article-search',
  providers: [],
  directives: [],
  pipes: [],
  styles: [require('./article-search.scss')],
  template: require('./article-search.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleSearchComponent {
  @Input() articles: Article [];
  @Output() searchArticle = new EventEmitter();

  search(keyword): void {
    this.searchArticle.emit(keyword);
  }
}
