import { Component } from '@angular/core';
import { BlogAsideComponent } from './blog-aside';
import { BlogNavbarComponent } from './blog-navbar';
import { BlogFooterComponent, BlogHeaderComponent } from '../shared';

@Component({
  selector: 'blog-app',
  pipes: [],
  providers: [],
  directives: [BlogHeaderComponent, BlogNavbarComponent, BlogAsideComponent, BlogFooterComponent],
  styles: [
    require('./blog-app.scss')
  ],
  template: require('./blog-app.html')
})
export class BlogAppComponent {

}
