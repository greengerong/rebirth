import { Component, OnInit } from '@angular/core';
import { AboutService } from './about.service';
import { Article } from '../article-service';
import { ArticleItemComponent } from '../article-item';

@Component({
  selector: 'about',
  providers: [AboutService],
  directives: [ArticleItemComponent],
  styles: [],
  template: require('./about.html')
})
export class AboutComponent implements OnInit {
  private article: Article;

  constructor(private aboutService: AboutService) {

  }

  ngOnInit() {
    this.aboutService.getArticle()
      .subscribe(result =>
        this.article = result);
  }
}
