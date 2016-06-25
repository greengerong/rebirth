import {bootstrap} from '@angular/platform-browser-dynamic';
import {DIRECTIVES, PIPES, PROVIDERS} from './platform/browser';
import {ENV_PROVIDERS} from './platform/environment';
import {App, APP_PROVIDERS} from './app';
import './icon.font.json';

export function main():Promise<any> {

  return bootstrap(App, [
    ...PROVIDERS,
    ...ENV_PROVIDERS,
    ...DIRECTIVES,
    ...PIPES,
    ...APP_PROVIDERS
  ])
    .catch(err => console.error(err));

}

// bootstrap when document is ready
document.addEventListener('DOMContentLoaded', () => main());

