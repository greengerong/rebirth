import { Routes, RouterModule } from '@angular/router';
import { ROUTER_CONFIG as BLOG_ROUTER_CONFIG } from './blog-app';
import { ROUTER_CONFIG as MANAGE_ROUTER_CONFIG } from './manage-app';

export const ROUTER_CONFIG: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/blog/home' },
  ...BLOG_ROUTER_CONFIG,
  ...MANAGE_ROUTER_CONFIG
];

export const ROUTING = RouterModule.forRoot(ROUTER_CONFIG);
