import { Routes } from '@angular/router';


export const ROUTER_CONFIG: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/blog/home' },
  { path: 'blog', loadChildren: './blog-app/blog-app.module#BlogAppModule' },
  { path: 'manage', loadChildren: './manage-app/manage-app.module#ManageAppModule' },
];

