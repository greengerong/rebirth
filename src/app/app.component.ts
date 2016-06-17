import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';
import { RouterActive } from './router-active';
import { AppState } from './app.service';
import {BlogApp} from './blog-app';
import { RebirthHttpProvider, REBIRTH_HTTP_JSON_PROVIDERS, RebirthHttpInterceptor} from 'rebirth-common';

@Component({
  selector: 'app',
  pipes: [],
  providers: [AppState],
  directives: [RouterActive],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('normalize.css'),
    require('./app.scss')
  ],
  template: '<router-outlet></router-outlet>'
})
@RouteConfig([
  { path: '/', name: 'Index', redirectTo: ['Blog'] },
  { path: '/blog/...', name: 'Blog', component: BlogApp }
])
export class App {
  constructor(rebirthHttpProvider: RebirthHttpProvider, @Inject(REBIRTH_HTTP_JSON_PROVIDERS) jsonProvider: RebirthHttpInterceptor) {
    rebirthHttpProvider.getInterceptors().push(jsonProvider);
  }
}
