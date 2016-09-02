import { TestBed, async, inject } from '@angular/core/testing';
import { BrowserModule }  from '@angular/platform-browser';
import { AboutComponent } from './about.component';
import { BlogAppModule } from '../blog-app.module';
describe('About Component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BlogAppModule
      ],
      declarations: [],
      providers: []
    });

  });

  xit('should get about me article', async(inject([], () => {

    let fixture = TestBed.createComponent(AboutComponent);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      setTimeout(function () {
        expect((<any>fixture.componentInstance).article.title).toEqual("破狼简介");
      });
    });

  })));

});
