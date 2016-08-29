import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule, decorateModuleRef } from './app';

import "./icon.font.json";


/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(decorateModuleRef)
    .catch(err => console.error(err));

}

// bootstrap when document is ready
document.addEventListener("DOMContentLoaded", () => main());

