import { Component, ViewContainerRef } from '@angular/core';
import { RebirthHttpProvider } from 'rebirth-http';
import { environment } from '../environments/environment';
import { LoadingComponent } from  './shared/loading';
import { ViewChild } from '@angular/core/src/metadata/di';

@Component({
  selector: 'app',
  styleUrls: [
    './app.scss',
  ],
  template: '<router-outlet></router-outlet><loading></loading>'
})
export class AppComponent {

  @ViewChild(LoadingComponent)
  loadingComponent: LoadingComponent;

  constructor(private rebirthHttpProvider: RebirthHttpProvider) {


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
          this.loadingComponent.show();
        },
        response: (stream) => (<any>stream).do(() => null, () => this.loadingComponent.hide(), () => this.loadingComponent.hide())
      });
  }
}
