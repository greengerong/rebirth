import {Component, ChangeDetectionStrategy, OnInit, ElementRef} from '@angular/core';

@Component({
  selector: 'uyan-comment',
  template: require('./uyan-comment.html'),
  changeDetection: ChangeDetectionStrategy.Checked
})
export class UyanComment implements OnInit {
  private static UYAN_URL: string = 'http://v2.uyan.cc/code/uyan.js?uid=1893648';
  constructor(private elmRef: ElementRef) {

  }

  ngOnInit() {
    const document: HTMLDocument = this.elmRef.nativeElement.ownerDocument;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = UyanComment.UYAN_URL;
    script.id = `uyan_${Math.random()}`;
    this.elmRef.nativeElement.appendChild(script);
  }
}
