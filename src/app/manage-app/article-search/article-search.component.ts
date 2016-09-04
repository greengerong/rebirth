import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter, OnDestroy } from '@angular/core';
import { Article } from '../../shared';

@Component({
  selector: 'article-search',
  styleUrls: ['./article-search.scss'],
  templateUrl: './article-search.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleSearchComponent implements OnDestroy {
  @Input() articles: Article [];
  @Output() searchArticle = new EventEmitter();

  ngOnDestroy(): void {
    this.searchArticle.complete();
  }

  search(keyword): void {
    if (keyword) {
      this.searchArticle.emit(keyword);
    }
  }
}
