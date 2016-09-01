import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'blog-header',
  styles: [
    require('./blog-header.scss')
  ],
  template: require('./blog-header.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogHeaderComponent {

}
