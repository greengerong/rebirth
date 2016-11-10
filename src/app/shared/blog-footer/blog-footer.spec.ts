import { TestBed, inject } from '@angular/core/testing';
import { BlogFooterComponent } from './index';
import { CommonModule } from '@angular/common';

describe('Article aside Component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
      ],
      declarations: [BlogFooterComponent],
      providers: []
    });
  });


  it('should contain a number', inject([], () => {

    let fixture = TestBed.createComponent(BlogFooterComponent);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let elm: HTMLElement = fixture.nativeElement;
      let linkElms = elm.querySelectorAll(".center-block");
      expect(linkElms[0].textContent).toContain('2016');
    });
  }));
});
