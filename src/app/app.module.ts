import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTING } from './app.routes';

// App is our top level component
import { AppComponent } from './app.component';

// rebirth
// import { REBIRTH_WINDOW_PROVIDERS } from './shared';
// import { REBIRTH_HTTP_PROVIDERS } from 'rebirth-http';
// import { REBIRTH_STORAGE_PROVIDERS } from 'rebirth-storage';
import { SharedModule } from './shared';

// Application wide providers
const APP_PROVIDERS = [
  // ...REBIRTH_HTTP_PROVIDERS,
  // ...REBIRTH_WINDOW_PROVIDERS,
  // ...REBIRTH_STORAGE_PROVIDERS,
  // ...providePermission(permissionConfig)
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule.forRoot({ permission: { loginPage: '/manage/login' } }),
    ROUTING
  ],
  providers: [
    ...ENV_PROVIDERS,
    ...APP_PROVIDERS
  ]
})
export class AppModule {
}
