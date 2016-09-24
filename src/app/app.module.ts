import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTING } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { SharedModule } from './shared';

// Application wide providers
const APP_PROVIDERS = [];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  imports: [
    BrowserModule,
    SharedModule.forRoot(),
    ROUTING
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    ...ENV_PROVIDERS,
    ...APP_PROVIDERS
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
