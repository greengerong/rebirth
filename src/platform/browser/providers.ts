// Angular 2
import { FORM_PROVIDERS, HashLocationStrategy, LocationStrategy } from '@angular/common';
// Angular 2 Http
import { HTTP_PROVIDERS, JSONP_PROVIDERS } from '@angular/http';
// Angular 2 Router
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';

import {REBIRTH_HTTP_PROVIDERS} from 'rebirth-common';
/*
* Application Providers/Directives/Pipes
* providers/directives/pipes that only live in our browser environment
*/
export const APPLICATION_PROVIDERS = [
  ...FORM_PROVIDERS,
  ...HTTP_PROVIDERS,
  ...JSONP_PROVIDERS,
  ...ROUTER_PROVIDERS,
  { provide: LocationStrategy, useClass: HashLocationStrategy },
  ...REBIRTH_HTTP_PROVIDERS
];

export const PROVIDERS = [
  ...APPLICATION_PROVIDERS
];
