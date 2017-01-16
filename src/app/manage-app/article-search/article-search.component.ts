import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { Article } from '../../core';
import { MdEditorComponent } from '../md-editor/md-editor.component';

@Component({
  selector: 'article-search',
  styleUrls: ['./article-search.scss'],
  templateUrl: './article-search.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleSearchComponent implements OnDestroy {
  @Input() articles: Article [];
  @Output() searchArticle = new EventEmitter();
  keyword: string;

  ngOnDestroy(): void {
    this.searchArticle.complete();
  }

  search(keyword): void {
    if (keyword) {
      this.searchArticle.emit(keyword);
    }
  }
}
