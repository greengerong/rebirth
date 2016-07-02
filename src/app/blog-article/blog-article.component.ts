import { Component, OnInit } from '@angular/core';
import { ArticleService, Article } from '../article-service';
import { ArticleItemComponent } from '../article-item';
import { ActivatedRoute } from '@angular/router';
import { UyanCommentComponent } from '../uyan-comment';

@Component({
  selector: 'blog-article',
  providers: [ArticleService],
  directives: [ArticleItemComponent, UyanCommentComponent],
  pipes: [],
  styles: [require('./blog-article.scss')],
  template: require('./blog-article.html')
})
export class BlogArticleComponent implements OnInit {
  private articleUrl: string;
  private article: Article;

  constructor(private articleService: ArticleService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.articleUrl = params.id;
      this.articleService.getArticleByUrl(this.articleUrl)
        .subscribe(result => {
          this.article = result;
        });
    });
  }
}
