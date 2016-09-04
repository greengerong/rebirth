import { Component, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { RebirthWindow, ArticleService, Article } from '../../shared';

@Component({
  selector: 'manage-article-item',
  styleUrls: ['./manage-article-item.scss'],
  templateUrl: './manage-article-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageArticleItemComponent implements OnDestroy {

  @Input() articleItem: Article = <Article> {};
  @Output() deleteArticle = new EventEmitter();

  constructor(private articleService: ArticleService, private rebirthWindow: RebirthWindow) {

  }

  onDeleteArticle() {
    if (this.rebirthWindow.getGlobalObject().confirm(`确认删除${this.articleItem.title}`)) {
      this.articleService.deleteArticle(this.articleItem.url)
        .subscribe(t => this.deleteArticle.emit(this.articleItem));
    }
  }

  ngOnDestroy(): void {
    this.deleteArticle.complete();
  }

}
