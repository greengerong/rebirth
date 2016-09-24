import { Routes, RouterModule } from '@angular/router';

export function loadBlogAppModule() {
  return System.import('./blog-app');
}
export function loadManageAppModule() {
  return System.import('./manage-app');
}

export const ROUTER_CONFIG: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/blog/home' },
  { path: 'blog', loadChildren: loadBlogAppModule },
  { path: 'manage', loadChildren: loadManageAppModule },
];

export const ROUTING = RouterModule.forRoot(ROUTER_CONFIG);
