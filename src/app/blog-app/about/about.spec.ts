import { TestBed, inject } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
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

  it('should get about me article', inject([], () => {
    const fixture = TestBed.createComponent(AboutComponent);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect((<any>fixture.componentInstance).article.title).toEqual('破狼简介');
    });
  }));

});
