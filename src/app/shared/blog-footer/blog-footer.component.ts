import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'blog-footer',
  styles: [
    require('./blog-footer.scss')
  ],
  template: require('./blog-footer.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogFooterComponent {

}
