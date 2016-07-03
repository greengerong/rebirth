import { Component } from '@angular/core';
import { BlogAsideComponent } from '../blog-aside';
import { BlogFooterComponent } from '../blog-footer';
import { BlogHeaderComponent } from '../blog-header';

@Component({
  selector: 'blog-app',
  pipes: [],
  providers: [],
  directives: [BlogHeaderComponent, BlogAsideComponent, BlogFooterComponent],
  styles: [
    require('./blog-app.scss')
  ],
  template: require('./blog-app.html')
})
export class BlogAppComponent {

}
