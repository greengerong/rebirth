import { Routes, RouterModule } from '@angular/router';

import { ROUTER_CONFIG  as BLOG_ROUTER_CONFIG } from './blog-app/blog-app.routes';
import { ROUTER_CONFIG as MANAGE_ROUTER_CONFIG } from './manage-app/manage.routes';
import { ModuleWithProviders } from '@angular/core';


export const ROUTER_CONFIG: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/blog/home' },
  { path: 'blog', children: BLOG_ROUTER_CONFIG },
  { path: 'manage', children: MANAGE_ROUTER_CONFIG },
  // { path: 'blog', loadChildren: './blog-app/blog-app.module#BlogAppModule' },
  // { path: 'manage', loadChildren: './manage-app/manage-app.module#ManageAppModule' },
];

// export const ROUTING = RouterModule.forRoot(ROUTER_CONFIG);
