import { Component } from '@angular/core';
import { BlogNavbarComponent } from '../blog-navbar';

@Component({
  selector: 'blog-header',
  pipes: [],
  providers: [],
  directives: [BlogNavbarComponent],
  styles: [
    require('./blog-header.scss')
  ],
  template: require('./blog-header.html')
})
export class BlogHeaderComponent {

}
