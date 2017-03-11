import { Directive, HostListener, Output, Input, EventEmitter, Renderer, ElementRef, } from '@angular/core';

@Directive({
  selector: '[dropdown]'
})
export class DropdownDirective {
  @Output() dropdownStatusChange = new EventEmitter();
  private active = false;
  @Input() private activeCss = 'open';

  constructor(private elmRef: ElementRef, private renderer: Renderer) {
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick() {
    this.active = false;
    this.updateHostStatus();
  }

  @HostListener('click', ['$event'])
  onHostClick($event: Event) {
    $event.stopPropagation();
    this.active = !this.active;
    this.updateHostStatus();
  }

  updateHostStatus() {
    this.dropdownStatusChange.emit(this.active);
    this.renderer.setElementClass(this.elmRef.nativeElement, this.activeCss, this.active);
  }
}
