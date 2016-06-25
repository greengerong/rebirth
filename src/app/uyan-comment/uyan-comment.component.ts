import {Component, ChangeDetectionStrategy, OnInit, ElementRef, Renderer} from '@angular/core';
import {RebirthWindow} from 'rebirth-common';

@Component({
  selector: 'uyan-comment',
  template: require('./uyan-comment.html'),
  changeDetection: ChangeDetectionStrategy.Checked
})
export class UyanComment implements OnInit {
  private static UYAN_URL:string = 'http://v2.uyan.cc/code/uyan.js?uid=1893648';

  constructor(private elmRef:ElementRef, private renderer:Renderer, private rebirthWindow:RebirthWindow) {

  }

  ngOnInit() {
    this.rebirthWindow.createScript(UyanComment.UYAN_URL, this.renderer, this.elmRef);
  }
}
