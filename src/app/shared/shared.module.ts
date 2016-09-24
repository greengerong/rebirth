import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { ArticleService } from './article-service';
import { BlogFooterComponent } from './blog-footer';
import { BlogHeaderComponent } from './blog-header';
import { DropdownDirective } from './dropdown';
import { LoadService } from './loading';
import { PagerComponent } from './pager';
import { REBIRTH_WINDOW_PROVIDERS } from './rebirth-common';
import { REBIRTH_HTTP_PROVIDERS } from 'rebirth-http';
import { RebirthStorageModule } from 'rebirth-storage';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    RebirthStorageModule
  ],
  declarations: [
    BlogFooterComponent,
    BlogHeaderComponent,
    DropdownDirective,
    PagerComponent
  ],
  providers: [],
  exports: [
    CommonModule,
    FormsModule,
    RebirthStorageModule,
    BlogFooterComponent,
    BlogHeaderComponent,
    DropdownDirective,
    PagerComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {

    return {
      ngModule: SharedModule,
      providers: [
        LoadService,
        ...REBIRTH_HTTP_PROVIDERS,
        ...REBIRTH_WINDOW_PROVIDERS,
        ArticleService
      ]
    };
  }
}
