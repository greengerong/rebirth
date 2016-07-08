import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { RebirthHttpProvider } from 'rebirth-common';
import config from 'config';
import { LoadService } from  './loading';

@Component({
  selector: 'app',
  pipes: [],
  providers: [LoadService],
  directives: [RouterLinkActive],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('normalize.css'),
    require('./app.scss')
  ],
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {

  constructor(rebirthHttpProvider: RebirthHttpProvider, viewContainer: ViewContainerRef, loadService: LoadService) {

    loadService.defaultViewContainerRef = viewContainer;

    rebirthHttpProvider
      .baseUrl(config.api.host)
      .json()
      .addInterceptor({
        request: request => {
          console.log('全局拦截器(request)', request);
          loadService.show();
        },
        response: (stream) => stream.map(response => {
          console.log('全局拦截器(response)', response);
          loadService.hide();
          return response;
        })
      });
  }
}
