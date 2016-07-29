import { Component, Input, Output, ElementRef, ChangeDetectionStrategy, EventEmitter, OnInit } from '@angular/core';
import { Article } from "common";
import { CodemirrorComponent } from '../codemirror';
import { MdPreviewComponent } from '../md-preview';

@Component({
  selector: 'md-editor',
  providers: [],
  directives: [CodemirrorComponent, MdPreviewComponent],
  pipes: [],
  styles: [require('./md-editor.scss')],
  template: require('./md-editor.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdEditorComponent {
  private mdArticle: string;

  markdownTextChange(md): void {
    this.mdArticle = md;
  }
}
