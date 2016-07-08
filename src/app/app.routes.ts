import { RouterConfig } from '@angular/router';
import {
  routes as blogAppRoutes,
  asyncRoutes as blogAppAsyncRoutes,
  prefetchRouteCallbacks as blogAppPrefetchRouteCallbacks
} from './blog-app';

export const routes: RouterConfig = [
  { path: '', pathMatch: 'full', redirectTo: '/blog/home' },
  ...blogAppRoutes
];

// Async load a component using Webpack's require with es6-promise-loader and webpack `require`
// asyncRoutes is needed for our @angularclass/webpack-toolkit that will allow us to resolve
// the component correctly
export const asyncRoutes: AsyncRoutes = Object.assign({}, blogAppAsyncRoutes);


// Optimizations for initial loads
// An array of callbacks to be invoked after bootstrap to prefetch async routes
/* tslint:disable:no-string-literal */
export const prefetchRouteCallbacks: Array<Es6PromiseLoader | Function> = [
  ...blogAppPrefetchRouteCallbacks
];
/* tsslint:enable:no-string-literal */

// Es6PromiseLoader and AsyncRoutes interfaces are defined in custom-typings
