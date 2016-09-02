import { Routes, RouterModule } from '@angular/router';

export const ROUTER_CONFIG: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/blog/home' },
  { path: 'blog', loadChildren: () => System.import('./blog-app') },
  { path: 'manage', loadChildren: () => System.import('./manage-app') },
];

export const ROUTING = RouterModule.forRoot(ROUTER_CONFIG);
