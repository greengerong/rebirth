import { Component, OnInit } from '@angular/core';
import { ArticleService, SearchResult, Article } from '../article-service';

@Component({
  selector: 'blog-aside',
  pipes: [],
  providers: [
    ArticleService
  ],
  directives: [],
  styles: [
    require('./blog-aside.scss')
  ],
  template: require('./blog-aside.html')
})
export class BlogAsideComponent implements OnInit {
  private article: SearchResult<Article>;
  constructor(private articleService: ArticleService) {

  }

  ngOnInit() {
    this.articleService.getArticles(1, 5)
      .subscribe(result => {
        this.article = result;
      });
  }
}
