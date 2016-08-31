import { Component, ChangeDetectionStrategy, ElementRef, Renderer } from '@angular/core';

@Component({
  selector: 'loading',
  template: require('./loading.html'),
  styles: [require('../../../assets/css/loading.css')],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent {

  constructor(private elmRef: ElementRef, private renderer: Renderer) {

  }

  show(): void {
    this.updateStatus(false);
  }

  hide(): void {
    this.updateStatus(true);
  }

  private updateStatus(add: boolean) {
    this.renderer.setElementClass(this.elmRef.nativeElement, 'hidden', add);
  }
}
