import {Component, ChangeDetectionStrategy, Renderer, OnInit, ElementRef} from '@angular/core';

@Component({
  selector: 'uyan-comment',
  template: require('./uyan-comment.html'),
  changeDetection: ChangeDetectionStrategy.Checked
})
export class UyanComment implements OnInit {
  private static UYAN_URL: string = 'http://v2.uyan.cc/code/uyan.js?uid=1893648';
  constructor(private elmRef: ElementRef, private renderer: Renderer) {

  }

  ngOnInit() {
    const script = this.renderer.createElement(this.elmRef.nativeElement, 'script', null);
    script.type = 'text/javascript';
    script.src = UyanComment.UYAN_URL;
    script.id = `uyan_${Math.random()}`;
  }
}
