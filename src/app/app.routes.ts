import { Routes, RouterModule } from '@angular/router';

export const ROUTER_CONFIG: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/blog/home' },
];

export const ROUTING = RouterModule.forRoot(ROUTER_CONFIG);
