import {Injectable, ElementRef, Renderer} from '@angular/core';


@Injectable()
export class RebirthWindow {

  getOwnerDocument(elmRef?:ElementRef):Document {
    return elmRef ? elmRef.nativeElement.ownerDocument : window.document;
  }

  scrollTo(selector:string, elmRef?:ElementRef):RebirthWindow {
    let elm:any = this.getOwnerDocument(elmRef).querySelector(selector);
    elm.scrollIntoView();
    return this;
  }

  scrollToTop(elmRef?:ElementRef):RebirthWindow {
    this.getOwnerDocument(elmRef).body.scrollIntoView();
    return this;
  }

  createScript(src:string, renderer:Renderer, elmRef?:ElementRef):HTMLScriptElement {
    let script = elmRef ? renderer.createElement(elmRef.nativeElement, 'script', null) :
      this.getOwnerDocument().createElement('script');

    script.type = 'text/javascript';
    script.src = src;
    script.id = `rebirth_script_${Math.random()}`;
    return script;
  }

}

export const REBIRTH_WINDOW_PROVIDERS:Array<any> = [
  RebirthWindow
];
