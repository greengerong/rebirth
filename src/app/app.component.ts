import { Component, ViewEncapsulation } from '@angular/core';
import { RouteConfig, Router } from '@angular/router-deprecated';
import { RouterActive } from './router-active';
import { AppState } from './app.service';
import {BlogApp} from './blog-app';

@Component({
  selector: 'app',
  pipes: [],
  providers: [AppState],
  directives: [RouterActive],
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('./app.scss')
  ],
  template: '<router-outlet></router-outlet>'
})
@RouteConfig([
  { path: '/', name: 'Index', redirectTo: ['Blog'] },
  { path: '/blog/...', name: 'Blog', component: BlogApp }
])
export class App {

}
