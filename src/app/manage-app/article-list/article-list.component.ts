import { Component, OnInit } from "@angular/core";
import { ArticleItemComponent } from "../article-item";
import { ArticleService, Article, SearchResult } from "common";

@Component({
  selector: 'article-list',
  template: require('./article-list.html'),
  styles: [require('./article-list.scss')],
  directives: [ArticleItemComponent],
  providers: [ArticleService, ArticleService]
})
export class ArticleListComponent implements OnInit {
  private items: Article[] = [];
  private total: number = 0;
  private currentPage: number = 0;

  constructor(private _ser: ArticleService) {
  }


  ngOnInit() {
    this._updateData(1);
  }

  private _updateData(pageIndex: number) {
    this._ser.getItems(pageIndex).subscribe((result) => {
      this.items = result.result;
      this.total = result.total;
      this.currentPage = result.pageIndex;
    });
  }


}
