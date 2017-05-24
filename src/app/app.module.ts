import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { useLogMonitor } from '@ngrx/store-log-monitor';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ROUTER_CONFIG } from './app.routes';

// App is our top level component
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { SharedModule } from './shared';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { rootReducer } from './reducers';
import { StoreModule } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
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
    // EffectsModule.run(UserEffects),
    RouterStoreModule.connectRouter(),
    StoreModule.provideStore(rootReducer),
    // StoreDevtoolsModule.instrumentStore({ // devtool
    //   monitor: useLogMonitor({
    //     visible: true,
    //     position: 'right'
    //   })
    // })
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
