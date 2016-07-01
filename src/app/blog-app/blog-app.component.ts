import { Component } from '@angular/core';
import { BlogNavbarComponent } from '../blog-navbar';
import { BlogAsideComponent } from '../blog-aside';

@Component({
  selector: 'blog-app',
  pipes: [],
  providers: [],
  directives: [BlogNavbarComponent, BlogAsideComponent],
  styles: [
    require('./blog-app.scss')
  ],
  template: require('./blog-app.html')
})
export class BlogAppComponent {

}
