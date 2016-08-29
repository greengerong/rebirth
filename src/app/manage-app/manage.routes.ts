import { Routes, RouterModule } from '@angular/router';
import { ManageAppComponent } from './manage-app.component';
import { LoginComponent } from './login';
import { AuthRolePermission } from 'rebirth-permission';
import { ManageHomeComponent } from './manage-home';
import { ArticleListComponent } from './article-list';
import { MdEditorComponent } from './md-editor';

export const ROUTER_CONFIG: Routes = [
  { path: 'manage/login', component: LoginComponent },
  {
    path: 'manage', component: ManageAppComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/manage/login' },
      {
        path: 'home',
        component: ManageHomeComponent,
        data: { roles: ['Admin', 'User'] },
        canActivate: [AuthRolePermission]
      },
      {
        path: 'articles',
        component: ArticleListComponent,
        data: { roles: ['Admin', 'User'] },
        canActivate: [AuthRolePermission]
      },
      {
        path: 'articles/:id',
        component: MdEditorComponent,
        data: { roles: ['Admin', 'User'] },
        canActivate: [AuthRolePermission]
      }
    ]
  },
];

export const ROUTING = RouterModule.forRoot(ROUTER_CONFIG);
