import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RebirthWindow, ArticleService, Article } from '../../core';
import { CodemirrorComponent } from '../codemirror/codemirror.component';

@Component({
  selector: 'md-editor',
  styleUrls: ['./md-editor.scss'],
  templateUrl: './md-editor.html',
})
export class MdEditorComponent implements OnInit {
  mdArticle: string;
  article: Article;
  articleUrl: string;

  @ViewChild(CodemirrorComponent) codemirror: CodemirrorComponent;


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
