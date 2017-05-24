import { NgModule, SkipSelf, Optional } from '@angular/core';
import { RebirthHttpModule } from 'rebirth-http';
import { RebirthStorageModule } from 'rebirth-storage';
import { LoadingModule } from './loading';
import { REBIRTH_ARTICLE_SERVICE_PROVIDERS } from './article-service';
import { REBIRTH_WINDOW_PROVIDERS } from './rebirth-common';
import { HttpModule } from '@angular/http';
import { RebirthEventSourceModule } from 'rebirth-event-source';


@NgModule({
  imports: [
    HttpModule,
    RebirthHttpModule,
    RebirthStorageModule,
    LoadingModule,
    RebirthEventSourceModule,
  ],
  providers: [
    ...REBIRTH_ARTICLE_SERVICE_PROVIDERS,
    ...REBIRTH_WINDOW_PROVIDERS,
    // { provide: RouteReuseStrategy, useClass: RebirthRouterReuseStrategy }
  ],
  exports: [
    RebirthHttpModule,
    RebirthStorageModule,
    LoadingModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
