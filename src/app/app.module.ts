import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ROUTER_CONFIG } from './app.routes';

// App is our top level component
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { SharedModule } from './shared';
import { RouterModule } from '@angular/router';
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
    ...APP_PROVIDERS
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
