import { Component, ChangeDetectionStrategy, Renderer2, OnInit, ElementRef } from '@angular/core';
import { RebirthWindow } from '../../core';

@Component({
  selector: 'jia-this',
  templateUrl: './jia-this.html',
  styleUrls: ['./jia-this.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JiaThisComponent implements OnInit {
  private static UYAN_URL = 'http://v3.jiathis.com/code/jiathis_m.js?uid=1893648';

  constructor(private elmRef: ElementRef, private renderer: Renderer2, private rebirthWindow: RebirthWindow) {

  }

  ngOnInit() {
    this.rebirthWindow.createScript(`${JiaThisComponent.UYAN_URL}&rn=${Math.random()}`, this.renderer, this.elmRef);
  }
}
