import { NgModule, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { prebootClient } from 'preboot/__build/src/browser/preboot_browser';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ROUTER_CONFIG } from './app.routes';

// App is our top level component
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { SharedModule } from './shared';
import { NavigationEnd, NavigationError, Router, RouterModule } from '@angular/router';
import { combineLatest } from 'rxjs/observable/combineLatest';
// Application wide providers
const APP_PROVIDERS = [];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    RouterModule.forRoot(ROUTER_CONFIG),
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    ...APP_PROVIDERS,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor(router: Router, zone: NgZone) {
    // if (typeof prebootstrap === 'undefined') {
    //   return;
    // }
    //
    // const finished = combineLatest(router.events, zone.onMicrotaskEmpty);
    //
    // const subscription = finished.subscribe(([event, stable]) => {
    //   if (stable === false) {
    //     return;
    //   }
    //
    //   switch (true) {
    //     case event instanceof NavigationError:
    //     case event instanceof NavigationEnd:
    //       setTimeout(() => {
    //         // debugger;
    //         // prebootClient().complete();
    //       });
    //
    //       subscription.unsubscribe();
    //       break;
    //     default:
    //       break;
    //   }
    // });
  }
}

// declare const prebootstrap;
