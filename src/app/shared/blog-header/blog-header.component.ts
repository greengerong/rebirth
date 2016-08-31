import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'blog-header',
  pipes: [],
  providers: [],
  directives: [],
  styles: [
    require('./blog-header.scss')
  ],
  template: require('./blog-header.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogHeaderComponent {

}
