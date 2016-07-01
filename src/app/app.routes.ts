import { RouterConfig } from '@angular/router';
import { BlogAppComponent } from './blog-app';
import { WebpackAsyncRoute } from '@angularclass/webpack-toolkit';

import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { BlogArticleComponent } from './blog-article';
import { QuestionComponent } from './question';

export const routes: RouterConfig = [
  {path: '', pathMatch: 'full', redirectTo: '/blog/home'},
  {
    path: 'blog', component: BlogAppComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: '/blog/home'},
      // {path: 'home', component: 'HomeComponent', canActivate: [WebpackAsyncRoute]},
      // {path: 'about', component: 'AboutComponent', canActivate: [WebpackAsyncRoute]},
      // {path: ':id', component: 'BlogArticleComponent', canActivate: [WebpackAsyncRoute]},
      // {path: 'question', component: 'QuestionComponent', canActivate: [WebpackAsyncRoute]}]

      {path: 'home', component: HomeComponent},
      {path: 'about', component: AboutComponent},
      {path: 'question', component: QuestionComponent}, // TODO: question should before :id (priority order)
      {path: ':id', component: BlogArticleComponent}
    ]
  }
];

// Async load a component using Webpack's require with es6-promise-loader and webpack `require`
// asyncRoutes is needed for our @angularclass/webpack-toolkit that will allow us to resolve
// the component correctly
export const asyncRoutes: AsyncRoutes = {
  // 'HomeComponent': require('es6-promise-loader!./home'),
  // 'AboutComponent': require('es6-promise-loader!./about'),
  // 'BlogArticleComponent': require('es6-promise-loader!./blog-article'),
  // 'QuestionComponent': require('es6-promise-loader!./question')
};


// Optimizations for initial loads
// An array of callbacks to be invoked after bootstrap to prefetch async routes
/* tslint:disable:no-string-literal */
export const prefetchRouteCallbacks: Array<Es6PromiseLoader | Function> = [
  // asyncRoutes['HomeComponent'], // es6-promise-loader returns a function
  // asyncRoutes['AboutComponent'],
  // asyncRoutes['BlogArticleComponent'],
  // asyncRoutes['QuestionComponent']
];
/* tsslint:enable:no-string-literal */

// Es6PromiseLoader and AsyncRoutes interfaces are defined in custom-typings
