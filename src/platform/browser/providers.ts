// Angular 2
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
// Angular 2 Http
import { HTTP_PROVIDERS, JSONP_PROVIDERS } from '@angular/http';
// Angular 2 Router
import { provideRouter } from '@angular/router';
// import { ROUTER_PROVIDERS } from '@angular/router-deprecated';

// Angular 2 forms
import { disableDeprecatedForms, provideForms } from '@angular/forms';

// AngularClass
import { provideWebpack } from '@angularclass/webpack-toolkit';
import { providePrefetchIdleCallbacks } from '@angularclass/request-idle-callback';


import { routes, asyncRoutes, prefetchRouteCallbacks } from '../../app/app.routes';

import { REBIRTH_WINDOW_PROVIDERS } from 'rebirth-common';
import { REBIRTH_HTTP_PROVIDERS } from 'rebirth-http';

import { REBIRTH_STORAGE_PROVIDERS } from 'rebirth-storage';

/*
 * Application Providers/Directives/Pipes
 * providers/directives/pipes that only live in our browser environment
 */
export const APPLICATION_PROVIDERS = [
  // new Angular 2 forms
  disableDeprecatedForms(),
  provideForms(),

  // ...ROUTER_PROVIDERS,
  provideRouter(routes),
  provideWebpack(asyncRoutes),
  providePrefetchIdleCallbacks(prefetchRouteCallbacks),

  ...HTTP_PROVIDERS,
  ...JSONP_PROVIDERS,


  { provide: LocationStrategy, useClass: PathLocationStrategy }, // HashLocationStrategy
  ...REBIRTH_HTTP_PROVIDERS,
  ...REBIRTH_WINDOW_PROVIDERS,
  ...REBIRTH_STORAGE_PROVIDERS
];

export const PROVIDERS = [
  ...APPLICATION_PROVIDERS
];
