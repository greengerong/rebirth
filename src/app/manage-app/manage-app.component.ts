import { Component } from '@angular/core';
import { BlogFooterComponent } from '../blog-footer';
import { BlogHeaderComponent } from '../blog-header';

@Component({
  selector: 'manage-app',
  pipes: [],
  providers: [],
  directives: [BlogHeaderComponent, BlogFooterComponent],
  styles: [
    require('./manage-app.scss')
  ],
  template: require('./manage-app.html')
})
export class ManageAppComponent {

}
