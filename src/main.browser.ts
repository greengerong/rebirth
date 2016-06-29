import { bootstrap } from "@angular/platform-browser-dynamic";
import { GLOBAL_PROVIDERS } from "./global.providers";
import { decorateComponentRef } from "./platform/environment";
import { AppComponent } from './app';

import "./icon.font.json";


export function main(): Promise<any> {

  return bootstrap(AppComponent, [
      ...GLOBAL_PROVIDERS
  ])
    .then(decorateComponentRef)
    .catch(err => console.error(err));

}

// bootstrap when document is ready
document.addEventListener("DOMContentLoaded", () => main());

