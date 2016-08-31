import { Component, OnInit } from '@angular/core';
import { CodemirrorComponent } from '../codemirror';
import { MdPreviewComponent } from '../md-preview';
import { ActivatedRoute } from '@angular/router';
import { RebirthWindow, ArticleService, Article, DropdownDirective } from '../../common';

@Component({
  selector: 'md-editor',
  providers: [ArticleService],
  directives: [CodemirrorComponent, MdPreviewComponent, DropdownDirective],
  pipes: [],
  styles: [require('./md-editor.scss')],
  template: require('./md-editor.html'),
})
export class MdEditorComponent implements OnInit {
  private mdArticle: string;
  private article: Article;
  private articleUrl: string;

  constructor(private activatedRoute: ActivatedRoute,
              private articleService: ArticleService,
              private rebirthWindow: RebirthWindow) {
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
        setTimeout(() => this.rebirthWindow.getGlobalObject().alert(`${this.article.title}修改成功`));
      });
  }

  markdownTextChange(md): void {
    this.mdArticle = md;
  }
}
