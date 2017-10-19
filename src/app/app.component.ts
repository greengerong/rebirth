import { Component, ViewContainerRef } from '@angular/core';
import { RebirthHttpProvider } from 'rebirth-http';
import { environment } from '../environments/environment';
import { LoadingService } from './core/loading/loading.service';

@Component({
  selector: 'app-root',
  styleUrls: [
    './app.scss',
  ],
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {

  constructor(private rebirthHttpProvider: RebirthHttpProvider, private viewContainer: ViewContainerRef,
              private  loadService: LoadingService) {

    loadService.defaultViewContainerRef = viewContainer;

    rebirthHttpProvider
      .baseUrl(environment.api.host)
      .addInterceptor({
        request: request => console.log('全局拦截器(request)', request),
        response: (response) => console.log('全局拦截器(response)', response)
      })
      .addInterceptor({
        request: () => loadService.show(),
        response: () => loadService.hide()
      });
  }
}
