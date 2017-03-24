import { Component, ChangeDetectionStrategy, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'loading',
  templateUrl: './loading.html',
  styleUrls: ['../../../assets/css/loading.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent {

  constructor(private elmRef: ElementRef, private renderer: Renderer2) {

  }

  show(): void {
    this.updateStatus(false);
  }

  hide(): void {
    this.updateStatus(true);
  }

  private updateStatus(add: boolean) {
    if (add) {
      this.renderer.addClass(this.elmRef.nativeElement, 'hidden');
      return;
    }
    this.renderer.removeClass(this.elmRef.nativeElement, 'hidden');
  }
}
