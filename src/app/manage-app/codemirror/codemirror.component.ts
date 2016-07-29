import {
  Component,
  Input,
  Output,
  ElementRef,
  ChangeDetectionStrategy,
  EventEmitter,
  OnInit,
  OnChanges
} from '@angular/core';
import { Article } from "common";
import * as CodeMirror from 'codemirror';
import  'codemirror/keymap/sublime';
import  'codemirror/addon/search/jump-to-line';
import  'codemirror/addon/search/match-highlighter';
import  'codemirror/addon/search/searchcursor';
import  'codemirror/addon/search/search';
import  'codemirror/addon/dialog/dialog';
import  'codemirror/addon/display/autorefresh';
import  'codemirror/addon/display/panel';
import  'codemirror/addon/display/placeholder';
import  'codemirror/addon/display/rulers';
import  'codemirror/addon/display/fullscreen';

import  'codemirror/addon/selection/active-line';
import  'codemirror/addon/selection/mark-selection';
import  'codemirror/addon/selection/selection-pointer';

import  'codemirror/addon/fold/foldcode';
import  'codemirror/addon/fold/foldgutter';
import  'codemirror/addon/fold/brace-fold';
import  'codemirror/addon/fold/xml-fold';
import  'codemirror/addon/fold/markdown-fold';
import  'codemirror/addon/fold/comment-fold';

import  'codemirror/mode/markdown/markdown';
import  'codemirror/mode/javascript/javascript';
import  'codemirror/mode/xml/xml';

@Component({
  selector: 'codemirror',
  providers: [],
  directives: [],
  pipes: [],
  styles: [require('./codemirror.scss')],
  template: require('./codemirror.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodemirrorComponent implements OnInit, OnChanges {
  @Input('markdown') markdown: string;
  @Output('mdTextChange') mdTextChange = new EventEmitter();
  private editorMarkdown: any;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    let codeEditor = this.elementRef.nativeElement.querySelector('.code-editor');
    this.editorMarkdown = CodeMirror.fromTextArea(codeEditor, <any>{
      mode: "markdown",
      lineNumbers: true,
      lineWrapping: true,
      // theme: 'base16-dark',
      keyMap: "sublime",
      autofocus: true,
      foldGutter: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
    });
    this.editorMarkdown.on('change', (e) => {
      this.mdArticleChange(e);
    });
    this.editorMarkdown.setSize('100%', '600px');
    this.ngOnChanges({ currentValue: this.markdown });
  }

  ngOnChanges(event): void {
    // if (event.markdown && event.mdArticle.currentValue) {
    //   this.editorMarkdown.setValue(event.mdArticle.currentValue);
    // }
  }

  fullScreen(): void {
    this.editorMarkdown.setOption("fullScreen", true);
  }

  private mdArticleChange(e: any): void {
    this.mdTextChange.emit(e.getValue());
  }

}
