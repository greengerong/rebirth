import { Component, ViewContainerRef } from '@angular/core';
import { RebirthHttpProvider } from 'rebirth-http';
import { environment } from '../environments/environment';
import { LoadingService } from './core';

@Component({
  selector: 'app',
  styleUrls: [
    './app.scss',
  ],
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {

  constructor(private viewContainerRef: ViewContainerRef,
              private loadingService: LoadingService,
              private rebirthHttpProvider: RebirthHttpProvider) {

    loadingService.defaultViewContainerRef = viewContainerRef;

    rebirthHttpProvider
      .baseUrl(environment.api.host)
      .json()
      .addInterceptor({
        request: request => {
          console.log('全局拦截器(request)', request);
        },
        response: (stream) => stream.map(response => {
          console.log('全局拦截器(response)', response);
          return response;
        })
      })
      .addInterceptor({
        request: () => {
          this.loadingService.show();
        },
        response: (stream) => (<any>stream).do(() => null, () => this.loadingService.hide(), () => this.loadingService.hide())
      });
  }
}
