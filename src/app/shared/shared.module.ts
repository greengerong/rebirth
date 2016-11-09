import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { BlogFooterComponent } from './blog-footer';
import { BlogHeaderComponent } from './blog-header';
import { DropdownDirective } from './dropdown';
import { PagerComponent } from './pager';
import { LoadingComponent } from './loading';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
  ],
  declarations: [
    BlogFooterComponent,
    BlogHeaderComponent,
    DropdownDirective,
    PagerComponent,
    LoadingComponent
  ],
  providers: [],
  exports: [
    CommonModule,
    FormsModule,
    BlogFooterComponent,
    BlogHeaderComponent,
    DropdownDirective,
    PagerComponent,
    LoadingComponent
  ]
})
export class SharedModule {

}
