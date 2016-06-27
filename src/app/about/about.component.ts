import { Component, OnInit } from '@angular/core';
import { AboutService } from './about.service';
import { Article } from '../article-service';
import { ArticleItem } from '../article-item';
import { Cacheable, StorageType } from 'rebirth-common';

@Component({
  selector: 'about',
  providers: [AboutService],
  directives: [ArticleItem],
  styles: [],
  template: require('./about.html')
})
export class About implements OnInit {
  private article: Article;
  constructor(private aboutService: AboutService) {

  }

  ngOnInit() {
    this.aboutService.getArticle()
      .subscribe(result => this.article = result);
  }
}
