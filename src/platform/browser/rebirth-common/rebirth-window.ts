import { Injectable, ElementRef, Renderer } from '@angular/core';


@Injectable()
export class RebirthWindow {

  getGlobalObject(): any {
    return window;
  }


  getOwnerDocument(elmRef?: ElementRef): Document {
    return elmRef ? elmRef.nativeElement.ownerDocument : window.document;
  }

  scrollTo(selector: string, elmRef?: ElementRef): RebirthWindow {
    let elm: any = this.getOwnerDocument(elmRef).querySelector(selector);
    elm.scrollIntoView();
    return this;
  }

  scrollToTop(elmRef?: ElementRef): RebirthWindow {
    this.getOwnerDocument(elmRef).body.scrollIntoView();
    return this;
  }

  createScript(src: string, renderer: Renderer, elmRef?: ElementRef, callback?: () => void): HTMLScriptElement {
    let script = elmRef ? renderer.createElement(elmRef.nativeElement, 'script', null) :
      this.getOwnerDocument().createElement('script');

    script.type = 'text/javascript';
    script.src = src;
    script.async = true;
    script.charset = 'UTF-8';
    script.id = `rebirth_script_${Math.random()}`;
    if (callback) {
      script.onreadystatechange = script.onload = () => {
        if ((!script.readyState || /loaded|complete/.test(script.readyState))) {
          callback();
        }
      };
    }
    return script;
  }

}

export const REBIRTH_WINDOW_PROVIDERS: Array<any> = [
  RebirthWindow
];
