import { Directive, OnInit, Renderer, ElementRef, Attribute } from '@angular/core';

@Directive({
    selector: '[dropdown]',
    host: {
        '(document:click)': 'onDocumentClick($event)',
        '(click)': 'onHostClick($event)',
    }
})
export class Dropdown {
    private active: boolean = false;
    private activeCss: string;
    constructor(
        private elmRef: ElementRef,
        private renderer: Renderer,
        @Attribute('dropdown') activeCss: string) {
        this.activeCss = activeCss || 'open';
    }
    onDocumentClick() {
        this.active = false;
        this.updateHostStatus();
    }
    onHostClick($event: Event) {
        this.active = !this.active;
        this.updateHostStatus();
    }
    updateHostStatus() {
        this.renderer.setElementClass(this.elmRef.nativeElement, this.activeCss, this.active);
    }
}
