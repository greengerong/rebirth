import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig } from '@angular/router-deprecated';
import { RouterActiveDirective } from './router-active';
import { BlogAppComponent } from './blog-app';
import { RebirthHttpProvider } from 'rebirth-common';
import config from 'config';

@Component({
  selector: 'app',
  pipes: [],
  providers: [],
  directives: [RouterActiveDirective],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('normalize.css'),
    require('./app.scss')
  ],
  template: '<router-outlet></router-outlet>'
})
@RouteConfig([
  { path: '/', name: 'Index', redirectTo: ['Blog'] },
  { path: '/blog/...', name: 'Blog', component: BlogAppComponent }
])
export class AppComponent {

  constructor(rebirthHttpProvider: RebirthHttpProvider) {

    rebirthHttpProvider
      .baseUrl(config.api.host)
      .json()
      .addInterceptor({
        request: request => {
          console.log('全局拦截器(request)', request);
        },
        response: (stream) => stream.map(response => {
          console.log('全局拦截器(response)', response);
          return response;
        })
      });
  }
}
