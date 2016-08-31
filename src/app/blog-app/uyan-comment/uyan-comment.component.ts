import { Component, ChangeDetectionStrategy, OnInit, ElementRef, Renderer } from '@angular/core';
import { RebirthWindow } from '../../common';

@Component({
  selector: 'uyan-comment',
  template: require('./uyan-comment.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UyanCommentComponent implements OnInit {
  private static UYAN_URL: string = 'http://v2.uyan.cc/code/uyan.js?uid=1893648';

  constructor(private elmRef: ElementRef, private renderer: Renderer, private rebirthWindow: RebirthWindow) {

  }

  ngOnInit() {
    this.rebirthWindow.createScript(UyanCommentComponent.UYAN_URL, this.renderer, this.elmRef);
  }
}
