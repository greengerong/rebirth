import { Component, OnInit } from '@angular/core';
import { ArticleService, Article } from '../../core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-state.model';

@Component({
  selector: 'blog-article',
  styleUrls: ['./blog-article.scss'],
  templateUrl: './blog-article.html'
})
export class BlogArticleComponent implements OnInit {
  articleUrl: string;
  article: Article;

  constructor(private articleService: ArticleService,
              private activatedRoute: ActivatedRoute,
              private store: Store<AppState>) {

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
