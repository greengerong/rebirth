import { Component, Input, Output, ElementRef, ChangeDetectionStrategy, EventEmitter, OnInit } from '@angular/core';
import { Article } from "common";
import { CodemirrorComponent } from '../codemirror';
@Component({
  selector: 'md-editor',
  providers: [],
  directives: [CodemirrorComponent],
  pipes: [],
  styles: [require('./md-editor.scss')],
  template: require('./md-editor.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdEditorComponent {

  markdownTextChange(md): void {
    console.log("=====", md);
  }
}
