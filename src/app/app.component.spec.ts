import { TestBed, inject } from '@angular/core/testing';
import { RebirthStorageModule } from 'rebirth-storage';
import { RebirthHttpModule } from 'rebirth-http';
import { ViewContainerRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { SharedModule } from './shared';
import { CoreModule } from './core';

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        SharedModule,
        RebirthHttpModule,
        RebirthStorageModule,
        RouterModule.forRoot(<any>{})
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: "/" },
        { provide: ViewContainerRef, useValue: {} },
      ]
    });

  });

  it('should init http interceptors', inject([], () => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.whenStable().then(() => {
      let element = fixture.nativeElement;
      fixture.detectChanges();

      expect(element.querySelectorAll('router-outlet').length).toEqual(1);
      expect((<any>fixture.componentInstance).rebirthHttpProvider.getInterceptors().length).toEqual(4);
    });
  }));

});
