import { Routes, RouterModule } from '@angular/router';
import { BlogAppComponent } from './blog-app.component';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { QuestionComponent } from './question';
import { BlogArticleComponent } from './blog-article';

export const ROUTER_CONFIG: Routes = [
  {
    path: '', component: BlogAppComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/blog/home' },
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'question', component: QuestionComponent },
      { path: ':id', component: BlogArticleComponent }
    ]
  }
];

// export const ROUTING = RouterModule.forChild(ROUTER_CONFIG);
