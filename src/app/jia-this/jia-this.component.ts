import {Component, ChangeDetectionStrategy, Renderer, OnInit, ElementRef} from '@angular/core';

@Component({
  selector: 'jia-this',
  template: require('./jia-this.html'),
  styles: [require('./jia-this.scss')],
  changeDetection: ChangeDetectionStrategy.Checked
})
export class JiaThis implements OnInit {
  private static UYAN_URL: string = 'http://v3.jiathis.com/code/jiathis_m.js?uid=1893648';
  constructor(private elmRef: ElementRef, private renderer: Renderer) {

  }

  ngOnInit() {
    const script = this.renderer.createElement(this.elmRef.nativeElement, 'script', null);
    script.type = 'text/javascript';
    script.src = JiaThis.UYAN_URL;
    script.id = `jiaThis_${Math.random()}`;
  }
}
