import { TestBed, inject } from '@angular/core/testing';
import { REBIRTH_STORAGE_PROVIDERS } from 'rebirth-storage';
import { ViewContainerRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RebirthHttpProvider } from 'rebirth-http';
import { LoadingService } from './core';
import any = jasmine.any;
import { APP_BASE_HREF } from '@angular/common';

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(<any>{})
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: ViewContainerRef, useValue: {} },
        RebirthHttpProvider,
        LoadingService,
        ...REBIRTH_STORAGE_PROVIDERS
      ]
    });

  });

  it('should init http interceptors', inject([], () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.whenStable().then(() => {
      const element = fixture.nativeElement;
      fixture.detectChanges();

      expect(element.querySelectorAll('router-outlet').length).toEqual(1);
      expect((<any>fixture.componentInstance).rebirthHttpProvider.getInterceptors().length).toEqual(4);
    });
  }));

});
