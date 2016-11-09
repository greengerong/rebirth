import { Component, ViewContainerRef } from '@angular/core';
import { RebirthHttpProvider } from 'rebirth-http';
import { environment } from '../environments/environment';
import { LoadService } from  './core/loading/loading.service';

@Component({
  selector: 'app',
  styleUrls: [
    './app.scss',
  ],
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {

  constructor(private rebirthHttpProvider: RebirthHttpProvider, private viewContainer: ViewContainerRef,
              private  loadService: LoadService) {

    loadService.defaultViewContainerRef = viewContainer;

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
          loadService.show();
        },
        response: (stream) => (<any>stream).do(() => null, () => loadService.hide(), () => loadService.hide())
      });
  }
}
