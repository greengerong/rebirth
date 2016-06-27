import { Directive, HostListener, OnInit, Output, Input, EventEmitter, Renderer, ElementRef, Attribute } from '@angular/core';

@Directive({
  selector: '[dropdown]'
})
export class Dropdown {
  @Output() dropdownStatusChange = new EventEmitter();
  private active: boolean = false;
  @Input() private activeCss: string = 'open';
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
