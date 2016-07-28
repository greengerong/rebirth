import {
  Component,
  Input,
  Output,
  ElementRef,
  ChangeDetectionStrategy,
  EventEmitter,
  OnInit
} from '@angular/core';
import { Article } from "common";
import * as CodeMirror from 'codemirror';

@Component({
  selector: 'codemirror',
  providers: [],
  directives: [],
  pipes: [],
  styles: [require('./codemirror.scss')],
  template: require('./codemirror.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodemirrorComponent implements OnInit {
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
      theme: 'base16-dark',
      autofocus: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
    });
    this.editorMarkdown.on('change', (e) => {
      this.mdArticleChange(e);
    });
  }

  private mdArticleChange(e: any): void {
    this.mdTextChange.emit(e.getValue());
  }

}
