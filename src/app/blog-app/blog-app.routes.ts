import { RouterConfig } from '@angular/router';
import { BlogAppComponent } from './blog-app.component';


export const routes: RouterConfig = [
  {
    path: 'blog', component: BlogAppComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/blog/home' },
      { path: 'home', component: 'HomeComponent' },
      { path: 'about', component: 'AboutComponent' },
      { path: 'question', component: 'QuestionComponent' },
      { path: ':id', component: 'BlogArticleComponent' }
    ]
  }
];

// Async load a component using Webpack's require with es6-promise-loader and webpack `require`
// asyncRoutes is needed for our @angularclass/webpack-toolkit that will allow us to resolve
// the component correctly
export const asyncRoutes: AsyncRoutes = {
  'HomeComponent': require('es6-promise-loader!../home'),
  'AboutComponent': require('es6-promise-loader!../about'),
  'BlogArticleComponent': require('es6-promise-loader!../blog-article'),
  'QuestionComponent': require('es6-promise-loader!../question')
};


// Optimizations for initial loads
// An array of callbacks to be invoked after bootstrap to prefetch async routes
/* tslint:disable:no-string-literal */
export const prefetchRouteCallbacks: Array<Es6PromiseLoader | Function> = [];
/* tsslint:enable:no-string-literal */

// Es6PromiseLoader and AsyncRoutes interfaces are defined in custom-typings
