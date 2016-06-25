// Angular 2
import {enableProdMode} from '@angular/core';

// Environment Providers
let PROVIDERS = [];

if ('production' === ENV) {
  // Production
  enableProdMode();

  PROVIDERS = [
    // production dependency
  ];

} else {
  PROVIDERS = [
    // Development dependency
  ];

}


export const ENV_PROVIDERS = [
  ...PROVIDERS
];
