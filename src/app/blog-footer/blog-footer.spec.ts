import { TestComponentBuilder } from '@angular/compiler/testing';
import { addProviders, inject, async } from '@angular/core/testing';

import { GLOBAL_PROVIDERS } from '../../global.providers';
import { BlogFooterComponent } from './index';

describe('Article aside Component', () => {

  beforeEach(() => addProviders([
    ...GLOBAL_PROVIDERS,
    BlogFooterComponent,
  ]));

  it('should contain a number', async(inject([TestComponentBuilder],
    (tcb: TestComponentBuilder) => {
      tcb.createAsync(BlogFooterComponent)
        .then((fixture) => {
          fixture.detectChanges();
          let elm: HTMLElement = fixture.nativeElement;
          let linkElms = elm.querySelectorAll(".center-block");
          expect(linkElms[0].textContent).toContain('2016');
        });
    })));
});
