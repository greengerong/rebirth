import { TestBed, inject } from '@angular/core/testing';
import { BrowserModule }  from '@angular/platform-browser';
import { BlogFooterComponent } from './index';

describe('Article aside Component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
      ],
      declarations: [BlogFooterComponent],
      providers: []
    });
  });


  it('should contain a number', inject([], () => {

    const fixture = TestBed.createComponent(BlogFooterComponent);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const elm: HTMLElement = fixture.nativeElement;
      const linkElms = elm.querySelectorAll('.center-block');
      expect(linkElms[0].textContent).toContain('2016');
    });
  }));
});
