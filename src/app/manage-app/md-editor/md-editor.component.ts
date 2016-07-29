import { Component, OnInit } from '@angular/core';
import { CodemirrorComponent } from '../codemirror';
import { MdPreviewComponent } from '../md-preview';
import { ActivatedRoute } from '@angular/router';
import { ArticleService, Article } from 'common';
import { RebirthWindow } from 'rebirth-common';

@Component({
  selector: 'md-editor',
  providers: [ArticleService],
  directives: [CodemirrorComponent, MdPreviewComponent],
  pipes: [],
  styles: [require('./md-editor.scss')],
  template: require('./md-editor.html'),
})
export class MdEditorComponent implements OnInit {
  private mdArticle: string;
  private article: Article;
  private articleUrl: string;

  constructor(private activatedRoute: ActivatedRoute,
              private articleService: ArticleService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.articleUrl = params.id;
      this.articleService.getArticleByUrl(this.articleUrl)
        .subscribe(result => {
          this.article = result;
          this.mdArticle = this.article.markdown;
        });
    });
  }

  updateMarkdown(): void {
    this.articleService
      .updateMarkdown(this.articleUrl, Object.assign({}, this.article, { markdown: this.mdArticle }))
      .subscribe(t => {
        console.log(t, 'save suucess!');
      });
  }

  markdownTextChange(md): void {
    this.mdArticle = md;
  }
}
