import { NgModule, SkipSelf, Optional } from '@angular/core';
import { RebirthHttpModule } from 'rebirth-http';
import { RebirthStorageModule } from 'rebirth-storage';
import { ArticleService } from './article-service';
import { LoadingModule } from './loading';
import { REBIRTH_WINDOW_PROVIDERS } from './rebirth-common';
import { HttpModule } from '@angular/http';


@NgModule({
  imports: [
    HttpModule,
    RebirthHttpModule,
    RebirthStorageModule,
    LoadingModule
  ],
  providers: [
    ArticleService,
    ...REBIRTH_WINDOW_PROVIDERS
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
