import { Component, Input, OnChanges } from '@angular/core';
import { Article } from 'common';
import * as markdownit from 'markdown-it';
import * as hljs from 'highlight.js';

@Component({
  selector: 'md-preview',
  styles: [require('./md-preview.scss')],
  template: require('./md-preview.html')
})
export class MdPreviewComponent {
  @Input('mdArticle') mdArticle: string;
  private mdHtmlText: string;
  private markdownIt: any;

  constructor() {
    this.markdownIt = (<any>markdownit)({
      html: true,
      highlight: function (code, lang) {
        console.log(code, '===', lang, '===', hljs);
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, code).value;
          } catch (e) {
          }
        }
        return code;
      }
    });
  }

  ngOnChanges(event): void {
    console.log(event, '=========');
    if (event.mdArticle) {
      this.mdHtmlText = event.mdArticle.currentValue ? this.markdownIt.render(event.mdArticle.currentValue) : '';
    }
  }
}
