import { TestBed, async, inject } from '@angular/core/testing';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';

describe('About Component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        RouterModule.forRoot({})
      ],
      declarations: [AboutComponent],
      providers: []
    });

  });

  it('should get about me article', async(inject([], () => {

    let fixture = TestBed.createComponent(AboutComponent);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      setTimeout(function () {
        expect(fixture.componentInstance.article.title).toEqual("破狼简介");
      });
    });

  })));

});
