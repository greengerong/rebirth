import { Component, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import * as markdownit from 'markdown-it';
import * as hljs from 'highlight.js';

@Component({
  selector: 'md-preview',
  styles: [require('./md-preview.scss')],
  template: require('./md-preview.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdPreviewComponent implements OnChanges {
  @Input('mdArticle') mdArticle: string;
  private mdHtmlText: string;
  private markdownIt: any;

  constructor() {
    this.markdownIt = (<any>markdownit)({
      html: true,
      highlight: function (code, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, code).value;
          } catch (e) {
            return code;
          }
        }
        return code;
      }
    });
  }

  ngOnChanges(event): void {
    if (event.mdArticle) {
      this.mdHtmlText = event.mdArticle.currentValue ? this.markdownIt.render(event.mdArticle.currentValue) : '';
    }
  }
}
