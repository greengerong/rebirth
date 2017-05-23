import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';

import { ManageAppComponent } from './manage-app.component';
import { ArticleSearchComponent } from './article-search';
import { CodemirrorComponent } from './codemirror';
import { LoginComponent } from './login';
import { ManageArticleItemComponent } from './manage-article-item';
import { ManageArticleListComponent } from './manage-article-list';
import { ManageHomeComponent } from './manage-home';
import { ManageNavbarComponent } from './manage-navbar';
import { MdEditorComponent } from './md-editor';
import { MdPreviewComponent } from './md-preview';

import { ROUTER_CONFIG } from './manage.routes';
import { RouterModule } from '@angular/router';
import { RebirthPermissionModule } from "rebirth-permission/dist";

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTER_CONFIG),
    RebirthPermissionModule
  ],
  providers: [],
  declarations: [
    ManageAppComponent,
    ArticleSearchComponent,
    CodemirrorComponent,
    LoginComponent,
    ManageArticleItemComponent,
    ManageArticleListComponent,
    ManageHomeComponent,
    ManageNavbarComponent,
    MdEditorComponent,
    MdPreviewComponent,
  ]
})
export class ManageAppModule {
}
