import { TestComponentBuilder } from '@angular/compiler/testing';
import { GLOBAL_PROVIDERS } from '../../global.providers';
import { addProviders, describe, inject, async, it } from '@angular/core/testing';

import { AboutComponent } from './about.component';

describe('About Component', () => {
  
  beforeEach(() => addProviders([
    ...GLOBAL_PROVIDERS,
    AboutComponent
  ]));

  it('should get about me article', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

    tcb.createAsync(AboutComponent)
      .then((fixture) => {
        fixture.detectChanges();
        let elm: HTMLElement = fixture.nativeElement;
        expect(elm.querySelector(".article-title").textContent.trim()).toEqual("破狼简介");
      });
  })));

});
